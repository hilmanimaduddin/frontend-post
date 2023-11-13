"use client";

import { useEffect, useState } from "react";
import useGetDataUser from "../hooks/useDataUser";
import { Post } from "../type/interface";
import CardPost from "./cardPost";

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { formData, setFormData, handleChange, handleSubmit } =
    useGetDataUser();

  const [data, setData] = useState<Post[]>([]);
  console.log("data", data);

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  if (currentPage == 0) {
    setCurrentPage(1);
  }
  console.log("currentPage", currentPage);

  console.log("data", data);

  async function fetchData() {
    try {
      const res = await fetch(
        `http://localhost:4000/post/user?page=${
          currentPage - 1
        }&query=${searchQuery}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await res.json();
      setData(data.posts);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  console.log("searchQuery", searchQuery);

  const handleInputChange = (e: any) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmitSearch = (e: any) => {
    e.preventDefault();
    fetchData();
  };
  return (
    <div>
      <div className=" mx-auto p-4 bg-white rounded-md shadow-md mb-4">
        <h2 className="text-2xl font-bold mb-4">Create a New Post</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex gap-4 w-full">
            <div className="mb-4 w-1/4">
              <label
                htmlFor="caption"
                className="block text-sm font-medium text-gray-600"
              >
                Caption
              </label>
              <input
                type="text"
                id="caption"
                name="caption"
                value={formData.caption}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md"
                required
              />
            </div>
            <div className="mb-4 w-1/4">
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
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
            <div className="mb-4 w-1/4">
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
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md"
                required
              />
            </div>
            <div className=" w-1/4">
              <button
                type="submit"
                className="w-full bg-blue-500 text-white px-4 py-2 rounded-md mt-7"
              >
                Create Post
              </button>
            </div>
          </div>
        </form>
      </div>
      <div>
        <div className="w-full mx-auto p-4 bg-white rounded-md shadow-md mb-4">
          <h2 className="text-2xl font-bold mb-4">Search Posts</h2>
          <form onSubmit={handleSubmitSearch}>
            <div className="mb-4 flex gap-4">
              <input
                type="text"
                id="search"
                name="search"
                placeholder="Search"
                value={searchQuery}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded-md"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
        {/* {data.map((item, index) => ( */}
        {(data || []).map((item, index) => (
          <CardPost
            key={index}
            id={item?.id}
            imageSrc={
              item?.image
                ? `http://localhost:4000/display/${item?.image}`
                : "https://devfortest.my.id/uploads/1699502134882.png"
            }
            caption={item?.caption}
            tags={item?.tags}
            likes={item?.likes}
            dislikes={5}
            userPost={item?.user.name}
          />
        ))}
      </div>
      <div>
        <div className="flex justify-center my-4">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
          >
            Previous
          </button>
          <span className="text-xl font-bold">{currentPage}</span>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md ml-2"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
