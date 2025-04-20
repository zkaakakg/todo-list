// app/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CommonButton from "./components/CommonButton";
import LogoutButton from "./components/LogoutButton";

interface User {
  name: string;
  email: string;
}

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    fetch("http://localhost:8080/member/user", {
      credentials: "include", // 인증 쿠키 포함
    })
      .then(async (res) => {
        if (res.status === 401) {
          router.push("/login");
        } else if (res.ok) {
          const data: User = await res.json();
          setUser(data);
        } else {
          console.error("알 수 없는 오류 발생");
        }
      })
      .catch((err) => {
        router.push("/login");
      })
      .finally(() => setLoading(false));
  }, [router]);
  if (loading) return <p>로딩 중...</p>;
  return (
    <div>
      {user ? (
        <div className="p-10 min-h-screen bg-orange-50">
          <LogoutButton />
          <h1 className="text-2xl font-bold text-center">
            ✳ {user.name}님의 TO-DO List ✳
          </h1>
          <div className="max-w-xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-8">
            <div className="px-4 py-2 mt-5">
              <div className="text-center">
                <input
                  id="date"
                  type="date"
                  className="px-4 py-2 font-medium text-xl focus:outline-none"
                />
              </div>
            </div>
            <form className="w-full max-w-lg mx-auto px-4 py-2">
              <div className="flex items-center border-b-2 border-black-500 py-2">
                <input
                  className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                  type="text"
                  placeholder="Add a task"
                />
                <CommonButton type="submit">Add</CommonButton>
              </div>
            </form>
            <div className="flex justify-start px-12">
              <ul className="flex space-x-4 mb-2" id="ex1" role="tablist">
                <li className="nav-item" role="presentation">
                  <a
                    className="nav-link active hover:underline  active:text-yellow-700"
                    id="ex1-tab-1"
                    data-mdb-tab-init
                    href="#ex1-tabs-1"
                    role="tab"
                    aria-controls="ex1-tabs-1"
                    aria-selected="true"
                  >
                    All
                  </a>
                  <span className="ml-3">|</span>
                </li>
                <li className="nav-item" role="presentation">
                  <a
                    className="nav-link hover:underline active:text-yellow-700"
                    id="ex1-tab-2"
                    data-mdb-tab-init
                    href="#ex1-tabs-2"
                    role="tab"
                    aria-controls="ex1-tabs-2"
                    aria-selected="false"
                  >
                    Active
                  </a>
                  <span className="ml-3">|</span>
                </li>
                <li className="nav-item" role="presentation">
                  <a
                    className="nav-link hover:underline active:text-yellow-700"
                    id="ex1-tab-3"
                    data-mdb-tab-init
                    href="#ex1-tabs-3"
                    role="tab"
                    aria-controls="ex1-tabs-3"
                    aria-selected="false"
                  >
                    Completed
                  </a>
                </li>
              </ul>
            </div>
            <ul className="divide-y divide-gray-200 px-4">
              <li className="py-4 px-8">
                <div className="flex items-center">
                  <input
                    id="todo1"
                    name="todo1"
                    type="checkbox"
                    className="h-4 w-4 text-black-600  accent-black-800 border-gray-300 rounded"
                  />
                  <label htmlFor="todo1" className="ml-3 block text-gray-900">
                    <span className="text-lg font-medium">
                      Finish project proposal
                    </span>
                    <span className="text-sm font-light ">Due on 4/1/23</span>
                  </label>
                </div>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <p>유저 정보를 불러올 수 없습니다.</p>
      )}
    </div>
  );
}
