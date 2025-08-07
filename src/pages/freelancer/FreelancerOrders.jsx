import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BASE_URL } from "../../utils/config";

const FreelancerOrders = () => {
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    if (token && userData) {
      const parsed = JSON.parse(userData);
      setUser(parsed);
      fetchOrders(parsed._id, token);
    }
  }, []);

  const fetchOrders = async (freelancerId, token) => {
    try {
      console.log("fetch order");

      const res = await fetch(`${BASE_URL}/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);


      const myOrders = data.filter(
        (o) => String(o.sellerId?._id) === String(freelancerId)
      );
      
      setOrders(myOrders);
    
    } catch (err) {
      toast.error("Failed to load orders");
    }
  };

  return (
    <div className="min-h-screen px-6 py-10 text-white bg-gray-900">
     
<div className="flex flex-col items-start justify-between mb-6 sm:flex-row sm:items-center">
          <h1 className="mb-2 text-2xl font-bold text-blue-400 sm:text-3xl sm:mb-0">
        📦 Your Sold Orders
          </h1>
          <button
            onClick={() => (window.location.href = "/")}
            className="px-4 py-2 text-sm font-semibold text-white transition duration-200 bg-blue-600 rounded hover:bg-blue-700"
          >
            ⬅ Back
          </button>
        </div>
      {orders.length === 0 ? (
        <p className="text-gray-400">No orders yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {orders.map((order) => (
            <div
              key={order._id}
              className="p-4 bg-gray-800 border border-gray-700 rounded shadow"
            >
              <h2 className="text-lg font-semibold text-blue-300">
                🛠 Gig: {order.gigId?.title || "Untitled Gig"}
              </h2>
              <p className="text-sm text-gray-300">
                Buyer:{" "}
                <span className="text-white">
                  {order.buyerId?.name || "Unknown"}
                </span>
              </p>
              <p className="mt-2 font-bold text-green-400">
                Status: {order.status}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FreelancerOrders;
