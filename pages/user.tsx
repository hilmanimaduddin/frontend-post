import NavbarNew from "@/app/components/navbar";
import "../app/globals.css";
import UpdateProfileForm from "@/app/components/updateProfile";
import UseCheck from "@/app/hooks/useCheck";
export default function User() {
  UseCheck();
  return (
    <div>
      <NavbarNew>
        <UpdateProfileForm />
      </NavbarNew>
    </div>
  );
}
