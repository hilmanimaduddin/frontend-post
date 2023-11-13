"use client";

import Link from "next/link";
import React, { useEffect } from "react";

type CardProps = {
  id: string;
  imageSrc: string;
  caption: string;
  tags: string;
  likes: number;
  dislikes: number;
  userPost: string;
};

const CardPost = ({
  id,
  imageSrc,
  caption,
  tags,
  likes,
  dislikes,
  userPost,
}: any) => {
  console.log("image", imageSrc);

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
      const res = await fetch(`http://localhost:4000/post/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleLike = async () => {
    try {
      const res = await fetch(`http://localhost:4000/post/like/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.ok) {
        setLike(like + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDislike = async () => {
    try {
      const res = await fetch(`http://localhost:4000/post/unlike/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.ok) {
        setDislike(dislike + 1);
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
        <Link href={`/detail/${id}`}>
          <p className="text-lg font-bold">{caption}</p>
        </Link>
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
    </div>
  );
};

export default CardPost;
