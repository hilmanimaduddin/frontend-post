import { useRouter } from "next/navigation";
import { useState } from "react";

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
      const post = await fetch("http://localhost:4000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const response = await post.json();
      console.log("response", response);
      localStorage.setItem("token", response.access_token);

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
