// /client/src/components/UserSidebar.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../utils/config";

const UserSidebar = () => {
  const [users, setUsers] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch(`${BASE_URL}/auth/users`);
      const data = await res.json();
      const filtered = data.filter((u) => u._id !== currentUser?._id);
      setUsers(filtered);
    };
    fetchUsers();
  }, []);

  return (
    <div className="w-full p-4 overflow-y-auto bg-gray-800 rounded-lg max-h-[85vh] md:w-64">
      <h2 className="mb-4 text-lg font-semibold text-blue-400">📋 All Users</h2>
      {users.length === 0 ? (
        <p className="text-sm text-gray-400">No other users found.</p>
      ) : (
        <ul className="space-y-2">
          {users.map((user) => (
            <li key={user._id}>
              <Link
                to={`/chat/${user._id}`}
                className="block px-4 py-2 text-sm text-white transition bg-gray-700 rounded hover:bg-blue-500"
              >
                {user.name} ({user.role})
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserSidebar;
