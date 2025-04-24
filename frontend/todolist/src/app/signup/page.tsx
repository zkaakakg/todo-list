"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import CommonButton from "../components/CommonButton";
import { useRouter } from "next/navigation";

interface SignUpForm {
  username: string;
  password: string;
  email: string;
  repeatPassword: string;
}

export default function SignUpPage() {
  const [form, setForm] = useState<SignUpForm>({
    username: "",
    password: "",
    email: "",
    repeatPassword: "",
  });

  const [message, setMessage] = useState<string>("");
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setMessage("");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { username, email, password, repeatPassword } = form;

    if (password !== repeatPassword) {
      setMessage("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/member/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      router.push("/login");
    } catch (error) {
      console.error("Error:", error);
      setMessage("에러 발생");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50 p-10">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-black text-center mb-6">
          ✳ Sign Up
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username */}
          <div>
            <label className="block text-xs text-black mb-1">
              USERNAME (*)
            </label>
            <input
              name="username"
              type="text"
              placeholder="User Name"
              value={form.username}
              onChange={handleChange}
              required
              className="w-full border-b border-gray-500 focus:outline-none py-2 placeholder-gray-500 text-sm"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs text-black mb-1">EMAIL (*)</label>
            <input
              name="email"
              type="email"
              placeholder="E-mail"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border-b border-gray-500 focus:outline-none py-2 placeholder-gray-500 text-sm"
            />
          </div>

          {/* Passwords - side by side */}
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-xs text-black">PASSWORD (*)</label>
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full border-b border-gray-500 focus:outline-none py-2 placeholder-gray-500 text-sm"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-xs text-black">
                REPEAT PASSWORD (*)
              </label>
              <input
                name="repeatPassword"
                type="password"
                placeholder="Repeat Password"
                value={form.repeatPassword}
                onChange={handleChange}
                required
                className="w-full border-b border-gray-500 focus:outline-none py-2 placeholder-gray-500 text-sm"
              />
            </div>
          </div>
          {message && <p className="text-sm text-red-500 mt-4">{message}</p>}
          {/* Submit Button */}
          <CommonButton type="submit">Create Account</CommonButton>
        </form>
      </div>
    </div>
  );
}
