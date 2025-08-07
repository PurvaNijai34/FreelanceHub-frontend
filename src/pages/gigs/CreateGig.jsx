// import { useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// // import { BASE_URL } from "../utils/config";
// import { BASE_URL } from "../../utils/config"; // Adjust the import path as needed
// const CreateGig = ({ onClose }) => {
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     price: "",
//     deliveryTime: "",
//     category: "",
//   });
//   const [images, setImages] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const handleInput = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleImageChange = (e) => {
//     setImages([...e.target.files]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (images.length === 0) return toast.error("Please upload at least one image.");

//     const data = new FormData();
//     Object.entries(formData).forEach(([key, value]) => data.append(key, value));
//     images.forEach((img) => data.append("images", img));

//     try {
//       setLoading(true);
//       const token = localStorage.getItem("token");

//       const res = await axios.post(`${BASE_URL}/gigs`, data, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       toast.success("Gig created successfully!");
//       setFormData({
//         title: "",
//         description: "",
//         price: "",
//         deliveryTime: "",
//         category: "",
//       });
//       setImages([]);
//       onClose(); // close modal and refresh gigs
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to create gig");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-xl p-6 mx-auto text-white bg-gray-900 rounded-lg shadow-md">
//       <h2 className="mb-4 text-2xl font-bold text-center text-blue-400">Create a Gig</h2>
//       <form onSubmit={handleSubmit} className="space-y-3">
//         <input
//           type="text"
//           name="title"
//           value={formData.title}
//           onChange={handleInput}
//           placeholder="Title"
//           className="w-full px-3 py-2 text-sm bg-gray-800 border border-gray-600 rounded"
//           required
//         />
//         <textarea
//           name="description"
//           value={formData.description}
//           onChange={handleInput}
//           placeholder="Description"
//           className="w-full h-24 px-3 py-2 text-sm bg-gray-800 border border-gray-600 rounded resize-none"
//           required
//         />
//         <div className="flex gap-2">
//           <input
//             type="number"
//             name="price"
//             value={formData.price}
//             onChange={handleInput}
//             placeholder="Price"
//             className="w-1/2 px-3 py-2 text-sm bg-gray-800 border border-gray-600 rounded"
//             required
//           />
//           <input
//             type="number"
//             name="deliveryTime"
//             value={formData.deliveryTime}
//             onChange={handleInput}
//             placeholder="Delivery Time (days)"
//             className="w-1/2 px-3 py-2 text-sm bg-gray-800 border border-gray-600 rounded"
//             required
//           />
//         </div>
//         <input
//           type="text"
//           name="category"
//           value={formData.category}
//           onChange={handleInput}
//           placeholder="Category"
//           className="w-full px-3 py-2 text-sm bg-gray-800 border border-gray-600 rounded"
//           required
//         />
//         <input
//           type="file"
//           multiple
//           accept="image/*"
//           onChange={handleImageChange}
//           className="w-full px-3 py-2 text-sm bg-gray-800 border border-gray-600 rounded file:mr-4 file:px-3 file:py-2 file:bg-blue-600 file:text-white file:rounded"
//         />
//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full py-2 font-bold transition bg-blue-600 rounded hover:bg-blue-700"
//         >
//           {loading ? "Creating..." : "Create Gig"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CreateGig;








import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../../utils/config"; // Ensure this path is correct

const CreateGig = ({ onClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    deliveryTime: "",
    category: "",
  });

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (images.length === 0) {
      toast.error("Please upload at least one image.");
      return;
    }

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));
    images.forEach((img) => data.append("images", img));

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const res = await axios.post(`${BASE_URL}/gigs`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 201 || res.status === 200) {
        toast.success("Gig created successfully!");
        setFormData({
          title: "",
          description: "",
          price: "",
          deliveryTime: "",
          category: "",
        });
        setImages([]);
        onClose(); 
      } else {
        throw new Error("Unexpected response status");
      }
    } catch (err) {
      console.error("Gig creation error:", err);
      toast.error(
        err.response?.data?.message ||
        err.message ||
        "Failed to create gig"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl p-6 mx-auto text-white bg-gray-900 rounded-lg shadow-md">
      <h2 className="mb-4 text-2xl font-bold text-center text-blue-400">Create a Gig</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInput}
          placeholder="Title"
          className="w-full px-3 py-2 text-sm bg-gray-800 border border-gray-600 rounded"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInput}
          placeholder="Description"
          className="w-full h-24 px-3 py-2 text-sm bg-gray-800 border border-gray-600 rounded resize-none"
          required
        />
        <div className="flex gap-2">
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInput}
            placeholder="Price"
            className="w-1/2 px-3 py-2 text-sm bg-gray-800 border border-gray-600 rounded"
            required
          />
          <input
            type="number"
            name="deliveryTime"
            value={formData.deliveryTime}
            onChange={handleInput}
            placeholder="Delivery Time (days)"
            className="w-1/2 px-3 py-2 text-sm bg-gray-800 border border-gray-600 rounded"
            required
          />
        </div>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleInput}
          placeholder="Category"
          className="w-full px-3 py-2 text-sm bg-gray-800 border border-gray-600 rounded"
          required
        />
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          className="w-full px-3 py-2 text-sm bg-gray-800 border border-gray-600 rounded file:mr-4 file:px-3 file:py-2 file:bg-blue-600 file:text-white file:rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 font-bold rounded transition ${
            loading ? "bg-gray-600 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Creating..." : "Create Gig"}
        </button>
      </form>
    </div>
  );
};

export default CreateGig;
