// // /client/src/pages/Freelancer_profile.jsx
// import React, { useEffect, useState } from "react";
// import {
//   PlusCircle,
//   PenSquare,
//   Trash2,
//   DollarSign,
//   Briefcase,
//   CheckCircle,
// } from "lucide-react";
// import { BASE_URL, BASE_FILE_URL } from "../../utils/config";
// import toast from "react-hot-toast";
// import CreateGig from "../gigs/CreateGig";
// import EditGig from "../gigs/EditGig";
// import Navbar from "../../components/Navbar";

// const Freelancer_profile = () => {
//   const [gigs, setGigs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showCreateModal, setShowCreateModal] = useState(false);
//   const [editingGig, setEditingGig] = useState(null);
//   const [search, setSearch] = useState("");
//   const [category, setCategory] = useState("");
//   const [earnings, setEarnings] = useState(0);
//   const [completedOrders, setCompletedOrders] = useState(0);

//   const token = localStorage.getItem("token");
//   const headers = {
//     Authorization: `Bearer ${token}`,
//     "Content-Type": "application/json",
//   };

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const userData = localStorage.getItem("user");

//     if (token && userData) {
//       const parsedUser = JSON.parse(userData);
//       console.log("✅ Parsed user:", parsedUser);
//       fetchGigs(parsedUser._id, token);
//       fetchEarnings(parsedUser._id, token);
//     }
//   }, []);

//   const fetchGigs = async (freelancerId, token) => {
//     try {
//       console.log("🧠 Logged in freelancer ID:", freelancerId);
//       const res = await fetch(`${BASE_URL}/gigs?sellerId=${freelancerId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message);

//       console.log("🎯 Filtered gigs from backend:", data);
//       setGigs(data);
//     } catch (err) {
//       toast.error("Failed to load gigs");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchEarnings = async (freelancerId, token) => {
//     try {
//       const res = await fetch(`${BASE_URL}/orders`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message);

//       const completedOrdersList = data.filter(
//         (order) =>
//           order.status === "completed" &&
//           order.sellerId?._id === freelancerId &&
//           order.gigId?.price
//       );

//       const total = completedOrdersList.reduce(
//         (sum, order) => sum + order.gigId.price,
//         0
//       );

//       setEarnings(total);
//       setCompletedOrders(completedOrdersList.length); // 👈 set count
//     } catch (err) {
//       toast.error("Failed to load earnings");
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       const res = await fetch(`${BASE_URL}/gigs/${id}`, {
//         method: "DELETE",
//         headers,
//       });
//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message);
//       toast.success("Gig deleted successfully");
//       fetchGigs();
//     } catch (err) {
//       toast.error(err.message);
//     }
//   };

//   const getImageUrl = (imgPath) => {
//     if (!imgPath) return "/default.png";
//     return imgPath.startsWith("/uploads/")
//       ? `${BASE_FILE_URL}${imgPath}`
//       : `${BASE_FILE_URL}/uploads/${imgPath}`;
//   };

//   const filteredGigs = gigs.filter((gig) => {
//     return (
//       (!search ||
//         gig.title.toLowerCase().includes(search.toLowerCase()) ||
//         gig.description.toLowerCase().includes(search.toLowerCase())) &&
//       (!category || gig.category === category)
//     );
//   });

//   return (
//     <div className="relative min-h-screen px-4 py-6 text-white bg-gray-900">
//       <Navbar />
//       <div className="flex flex-col items-start justify-between mb-6 sm:flex-row sm:items-center">
//           <h1 className="mb-2 text-2xl font-bold text-blue-400 sm:text-3xl sm:mb-0">
//             Welcome to Your Freelancer Dashboard
//           </h1>
//           <button
//             onClick={() => (window.location.href = "/")}
//             className="px-4 py-2 text-sm font-semibold text-white transition duration-200 bg-blue-600 rounded hover:bg-blue-700"
//           >
//             ⬅ Back
//           </button>
//         </div>
//       <div className="grid grid-cols-1 gap-4 mb-8 md:grid-cols-3">
//         <StatCard
//           icon={<Briefcase />}
//           label="Active Gigs"
//           value={gigs.length}
//         />
//         <StatCard
//           icon={<DollarSign />}
//           label="Total Earnings"
//           value={`₹${earnings}`}
//         />
//         <StatCard
//           icon={<CheckCircle />}
//           label="Completed Orders"
//           value={completedOrders}
//         />
//       </div>

//       <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
//         <div className="flex flex-col gap-2 md:flex-row">
//           <input
//             type="text"
//             placeholder="Search by title or description"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="px-4 py-2 text-sm text-white bg-gray-800 border border-gray-700 rounded"
//           />
//           <select
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//             className="px-4 py-2 text-sm text-white bg-gray-800 border border-gray-700 rounded"
//           >
//             <option value="">All Categories</option>
//             <option value="logo">Logo</option>
//             <option value="design">Design</option>
//             <option value="writing">Writing</option>
//             <option value="web">Web Development</option>
//           </select>
//         </div>
//         <button
//           onClick={() => setShowCreateModal(true)}
//           className="flex items-center gap-2 px-4 py-2 text-sm text-white transition bg-blue-600 rounded hover:bg-blue-700"
//         >
//           <PlusCircle size={18} />
//           Create New Gig
//         </button>
//       </div>

//       {loading ? (
//         <p className="text-gray-400">Loading gigs...</p>
//       ) : filteredGigs.length === 0 ? (
//         <p className="text-gray-400">No gigs match your criteria.</p>
//       ) : (
//         <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
//           {filteredGigs.map((gig) => (
//             <div
//               key={gig._id}
//               className="p-4 bg-gray-800 rounded-lg shadow hover:shadow-blue-500/30"
//             >
//               <img
//                 src={getImageUrl(gig.images?.[0])}
//                 alt={gig.title}
//                 className="object-cover w-full h-40 mb-2 rounded"
//               />
//               <h3 className="text-lg font-bold">{gig.title}</h3>
//               <p className="text-sm text-gray-400">{gig.description}</p>
//               <div className="flex items-center justify-between mt-4">
//                 <span className="font-semibold text-blue-400">
//                   ₹{gig.price}
//                 </span>
//                 <div className="flex gap-2">
//                   <button
//                     onClick={() => setEditingGig(gig)}
//                     className="p-1 transition rounded hover:bg-gray-700"
//                   >
//                     <PenSquare size={18} />
//                   </button>
//                   <button
//                     onClick={() => handleDelete(gig._id)}
//                     className="p-1 transition rounded hover:bg-red-700"
//                   >
//                     <Trash2 size={18} />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {showCreateModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
//           <div className="relative w-full max-w-2xl p-4">
//             <button
//               onClick={() => setShowCreateModal(false)}
//               className="absolute text-white top-2 right-2 hover:text-red-400"
//             >
//               ✖
//             </button>
//             <CreateGig
//               onClose={() => {
//                 setShowCreateModal(false);
//                 fetchGigs();
//               }}
//             />
//           </div>
//         </div>
//       )}

//       {editingGig && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
//           <div className="relative w-full max-w-2xl p-4">
//             <button
//               onClick={() => setEditingGig(null)}
//               className="absolute text-white top-2 right-2 hover:text-red-400"
//             >
//               ✖
//             </button>
//             <EditGig
//               gig={editingGig}
//               onClose={() => {
//                 setEditingGig(null);
//                 fetchGigs();
//               }}
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// const StatCard = ({ icon, label, value }) => (
//   <div className="flex items-center p-4 space-x-4 bg-gray-800 rounded-lg shadow hover:shadow-blue-500/20">
//     <div className="text-blue-400">{icon}</div>
//     <div>
//       <p className="text-sm text-gray-400">{label}</p>
//       <p className="text-xl font-semibold">{value}</p>
//     </div>
//   </div>
// );

// export default Freelancer_profile;





// /client/src/pages/Freelancer_profile.jsx
import React, { useEffect, useState } from "react";
import {
  PlusCircle,
  PenSquare,
  Trash2,
  DollarSign,
  Briefcase,
  CheckCircle,
} from "lucide-react";
import { BASE_URL, BASE_FILE_URL } from "../../utils/config";
import toast from "react-hot-toast";
import CreateGig from "../gigs/CreateGig";
import EditGig from "../gigs/EditGig";
import Navbar from "../../components/Navbar";

const Freelancer_profile = () => {
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingGig, setEditingGig] = useState(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [earnings, setEarnings] = useState(0);
  const [completedOrders, setCompletedOrders] = useState(0);
  const [user, setUser] = useState(null);

  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser); // ✅ store user for later use
      fetchGigs(parsedUser._id, token);
      fetchEarnings(parsedUser._id, token);
    }
  }, []);

  const fetchGigs = async (freelancerId, token) => {
    if (!freelancerId) return;
    try {
      const res = await fetch(`${BASE_URL}/gigs?sellerId=${freelancerId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setGigs(data);
    } catch (err) {
      toast.error("Failed to load gigs");
    } finally {
      setLoading(false);
    }
  };

  const fetchEarnings = async (freelancerId, token) => {
    if (!freelancerId) return;
    try {
      const res = await fetch(`${BASE_URL}/orders`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      const completedOrdersList = data.filter(
        (order) =>
          order.status === "completed" &&
          order.sellerId?._id === freelancerId &&
          order.gigId?.price
      );

      const total = completedOrdersList.reduce(
        (sum, order) => sum + order.gigId.price,
        0
      );

      setEarnings(total);
      setCompletedOrders(completedOrdersList.length);
    } catch (err) {
      toast.error("Failed to load earnings");
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/gigs/${id}`, {
        method: "DELETE",
        headers,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      toast.success("Gig deleted successfully");
      fetchGigs(user._id, token); // ✅ use stored user
    } catch (err) {
      toast.error(err.message);
    }
  };

  const getImageUrl = (imgPath) => {
    if (!imgPath) return "/default.png";
    return imgPath.startsWith("/uploads/")
      ? `${BASE_FILE_URL}${imgPath}`
      : `${BASE_FILE_URL}/uploads/${imgPath}`;
  };

  const filteredGigs = gigs.filter((gig) => {
    return (
      (!search ||
        gig.title.toLowerCase().includes(search.toLowerCase()) ||
        gig.description.toLowerCase().includes(search.toLowerCase())) &&
      (!category || gig.category === category)
    );
  });

  return (
    <div className="relative min-h-screen px-4 py-6 text-white bg-gray-900">
      <Navbar />

      <div className="flex flex-col items-start justify-between mb-6 sm:flex-row sm:items-center">
        <h1 className="mb-2 text-2xl font-bold text-blue-400 sm:text-3xl sm:mb-0">
          Welcome to Your Freelancer Dashboard
        </h1>
        <button
          onClick={() => (window.location.href = "/")}
          className="px-4 py-2 text-sm font-semibold text-white transition duration-200 bg-blue-600 rounded hover:bg-blue-700"
        >
          ⬅ Back
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 mb-8 md:grid-cols-3">
        <StatCard icon={<Briefcase />} label="Active Gigs" value={gigs.length} />
        <StatCard icon={<DollarSign />} label="Total Earnings" value={`₹${earnings}`} />
        <StatCard icon={<CheckCircle />} label="Completed Orders" value={completedOrders} />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <div className="flex flex-col gap-2 md:flex-row">
          <input
            type="text"
            placeholder="Search by title or description"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 text-sm text-white bg-gray-800 border border-gray-700 rounded"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-2 text-sm text-white bg-gray-800 border border-gray-700 rounded"
          >
            <option value="">All Categories</option>
            <option value="logo">Logo</option>
            <option value="design">Design</option>
            <option value="writing">Writing</option>
            <option value="web">Web Development</option>
          </select>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 text-sm text-white transition bg-blue-600 rounded hover:bg-blue-700"
        >
          <PlusCircle size={18} />
          Create New Gig
        </button>
      </div>

      {loading ? (
        <p className="text-gray-400">Loading gigs...</p>
      ) : filteredGigs.length === 0 ? (
        <p className="text-gray-400">No gigs match your criteria.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredGigs.map((gig) => (
            <div key={gig._id} className="p-4 bg-gray-800 rounded-lg shadow hover:shadow-blue-500/30">
              <img
                src={getImageUrl(gig.images?.[0])}
                alt={gig.title}
                className="object-cover w-full h-40 mb-2 rounded"
              />
              <h3 className="text-lg font-bold">{gig.title}</h3>
              <p className="text-sm text-gray-400">{gig.description}</p>
              <div className="flex items-center justify-between mt-4">
                <span className="font-semibold text-blue-400">₹{gig.price}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditingGig(gig)}
                    className="p-1 transition rounded hover:bg-gray-700"
                  >
                    <PenSquare size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(gig._id)}
                    className="p-1 transition rounded hover:bg-red-700"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showCreateModal && user && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl p-4">
            <button
              onClick={() => setShowCreateModal(false)}
              className="absolute text-white top-2 right-2 hover:text-red-400"
            >
              ✖
            </button>
            <CreateGig
              onClose={() => {
                setShowCreateModal(false);
                fetchGigs(user._id, token); // ✅ use stored user
              }}
            />
          </div>
        </div>
      )}

      {editingGig && user && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl p-4">
            <button
              onClick={() => setEditingGig(null)}
              className="absolute text-white top-2 right-2 hover:text-red-400"
            >
              ✖
            </button>
            <EditGig
              gig={editingGig}
              onClose={() => {
                setEditingGig(null);
                fetchGigs(user._id, token); // ✅ use stored user
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

const StatCard = ({ icon, label, value }) => (
  <div className="flex items-center p-4 space-x-4 bg-gray-800 rounded-lg shadow hover:shadow-blue-500/20">
    <div className="text-blue-400">{icon}</div>
    <div>
      <p className="text-sm text-gray-400">{label}</p>
      <p className="text-xl font-semibold">{value}</p>
    </div>
  </div>
);

export default Freelancer_profile;

