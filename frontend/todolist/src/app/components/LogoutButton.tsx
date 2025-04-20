"use client";

import { useRouter } from "next/navigation";
import { MouseEvent } from "react";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async (
    e: MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    e.preventDefault();
    try {
      const res: Response = await fetch("http://localhost:8080/member/logout", {
        method: "POST",
        credentials: "include", // 세션 쿠키 포함
      });

      if (res.ok) {
        router.push("/login");
      } else {
        console.error("로그아웃 실패");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("에러:", error.message);
      } else {
        console.error("알 수 없는 에러:", error);
      }
    }
  };

  return (
    <div className="flex">
      <button
        className=" ml-auto font-bold text-sm text-red-600 hover:underline mt-2"
        onClick={handleLogout}
      >
        Log Out
      </button>
    </div>
  );
}
