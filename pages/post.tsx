import NavbarNew from "@/app/components/cobaNav";
import CreatePost from "@/app/components/createPost";
import UserPage from "@/app/components/userPost";
import UseCheck from "@/app/hooks/useCheck";
import "../app/globals.css";

export default function PostPage() {
  UseCheck();
  return (
    <div>
      <NavbarNew>
        {/* <CreatePost /> */}
        <UserPage />
      </NavbarNew>
    </div>
  );
}
