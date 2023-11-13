import { useEffect, useState } from "react";
import { Post } from "../type/interface";

export default function useGetDataUser() {
  const [data, setData] = useState<Post[]>([]);

  console.log("data", data);

  const [formData, setFormData] = useState({
    caption: "",
    tags: "",
    image: null,
  });

  function handleChange(e: any) {
    fetchData();

    if (e.target.type === "file") {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    const data = {
      caption: formData.caption,
      tags: formData.tags,
    };
    postData(data, formData.image);

    fetchData();
    setFormData({
      caption: "",
      tags: "",
      image: null,
    });
  }

  async function postData(data: any, image: any) {
    const formData = new FormData();
    formData.append("file", image);

    try {
      const post = await fetch("http://localhost:4000/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(data),
      });
      console.log("post", post);

      const get = await post.json();
      console.log("get", get);

      if (!post.ok) {
        throw new Error("Network response was not ok");
      }

      const upload = await fetch(
        `http://localhost:4000/post/upload/${get.post.id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: formData,
        }
      );

      if (!upload.ok) {
        throw new Error("Network response was not ok");
      }
      fetchData();

      console.log("upload", upload);
    } catch (error) {
      console.log(error);
    }
  }
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
    fetchData,
    formData,
    handleChange,
    handleSubmit,
    setFormData,
  };
}
