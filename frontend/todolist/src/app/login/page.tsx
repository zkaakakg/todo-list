"use client";
import "../globals.css";
import { useState } from "react";

type LoginForm = {
  username: string;
  password: string;
};

export default function LoginPage() {
  const [form, setForm] = useState<LoginForm>({
    username: "",
    password: "",
  });

  const [message, setMessage] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams();
    params.append("username", form.username);
    params.append("password", form.password);

    try {
      const response = await fetch("http://localhost:8080/member/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params.toString(),
        credentials: "include",
      });
      if (response.status === 200) {
        window.location.href = "/";
      } else {
        setMessage("회원님의 정보가 잘못입력되었습니다.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("서버 오류가 발생했습니다.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-30">
      <div className="max-w-md w-[600px] h-[390px] bg-white p-8 rounded-2xl shadow-lg flex flex-col justify-between">
        <h4 className="text-2xl font-bold text-gray-800 text-center">LOGIN</h4>
        <form
          className="flex flex-col justify-between flex-grow mt-4 px-5"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-3">
            <input
              name="username"
              placeholder="아이디"
              onChange={handleChange}
              value={form.username}
              className="bg-gray-200 shadow-inner  py-3 px-5 rounded-lg"
            />
            <input
              type="password"
              name="password"
              placeholder="비밀번호"
              onChange={handleChange}
              value={form.password}
              className="bg-gray-200 shadow-inner  py-3 px-5 rounded-lg"
            />
            {message && <p className="text-red-600 text-sm">{message}</p>}
          </div>

          {/* 버튼을 하단에 고정 */}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full py-3 px-5 bg-black font-semibold text-white text-m rounded-lg focus:outline-none hover:opacity-90"
            >
              로그인
            </button>
            <button
              type="button"
              className="w-full mt-3 py-3 px-5 bg-gray-600 font-semibold text-white text-m rounded-lg focus:outline-none hover:opacity-90"
            >
              회원가입
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
