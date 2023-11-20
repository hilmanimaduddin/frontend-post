import { useEffect, useState } from "react";
import { Post } from "../type/interface";
import { API } from "../libs/api";

export default function UseGetUser() {
  const [data, setData] = useState<Post[]>([]);

  async function fetchData() {
    try {
      const res = await API.get("/post", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setData(res?.posts);
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
