// /client/src/components/Navbar.jsx
import { useEffect, useState } from "react";
import {
  Menu,
  X,
  MessageSquare,
  Plus,
  UserCircle2,
  ShoppingCart,
  ChevronDown,
} from "lucide-react";
import toast from "react-hot-toast";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
// import Freelancer_profile from "../pages/freelancer/freelancer_profile";
import { BASE_URL } from "../utils/config";
import { useNavigate } from "react-router-dom"; // ✅ Add this

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [user, setUser] = useState(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate(); // ✅ Add this

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogin = async ({ email, password }) => {
    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);
      setShowLoginModal(false);
      // ✅ Navigate based on role
      if (data.user.role === "freelancer") {
        navigate("/dashboard/freelancer");
      } else if (data.user.role === "client") {
        navigate("/dashboard/client");
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const handleRegister = async ({ name, email, password, role }) => {
    try {
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      //   alert("Registered successfully! Please log in.");
      toast.success("Registered successfully!");
      setShowRegisterModal(false);
    } catch (err) {
      toast.error("Something went wrong!");

      alert(err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setShowProfileMenu(false);
    navigate("/"); // Redirect to home after logout
    toast.success("Logged out successfully!");
  };

  const freelancerProfile = () => {
    navigate("/dashboard/freelancer/freelancer_profile");
  };

  const orders = () => {
    navigate("/freelancers/orders");
  };

  const cliendOrders = () => {
    navigate("/client/orders");
  };

  return (
    <>
      <nav className="sticky top-0 z-50 text-white bg-gray-900 shadow-md">
        <div className="flex items-center justify-between px-4 py-4 mx-auto max-w-7xl">
          <h1 className="text-2xl font-bold text-blue-400">FreelanceHub</h1>

          <div className="items-center hidden gap-4 md:flex">
            {!user ? (
              <>
                
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                >
                  Sign In
                </button>
                <button
                  onClick={() => setShowRegisterModal(true)}
                  className="px-4 py-2 text-gray-900 bg-white rounded hover:bg-gray-300"
                >
                  Join
                </button>
              </>
            ) : user.role === "freelancer" ? (
              <>
           
                <MessageSquare
                  className="cursor-pointer hover:text-blue-400"
                  onClick={() => navigate(`/chat/${user._id}`)}
                />
            

                <div className="relative">
                  <button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="flex items-center gap-1 cursor-pointer hover:text-blue-400"
                  >
                    <UserCircle2 size={24} />
                    <span className="text-sm">{user.name}</span>
                    <ChevronDown size={16} />
                  </button>
                  {showProfileMenu && (
                    <div className="absolute right-0 z-10 w-40 mt-2 bg-gray-800 border border-gray-700 rounded shadow-lg">
                      <button
                        onClick={freelancerProfile} // Placeholder
                        className="block w-full px-4 py-2 text-sm text-left text-white hover:bg-gray-700"
                      >
                        My Profile
                      </button>
                      <button
                        onClick={orders}
                        className="block w-full px-4 py-2 text-sm text-left text-white hover:bg-gray-700"
                      >
                        Orders
                      </button>
                      <button
                        onClick={handleLogout}
                        className="block w-full px-4 py-2 text-sm text-left text-white hover:bg-gray-700"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                
                <MessageSquare
                  className="cursor-pointer hover:text-blue-400"
                  onClick={() => navigate(`/chat/${user._id}`)}
                />

                <div className="relative">
                  <button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="flex items-center gap-1 cursor-pointer hover:text-blue-400"
                  >
                    <UserCircle2 size={24} />
                    <span className="text-sm">{user.name}</span>
                    <ChevronDown size={16} />
                  </button>
                  {showProfileMenu && (
                    <div className="absolute right-0 z-10 w-40 mt-2 bg-gray-800 border border-gray-700 rounded shadow-lg">
                    <button
                        onClick={cliendOrders}
                        className="block w-full px-4 py-2 text-sm text-left text-white hover:bg-gray-700"
                      >
                        Purchased Gigs
                      </button>
                      <button
                        onClick={handleLogout}
                        className="block w-full px-4 py-2 text-sm text-left text-white hover:bg-gray-700"
                      >
                        Logout
                      </button>
                      
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          <button
            className="md:hidden"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {showMobileMenu && (
          <div className="flex flex-col gap-2 px-4 pb-4 bg-gray-800 md:hidden">
            {!user ? (
              <>
                <input
                  type="text"
                  placeholder="Search..."
                  className="px-4 py-2 text-sm bg-gray-700 border border-gray-600 rounded-lg"
                />
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                >
                  Sign In
                </button>
                <button
                  onClick={() => setShowRegisterModal(true)}
                  className="w-full px-4 py-2 text-gray-900 bg-white rounded hover:bg-gray-300"
                >
                  Join
                </button>
              </>
            ) : user.role === "freelancer" ? (
              <>
                <button
                  className="w-full text-left text-white"
                  onClick={() => navigate(`/chat/${user._id}`)}
                >
                  📩 Messages
                </button>

            
                <button className="w-full text-left text-white">
                  👤 {user.name}
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full text-left text-white hover:bg-gray-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                
                <button
                  className="w-full text-left text-white"
                  onClick={() => navigate(`/chat/${user._id}`)}
                >
                  📩 Messages
                </button>
                <button className="w-full text-left text-white">
                  👤 {user.name}
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full text-left text-white hover:bg-gray-700"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        )}
      </nav>

      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          onSubmit={handleLogin}
        />
      )}
      {showRegisterModal && (
        <RegisterModal
          onClose={() => setShowRegisterModal(false)}
          onSubmit={handleRegister}
        />
      )}
    </>
  );
};

export default Navbar;
