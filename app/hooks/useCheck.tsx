import { useRouter } from "next/navigation";

export default async function UseCheck() {
  const router = useRouter();
  try {
    const token = localStorage.getItem("token");
    const check = await fetch("http://localhost:4000/auth/check", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("check", check);
    if (!check.ok) {
      localStorage.removeItem("token");
      router.push("/login");
      throw new Error("Network response was not ok");
    }
  } catch (error) {
    console.log(error);
  }
}
