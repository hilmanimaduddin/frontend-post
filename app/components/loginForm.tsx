import Link from "next/link";
import UseLogin from "../hooks/useLogin";

const LoginForm = () => {
  const { formData, setFormData, handleChange, handleSubmit } = UseLogin();

  return (
    <div className="bg-white p-8 rounded shadow-md w-96 border border-gray-500">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
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
        <div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md"
          >
            Login
          </button>
          <p>
            Haven't registered yet?{" "}
            <Link href="/register">
              <span className="text-blue-500">Register</span>
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
