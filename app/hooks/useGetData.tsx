import { useEffect, useState } from "react";
import { Post } from "../type/interface";

export default function UseGetUser() {
  const [data, setData] = useState<Post[]>([]);

  async function fetchData() {
    try {
      const res = await fetch("http://localhost:4000/post", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      setData(data.posts);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return {
    data,
  };
}
