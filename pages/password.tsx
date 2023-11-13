import NavbarNew from "@/app/components/cobaNav";
import "../app/globals.css";

export function ChangePassword() {
  return (
    <div>
      <NavbarNew>
        <h1>Change Password</h1>
      </NavbarNew>
    </div>
  );
}

import UseCheck from "@/app/hooks/useCheck";
import { useState } from "react";

const ChangePasswordForm = () => {
  UseCheck();
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmNewPassword) {
      alert("New password and confirm new password do not match.");
      return;
    }
    // Handle form submission logic here
    console.log("Old Password:", formData.oldPassword);
    console.log("New Password:", formData.newPassword);
    console.log("Confirm New Password:", formData.confirmNewPassword);
    // Reset form fields
    const data = {
      oldPassword: formData.oldPassword,
      newPassword: formData.newPassword,
      confirmNewPassword: formData.confirmNewPassword,
    };
    postData(data);
    setFormData({
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    });
  };

  function postData(data: any) {
    console.log("data :", data);

    try {
      const post = fetch("http://localhost:4000/user/change-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(data),
      });
      console.log("post", post);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <NavbarNew>
        <div className="w-full mx-auto p-4 bg-white rounded-md shadow-md">
          <h2 className="text-2xl font-bold mb-4">Change Password</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="oldPassword"
                className="block text-sm font-medium text-gray-600"
              >
                Old Password
              </label>
              <input
                type="password"
                id="oldPassword"
                name="oldPassword"
                value={formData.oldPassword}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-gray-600"
              >
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="confirmNewPassword"
                className="block text-sm font-medium text-gray-600"
              >
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirmNewPassword"
                name="confirmNewPassword"
                value={formData.confirmNewPassword}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded-md"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Change Password
            </button>
          </form>
        </div>
      </NavbarNew>
    </div>
  );
};

export default ChangePasswordForm;
