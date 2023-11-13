import { useRouter } from "next/navigation";
import { useState } from "react";

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
    const imageUpload = {
      file: image,
    };

    const formData = new FormData();
    formData.append("file", image);

    console.log("imageUpload", imageUpload);

    try {
      const post = await fetch("http://localhost:4000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!post.ok) {
        throw new Error("Network response was not ok");
      }

      const response = await post.json();
      console.log("response", response);

      const login = await fetch("http://localhost:4000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: data.email, password: data.password }),
      });
      const loginResponse = await login.json();
      localStorage.setItem("token", loginResponse.access_token);

      const upload = await fetch("http://localhost:4000/auth/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${loginResponse.access_token}`,
        },
        body: formData,
      });

      router.push("/");
    } catch (error) {
      console.error(error);
    }
  }
  return {
    formData,
    setFormData,
    handleChange,
    handleSubmit,
  };
}
