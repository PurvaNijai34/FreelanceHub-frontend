// /client/src/components/AuthModal.jsx
import { useState } from "react";
import axios from "axios";

const AuthModal = ({ type = "login", onClose, onSuccess }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const isRegister = type === "register";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = isRegister ? "/api/auth/register" : "/api/auth/login";

    try {
      const res = await axios.post(endpoint, form);
      const user = res.data.user; // from backend: { id, name, email, role }
      onSuccess(user);
    } catch (err) {
      console.error(err);
      alert("Login/Register failed");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="w-full max-w-md p-6 text-white bg-gray-900 rounded-lg shadow-xl animate-fade-in">
        <h2 className="mb-4 text-2xl font-bold text-center">
          {isRegister ? "Join FreelanceHub" : "Sign In to FreelanceHub"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Name"
                required
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                required
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                required
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 text-gray-300 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Role</option>
                <option value="client">Client</option>
                <option value="freelancer">Freelancer</option>
              </select>
            </>
          )}

          {!isRegister && (
            <>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                required
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                required
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </>
          )}

          <button
            type="submit"
            className="w-full py-2 text-white transition bg-blue-500 rounded hover:bg-blue-600"
          >
            {isRegister ? "Register" : "Login"}
          </button>
        </form>

        <button
          onClick={onClose}
          className="block mx-auto mt-4 text-sm text-gray-400 hover:underline"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AuthModal;
