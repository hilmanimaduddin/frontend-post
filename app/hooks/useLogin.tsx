import { useRouter } from "next/navigation";
import { useState } from "react";
import { API } from "../libs/api";

export default function UseLogin() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    console.log("Form Data:", formData);
    postData(formData);

    setFormData({
      email: "",
      password: "",
    });
  };

  async function postData(data: any) {
    try {
      const post = await API.post("/auth/login", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("post", post);

      localStorage.setItem("token", post?.data?.access_token);

      router.push("/");
    } catch (error) {
      console.log(error);
    }
  }

  return {
    formData,
    setFormData,
    handleChange,
    handleSubmit,
  };
}
