"use client";

import { useEffect, useState } from "react";
import useGetDataUser from "../hooks/useDataUser";
import { Post } from "../type/interface";
import CardPostUser from "./cardPostUser";
import { API } from "../libs/api";
import Link from "next/link";

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const [data, setData] = useState<Post[]>([]);
  console.log("data", data);

  const [currentPage, setCurrentPage] = useState(1);

  if (currentPage == 0) {
    setCurrentPage(1);
  }
  console.log("currentPage", currentPage);

  console.log("data", data);

  async function fetchData() {
    try {
      const res = await API.get(
        `/post/user?page=${currentPage - 1}&query=${searchQuery}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("res", res);

      setData(res?.data);
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
      <div>
        <div className="w-full mx-auto p-4 bg-white rounded-md shadow-md mb-4">
          <div className="flex justify-between">
            <h2 className="text-2xl font-bold mb-4">Search Posts</h2>
            <Link href={"/create"}>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
                Add Post
              </button>
            </Link>
          </div>
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
          <CardPostUser
            key={index}
            id={item?.id}
            imageSrc={
              item?.image
                ? item?.image
                : "https://res.cloudinary.com/ruparupa-com/image/upload/f_auto,q_auto/v1686488615/Products/10530838_1.jpg"
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
