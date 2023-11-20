import { useRouter } from "next/navigation";
import { useState } from "react";
import { API } from "../libs/api";

export default function UseRegister() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    file: null,
  });

  const handleChange = (e: any) => {
    if (e.target.type === "file") {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const item = {
      name: formData.name,
      username: formData.username,
      email: formData.email,
      password: formData.password,
    };
    const image = formData.file;
    postData(item, image);
    setFormData({
      name: "",
      username: "",
      email: "",
      password: "",
      file: null,
    });
  };

  async function postData(data: any, image: any) {
    const formData = new FormData();
    formData.append("file", image);
    try {
      await API.post("/auth/register", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const login = await API.post(
        "/auth/login",
        JSON.stringify({ email: data.email, password: data.password }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      localStorage.setItem("token", login?.data?.access_token);
      if (image) {
        await API.post("/auth/upload", formData, {
          headers: {
            Authorization: `Bearer ${login?.data?.access_token}`,
          },
        });
      }
      router.push("/");
    } catch (error) {
      console.error("error", error);
    }
  }
  return {
    formData,
    setFormData,
    handleChange,
    handleSubmit,
  };
}
