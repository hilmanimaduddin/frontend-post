"use client";

import { useRouter } from "next/navigation";
import { API } from "../libs/api";

export default async function UseCheck() {
  const router = useRouter();
  if (typeof window !== "undefined" && window.localStorage) {
    try {
      const token = localStorage.getItem("token");
      const check = await API.get("/auth/check", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("check", check);
    } catch (error) {
      localStorage.removeItem("token");
      router.push("/login");
      console.log("salah", error);
    }
  }
}
