// /client/src/components/EditGig.jsx
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../../utils/config";

const EditGig = ({ gig, onClose }) => {
  const [formData, setFormData] = useState({
    title: gig.title,
    description: gig.description,
    price: gig.price,
    deliveryTime: gig.deliveryTime,
    category: gig.category,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.put(`${BASE_URL}/gigs/${gig._id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      toast.success("Gig updated successfully!");
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update gig");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-900 rounded-lg shadow-lg">
      <h2 className="mb-4 text-2xl font-bold text-blue-400">Edit Gig</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded resize-none h-28"
          required
        />
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded"
          required
        />
        <input
          type="number"
          name="deliveryTime"
          value={formData.deliveryTime}
          onChange={handleChange}
          placeholder="Delivery Time (days)"
          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded"
          required
        />
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Category"
          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 mt-4 font-bold text-white transition bg-blue-600 rounded hover:bg-blue-700"
        >
          {loading ? "Updating..." : "Update Gig"}
        </button>
      </form>
    </div>
  );
};

export default EditGig;
