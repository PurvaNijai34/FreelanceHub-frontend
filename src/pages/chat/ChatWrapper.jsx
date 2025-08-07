import { useState } from "react";
import { useParams } from "react-router-dom";
import Chat from "./Chat";
import UserSidebar from "../../components/UserSidebar";

const ChatWrapper = () => {
  const { userId } = useParams();
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex flex-col h-screen text-white bg-gray-900 md:flex-row">
      {/* Mobile Topbar */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-800 md:hidden">
        <h2 className="text-lg font-bold text-blue-400">Chat App</h2>
        <button
          onClick={toggleSidebar}
          className="text-2xl text-white focus:outline-none"
        >
          ☰
        </button>
      </div>

      {/* Sidebar (User list) */}
      <aside
        className={`${
          isSidebarOpen ? "block" : "hidden"
        } md:block w-full md:w-1/4 bg-gray-800 border-r border-gray-700 p-4 overflow-y-auto absolute md:static z-20 h-full`}
      >
        {/* Close button on mobile only */}
        <div className="flex items-center justify-between mb-4 md:hidden">
          <h2 className="text-xl font-bold text-blue-400">📋 Users</h2>
          <button
            onClick={toggleSidebar}
            className="text-xl text-white hover:text-red-400"
          >
            ✖
          </button>
        </div>

        <UserSidebar />
      </aside>

      {/* Chat area */}
    
      <main className="flex-1 p-4 overflow-hidden">
        <div className="h-full overflow-y-auto">
          <Chat currentUserId={currentUser?.id} selectedUserId={userId} />
        </div>
      </main>
    </div>
  );
};

export default ChatWrapper;

