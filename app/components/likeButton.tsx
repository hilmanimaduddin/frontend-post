// LikeButton.tsx

import { useState } from "react";
import { useRouter } from "next/router";

type LikeButtonProps = {
  postId: string;
};

const LikeButton: React.FC<LikeButtonProps> = ({ postId }) => {
  const router = useRouter();
  const [liked, setLiked] = useState(false);

  const handleLike = async () => {
    // Implementasi logika untuk mengirim data ke backend (misalnya, menggunakan fetch)
    try {
      const res = await fetch(`/api/like/${postId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ liked: !liked }),
      });

      if (res.ok) {
        setLiked(!liked);
      } else {
        console.error("Failed to update like status");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <button
      className={`flex items-center gap-2 p-2 rounded-md ${
        liked ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
      }`}
      onClick={handleLike}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="h-5 w-5"
      >
        {liked ? (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        ) : (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 8h16M4 16h16"
          />
        )}
      </svg>
      {liked ? "Liked" : "Like"}
    </button>
  );
};

export default LikeButton;
