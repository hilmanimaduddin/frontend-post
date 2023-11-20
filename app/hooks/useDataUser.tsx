import { useEffect, useState } from "react";
import { Post } from "../type/interface";
import { API } from "../libs/api";
import { useRouter } from "next/navigation";

export default function useGetDataUser() {
  const router = useRouter();
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
    console.log("imagee", image);

    try {
      const post = await API.post("/post", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("post", post);

      console.log("formData", formData);
      if (image) {
        console.log("gdih", image);

        const upload = await API.post(
          `/post/upload/${post?.data?.post?.id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        console.log("upload", upload);
      }
      router.push("/post");
      // window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }
  async function fetchData() {
    try {
      const res = await API.get("/post", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      // setData(data.posts);
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
