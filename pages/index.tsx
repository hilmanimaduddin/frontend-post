import NavbarNew from "@/app/components/cobaNav";
import "../app/globals.css";
import HomePage from "@/app/components/homePage";
import UseCheck from "@/app/hooks/useCheck";
import CreatePost from "@/app/components/createPost";

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
