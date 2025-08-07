// ##################################33
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import { BASE_URL } from "../../utils/config";

const socket = io(BASE_URL); // Initialize socket

const Chat = () => {
  const { userId: selectedUserId } = useParams(); // Receiver's ID
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");
  const [selectedUser, setSelectedUser] = useState(null); // 💡 Store selected user info

  const chatEndRef = useRef(null);

  const currentUser = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  // 🔁 Join socket room
  useEffect(() => {
    if (currentUser?._id) {
      socket.emit("join", currentUser._id);
      console.log("🛜 Joined socket room:", currentUser._id);
    }
  }, [currentUser]);

  // 📩 Listen for incoming messages
  useEffect(() => {
    socket.on("receiveMessage", (msg) => {
      console.log("📥 New message:", msg);
      setMessages((prev) => [...prev, msg]);
    });
    return () => socket.off("receiveMessage");
  }, []);

  // 🔄 Fetch chat history + receiver user details
  useEffect(() => {
    const fetchMessagesAndUser = async () => {
      try {
        const [msgRes, userRes] = await Promise.all([
          fetch(`${BASE_URL}/messages/${selectedUserId}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${BASE_URL}/auth/user/${selectedUserId}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const [msgData, userData] = await Promise.all([
          msgRes.json(),
          userRes.json(),
        ]);

        setMessages(msgData);
        setSelectedUser(userData);
      } catch (err) {
        console.error("❌ Failed to load data:", err);
      }
    };

    if (selectedUserId) fetchMessagesAndUser();
  }, [selectedUserId, token]);

  // Scroll to bottom on new message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ✅ Send message
  const sendMessage = async () => {
    if (!newMsg.trim()) return;

    const msgObj = {
      sender: currentUser._id,
      receiver: selectedUserId,
      content: newMsg,
    };

    // Save to DB
    try {
      const res = await fetch(`${BASE_URL}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(msgObj),
      });

      const saved = await res.json();
      if (res.ok) {
        setMessages((prev) => [...prev, saved]);
        setNewMsg("");
        socket.emit("sendMessage", msgObj);
      }
    } catch (err) {
      console.error("❌ Error sending message:", err);
    }
  };

  return (
    <div className="max-w-3xl p-4 mx-auto mt-10 text-white bg-gray-900 rounded-lg shadow-lg">
  
    <div className="flex items-center justify-between">
       <h1 className="text-3xl font-bold text-blue-400">Chat Section </h1>
          <button
            onClick={() => (window.location.href = "/")}
            className="px-4 py-2 text-sm font-semibold text-white transition duration-200 bg-blue-600 rounded hover:bg-blue-700"
          >
            ⬅ Back
          </button>
        </div>
     
      <div className="flex items-center justify-between p-3 mb-4 text-lg font-semibold bg-gray-800 rounded shadow-md">


        <span>
          {selectedUser ? (
            <>
              💬 {" "}
              <span className="text-blue-400 capitalize">
                {selectedUser.name} ({selectedUser.role})
              </span>
            </>
          ) : (
            "Loading user..."
          )}
        </span>
      </div>

      {/* 📩 Message Box */}
      <div className="p-2 overflow-y-scroll bg-gray-800 border border-gray-700 rounded h-96">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-2 my-1 rounded max-w-[75%] ${
              msg.sender === currentUser._id
                ? "bg-blue-600 ml-auto text-right"
                : "bg-gray-700 text-left"
            }`}
          >
            {msg.content}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* ✍️ Input */}
      <div className="flex mt-4">
        <input
          type="text"
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 p-2 text-black rounded-l"
        />
        <button
          onClick={sendMessage}
          className="px-4 text-white bg-blue-600 rounded-r hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
