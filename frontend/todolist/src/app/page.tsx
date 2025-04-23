// app/page.tsx
"use client";

import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import CommonButton from "./components/CommonButton";
import LogoutButton from "./components/LogoutButton";

interface User {
  name: string;
  email: string;
}

interface TaskForm {
  title: string;
  status: string;
  dueDate: string;
}

interface Task {
  id: number;
  title: string;
  status: string;
  dueDate: string;
}

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [form, setForm] = useState<TaskForm>({
    title: "",
    status: "active",
    dueDate: new Date().toISOString().split("T")[0],
  });
  const [filterType, setFilterType] = useState<string>("all");
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editingTitle, setEditingTitle] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    fetch("http://localhost:8080/member", {
      credentials: "include",
    })
      .then(async (res) => {
        if (res.ok) {
          const data: User = await res.json();
          setUser(data);
          const taskRes = await fetch("http://localhost:8080/task", {
            credentials: "include",
          });
          if (taskRes.ok) {
            const taskData: Task[] = await taskRes.json();
            setTasks(taskData);
          } else {
            console.error("Failed to fetch tasks:", taskRes.statusText);
          }
        } else {
          router.push("/login");
        }
      })
      .catch((err) => {
        router.push("/login");
      });
  }, [router]);

  const fetchTasks = async () => {
    const taskRes = await fetch("http://localhost:8080/task", {
      credentials: "include",
    });
    if (taskRes.ok) {
      const taskData: Task[] = await taskRes.json();
      setTasks(taskData);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value;
    setSelectedDate(newDate);
    // 폼과 필터링 모두에 같은 날짜를 사용합니다
    setForm({ ...form, dueDate: newDate });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(form),
      });

      if (response.ok) {
        setForm({
          ...form,
          title: "", // 제출 후 제목 필드만 초기화
        });
        await fetchTasks();
      } else {
        console.error("Failed to create task:", await response.text());
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleTaskStatusChange = async (taskId: number, newStatus: string) => {
    try {
      const response = await fetch(
        `http://localhost:8080/task/${taskId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ status: newStatus }),
        }
      );
      if (response.ok) {
        await fetchTasks();
      } else {
        console.error("Failed to create task:", await response.text());
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleEditClick = (task: Task) => {
    setEditingTaskId(task.id);
    setEditingTitle(task.title);
  };

  const handleSaveClick = async (taskId: number) => {
    try {
      const response = await fetch(`http://localhost:8080/task/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ ...form, title: editingTitle }),
      });
      if (response.ok) {
        setEditingTaskId(null);
        await fetchTasks();
      } else {
        console.error("Failed to update task:", await response.text());
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDelete = async (taskId: number) => {
    try {
      const response = await fetch(`http://localhost:8080/task/${taskId}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (response.ok) {
        await fetchTasks();
      } else {
        console.error("Failed to delete task:", await response.text());
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const setActiveFilter = (type: string) => {
    setFilterType(type);
  };

  // 선택된 날짜와 필터 타입에 따라 작업 필터링
  const filteredTasks = tasks.filter((task) => {
    const matchesDate = task.dueDate === selectedDate;

    if (filterType === "all") {
      return matchesDate;
    } else if (filterType === "active") {
      return matchesDate && task.status === "active";
    } else if (filterType === "completed") {
      return matchesDate && task.status === "completed";
    }

    return matchesDate;
  });

  return (
    <div>
      {user ? (
        <div className="p-10 min-h-screen bg-orange-50">
          <LogoutButton />
          <h1 className="text-2xl font-bold text-center">
            ✳ {user.name}님의 TO-DO List ✳
          </h1>
          <div className="max-w-xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-8">
            {/* 날짜 선택 */}
            <div className="text-center pt-4 pb-1">
              <input
                id="selectedDate"
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
                className="px-4 py-2 font-medium text-2xl focus:outline-none"
              />
            </div>

            {/* 할일 추가 폼 */}
            <form
              onSubmit={handleSubmit}
              className="w-full max-w-lg mx-auto px-4 py-2"
            >
              <div className="flex items-center border-b-2 border-black-500 py-2">
                <input
                  id="title"
                  type="text"
                  value={form.title}
                  onChange={handleChange}
                  required
                  placeholder="Add a task"
                  className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                />
                <CommonButton type="submit">Add</CommonButton>
              </div>
            </form>

            {/* 필터 탭과 할일 입력 폼을 분리 */}
            <div className="flex justify-center px-6 py-2">
              <ul className="flex space-x-4 mb-2" id="ex1" role="tablist">
                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link hover:underline ${
                      filterType === "all" ? "font-bold text-yellow-700" : ""
                    }`}
                    onClick={() => setActiveFilter("all")}
                  >
                    All
                  </button>
                  <span className="ml-3">|</span>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link hover:underline ${
                      filterType === "active" ? "font-bold text-yellow-700" : ""
                    }`}
                    onClick={() => setActiveFilter("active")}
                  >
                    Active
                  </button>
                  <span className="ml-3">|</span>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link hover:underline ${
                      filterType === "completed"
                        ? "font-bold text-yellow-700"
                        : ""
                    }`}
                    onClick={() => setActiveFilter("completed")}
                  >
                    Completed
                  </button>
                </li>
              </ul>
            </div>

            {/* 할일 목록 */}
            <div className="divide-y divide-gray-200 px-4">
              {filteredTasks.length > 0 ? (
                <ul>
                  {filteredTasks.map((task) => (
                    <li key={task.id} className="py-4 px-8">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          className="h-4 w-4 appearance-none border-2 checked:border-2  checked:bg-[url('/icons/checked.png')] bg-no-repeat bg-center checked:bg-[length:0.6rem_0.6rem]"
                          checked={task.status === "completed"}
                          onChange={(e) =>
                            handleTaskStatusChange(
                              task.id,
                              e.target.checked ? "completed" : "active"
                            )
                          }
                        />
                        <label className="ml-3 block text-gray-900">
                          {editingTaskId === task.id ? (
                            <input
                              type="text"
                              value={editingTitle}
                              onChange={(e) => setEditingTitle(e.target.value)}
                              className="border-b-1 border-black-500 focus:outline-none px-2 py-1 text-lg"
                              required
                            />
                          ) : (
                            <span
                              className={`text-lg ${
                                task.status === "completed"
                                  ? "line-through text-lime-700"
                                  : "font-bold"
                              }`}
                            >
                              {task.title}
                            </span>
                          )}
                        </label>
                        <div className="ml-auto">
                          {editingTaskId === task.id ? (
                            <button
                              className="w-4 h-4"
                              type="button"
                              onClick={() => handleSaveClick(task.id)}
                            >
                              <img
                                src="/icons/save.png"
                                alt="저장"
                                className="w-full h-full"
                              />
                            </button>
                          ) : (
                            <button
                              className="w-3.5 h-3.5"
                              type="button"
                              onClick={() => handleEditClick(task)}
                            >
                              <img
                                src="/icons/edit.png"
                                alt="수정"
                                className="w-full h-full"
                              />
                            </button>
                          )}
                          <button
                            className="w-4 h-4 ml-2"
                            type="button"
                            onClick={() => handleDelete(task.id)}
                          >
                            <img
                              src="/icons/delete.png"
                              alt="삭제"
                              className="w-full h-full"
                            />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="py-8 text-xl text-center text-gray-500">⋯</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="p-10 min-h-screen bg-orange-50"></div>
      )}
    </div>
  );
}
