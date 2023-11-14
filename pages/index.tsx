import NavbarNew from "@/app/components/navbar";
import HomePage from "@/app/components/homePage";
import UseCheck from "@/app/hooks/useCheck";
import "../app/globals.css";

export default function Home() {
  UseCheck();
  return (
    <div>
      <NavbarNew>
        {/* <CreatePost /> */}
        <HomePage />
      </NavbarNew>
    </div>
  );
}
