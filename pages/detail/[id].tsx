"use client";

import NavbarNew from "@/app/components/cobaNav";
import DetailPage from "@/app/components/detailPage";
import UseCheck from "@/app/hooks/useCheck";
import "../../app/globals.css";
export default function DetailPost() {
  //   UseCheck();
  return (
    <div>
      <NavbarNew>
        <DetailPage />
      </NavbarNew>
    </div>
  );
}
