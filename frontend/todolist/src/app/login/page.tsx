"use client";
import { useState } from "react";
import CommonButton from "../components/CommonButton";

type LoginForm = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const [form, setForm] = useState<LoginForm>({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams();
    params.append("email", form.email);
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
    <div className="min-h-screen flex items-center justify-center bg-orange-50 p-10">
      <div className="w-full max-w-md ">
        <div className="w-full flex justify-center">
          <div>
            {" "}
            {/* Welcome To-Do List !의 길이만큼 */}
            <h1 className="text-3xl font-extrabold text-black typing-demo mb-6 font-mono">
              Welcome To-Do List !
            </h1>
          </div>
        </div>
        <h4 className="text-2xl font-bold text-gray-800 text-center mb-6">
          ✳ LOGIN
        </h4>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <div>
              <input
                name="email"
                placeholder="E-Mail"
                onChange={handleChange}
                value={form.email}
                required
                className="w-full border-b border-gray-500 focus:outline-none py-2 placeholder-gray-500 text-sm mb-5"
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                value={form.password}
                required
                className="w-full border-b border-gray-500 focus:outline-none py-2 placeholder-gray-500 text-sm mb-5"
              />
            </div>
            {message && <p className="text-red-600 text-sm">{message}</p>}
          </div>

          {/* 버튼을 하단에 고정 */}
          <div className="mt-6">
            <CommonButton type="submit">Submit</CommonButton>
            <a
              href="/signup"
              className="block text-center underline mx-auto mt-3"
            >
              Sign Up
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
