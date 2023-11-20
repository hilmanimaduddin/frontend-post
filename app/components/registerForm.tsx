"use client";

import Link from "next/link";
import UseRegister from "../hooks/useRegister";

const RegisterForm = () => {
  const { formData, setFormData, handleChange, handleSubmit } = UseRegister();

  return (
    <div className="bg-white p-8 rounded shadow-md w-96 border border-gray-500">
      <h2 className="text-2xl font-semibold mb-4">Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-600"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="mt-1 p-2 w-full border rounded-md"
            onChange={handleChange}
            value={formData.name}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-600"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="mt-1 p-2 w-full border rounded-md"
            onChange={handleChange}
            value={formData.username}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-600"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="mt-1 p-2 w-full border rounded-md"
            onChange={handleChange}
            value={formData.email}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-600"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="mt-1 p-2 w-full border rounded-md"
            onChange={handleChange}
            value={formData.password}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-600"
          >
            Image
          </label>
          <input
            type="file"
            id="image"
            name="file"
            className="mt-1 p-2 w-full border rounded-md"
            accept="image/*"
            onChange={handleChange}
          />
        </div>
        <div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md"
          >
            Register
          </button>
          <p>
            Already have an account?
            <Link href="/login">
              <span className="text-blue-500">Login</span>
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
