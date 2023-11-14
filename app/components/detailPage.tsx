"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const DetailPage = () => {
  const id = useParams();
  console.log("id", id?.id);

  const [formData, setFormData] = useState({
    tags: "",
    caption: "",
    image: null,
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  console.log("formData :", formData);

  async function fetchData() {
    try {
      const res = await fetch(`http://localhost:4000/post/${id?.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const geting = await res.json();
      const data = geting.post;
      console.log("datasdqwdswq :", data);
      setFormData({
        tags: data.tags,
        caption: data.caption,
        image: null,
      });
      const image = `http://localhost:4000/display/${data?.image}`;
      setPreviewImage(image as string | null);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [id]);

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
      tags: formData.tags,
      caption: formData.caption,
    };
    postData(data, formData.image);
    // Reset form fields
    setFormData({
      tags: "",
      caption: "",
      image: null,
    });
  };

  async function postData(data: any, image: any) {
    try {
      const post = await fetch(`http://localhost:4000/post/${id?.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(data),
      });
      if (!post.ok) {
        throw new Error("Network response was not ok");
      }
      const formData = new FormData();
      formData.append("file", image);
      if (image !== null) {
        console.log("image", image);

        const upload = await fetch(`http://localhost:4000/auth/upload`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: formData,
        });

        if (!upload.ok) {
          throw new Error("Network response was not ok");
        }
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
              Caption
            </label>
            <input
              type="text"
              id="caption"
              name="caption"
              value={formData.caption}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-md"
              // disabled={formData.image ? false : true}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="tags"
              className="block text-sm font-medium text-gray-600"
            >
              Tags
            </label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
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

export default DetailPage;
