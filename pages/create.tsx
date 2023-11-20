"use client";

import NavbarNew from "@/app/components/navbar";
import "../app/globals.css";
import CreatePost from "@/app/components/createPost";

export default function CreatePage() {
  return (
    <div>
      <NavbarNew>
        <CreatePost />
      </NavbarNew>
    </div>
  );
}
