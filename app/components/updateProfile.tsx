import { useEffect, useState } from "react";
import { API } from "../libs/api";

const UpdateProfileForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    image: null,
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  console.log("formData :", formData);

  async function fetchData() {
    const res = await API.get("/user", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = res?.data;
    console.log("data :", res.data);
    setFormData({
      name: data.name,
      username: data.username,
      email: data.email,
      image: null,
    });

    setPreviewImage(data?.photo ?? null);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (e: any) => {
    const { name, value, files } = e.target;
    if (e.target.type === "file") {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        setPreviewImage(reader.result as string | null);
      };

      if (files) {
        reader.readAsDataURL(file);
      }
    }
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const data = {
      name: formData.name,
      username: formData.username,
      email: formData.email,
    };
    postData(data, formData.image);

    setFormData({
      name: "",
      username: "",
      email: "",
      image: null,
    });
  };

  async function postData(data: any, image: any) {
    try {
      const post = await API.put("/user", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("post", post);

      const formData = new FormData();
      formData.append("file", image);
      if (image !== null) {
        console.log("image", image);

        const upload = await API.post(`/auth/upload`, formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        console.log("upload", upload);
      }
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="mx-auto mt-8 p-4 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      <div className="flex flex-col gap-4 md:w-full md:flex-row">
        <form className="flex flex-col p-4 md:w-full" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-600"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-600"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-600"
            >
              Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Update Profile
          </button>
        </form>
        <div className="mb-4 p-4 md:w-full">
          {previewImage && (
            <img
              className="w-full object-cover h-96 rounded-md"
              src={previewImage}
              alt="Preview"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdateProfileForm;
