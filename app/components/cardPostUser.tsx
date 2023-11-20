"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { API } from "../libs/api";

type CardProps = {
  id: string;
  imageSrc: string;
  caption: string;
  tags: string;
  likes: number;
  dislikes: number;
  userPost: string;
};

const CardPostUser = ({
  id,
  imageSrc,
  caption,
  tags,
  likes,
  dislikes,
  userPost,
}: any) => {
  console.log("image", imageSrc);
  const [token, setToken] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const cobaa = localStorage.token;
      console.log("cobaa", cobaa);
      setToken(cobaa);
    }
  }, []);

  const lik = likes.filter((item: any) => item.liked === true);
  const dis = likes.filter((item: any) => item.liked === false);
  console.log("lik", lik);
  console.log("dis", dis);

  const [like, setLike] = React.useState(lik.length);
  const [dislike, setDislike] = React.useState(dis.length);
  const [liked, setLiked] = React.useState(false);
  const [disliked, setDisliked] = React.useState(false);
  console.log("like  ::", likes);

  const handleDelete = async () => {
    try {
      const res = await API.delete(`/post/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("deleted", res);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLike = async () => {
    try {
      const res = await API.post(`/post/like/${id}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("res", res);
      if (res.data.error == "Failed to like post") {
        throw new Error(`Failed to like post: ${res?.data?.message?.name}`);
      }

      if (res?.data?.message == "Like created successfully") {
        console.log("liked");
        setDisliked(true);
        setLike(like + 1);
      } else if (res?.data?.message == "Like deleted successfully") {
        console.log("unliked");
        setDisliked(true);
        setLike(like - 1);
      } else if (res?.data?.message == "Like updated successfully") {
        setDisliked(true);
        setLike(like + 1);
        setDislike(dislike - 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDislike = async () => {
    try {
      const res = await API.post(`/post/unlike/${id}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("res", res);
      if (res.data.error == "Failed to like post") {
        throw new Error(`Failed to unlike post: ${res?.data?.message?.name}`);
      }

      if (res?.data?.message == "Like created successfully") {
        console.log("liked");
        setLiked(true);
        setDislike(dislike + 1);
      } else if (res?.data?.message == "Like deleted successfully") {
        setDislike(dislike - 1);
        console.log("unliked");
        setLiked(true);
      } else if (res?.data?.message == "Like updated successfully") {
        setDislike(dislike + 1);
        setLike(like - 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-md p-4 mb-4">
      <div className="mb-4">
        <img
          src={imageSrc}
          alt="Card Image"
          className="w-full h-40 object-cover rounded-md"
        />
      </div>
      <div className="mb-2">
        <p className="text-lg font-bold">{userPost}</p>

        <p className="text-lg font-bold">{caption}</p>
      </div>
      <div className="mb-2">
        <p className="text-gray-500">
          Tags: <span className="mr-2">{tags}</span>
        </p>
      </div>
      <div className="flex justify-between items-center">
        <div>
          <span className="mr-2 text-green-500">{like} Likes</span>
          <span className="text-red-500">{dislike} Dislikes</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleLike}
            className="bg-green-500 text-white px-4 py-2 rounded-md"
          >
            Like
          </button>
          <button
            onClick={handleDislike}
            className="bg-red-500 text-white px-4 py-2 rounded-md"
          >
            Dislike
          </button>
        </div>
      </div>
      <div>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-md ml-1"
          onClick={handleDelete}
        >
          Delete
        </button>
        <Link href={`/detail/${id}`}>
          <button className="bg-green-500 text-white px-4 py-2 rounded-md ml-1">
            Edit
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CardPostUser;
