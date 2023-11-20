"use client";

import NavbarNew from "@/app/components/navbar";
import DetailPage from "@/app/components/detailPage";
import "../../app/globals.css";
import UseCheck from "@/app/hooks/useCheck";
export default function DetailPost() {
  UseCheck();
  return (
    <div>
      <NavbarNew>
        <DetailPage />
      </NavbarNew>
    </div>
  );
}
