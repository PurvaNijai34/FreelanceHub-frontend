import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL, BASE_FILE_URL } from "../../utils/config";
import { FaStar } from "react-icons/fa";

const GigDetail = () => {
  const { id } = useParams();
  const [gig, setGig] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const currentUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetch(`${BASE_URL}/gigs/${id}`)
      .then((res) => res.json())
      .then((data) => setGig(data))
      .catch((err) => console.error("Failed to load gig:", err));

    fetch(`${BASE_URL}/reviews/gig/${id}`)
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch((err) => console.error("Failed to load reviews:", err));
  }, [id]);

  const imageUrl = gig?.images?.[0]?.startsWith("/uploads/")
    ? `${BASE_FILE_URL}${gig.images[0]}`
    : `${BASE_FILE_URL}/uploads/${gig?.images?.[0]}`;

  const handlePurchase = async (gigId) => {
    const token = localStorage.getItem("token");
    if (!token) return alert("Please log in to purchase.");

    try {
      const res = await fetch(`${BASE_URL}/payment/create-checkout-session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ gigId }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      window.location.href = data.url;
    } catch (err) {
      alert(err.message || "Failed to start checkout");
    }
  };

  const handleSubmitReview = async () => {
    const token = localStorage.getItem("token");
    if (!token) return alert("Please log in to review.");

    try {
      const res = await fetch(`${BASE_URL}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ gigId: id, rating, comment }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setReviews((prev) => [...prev, data]);
      setRating(0);
      setComment("");
      alert("Review submitted successfully!");
    } catch (err) {
      alert(err.message || "Failed to submit review.");
    }
  };

  if (!gig) return <p className="p-6 text-white">Loading...</p>;

  return (
    <div className="min-h-screen px-4 py-8 text-white bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-blue-400">{gig?.title}</h1>
          <button
            onClick={() => (window.location.href = "/")}
            className="px-4 py-2 text-sm font-semibold text-white transition duration-200 bg-blue-600 rounded hover:bg-blue-700"
          >
            ⬅ Back
          </button>
        </div>

        {/* Image */}
        <div className="overflow-hidden shadow-lg rounded-2xl">
          <img
            src={imageUrl}
            alt={gig.title}
            className="object-cover w-full aspect-video"
          />
        </div>

        {/* Description */}
        <div className="text-lg leading-relaxed text-gray-300">{gig.description}</div>

        {/* Seller & Purchase */}
        <div className="flex flex-col justify-between gap-6 p-6 bg-gray-800 shadow-md rounded-xl md:flex-row">
          <div>
            <p className="text-lg font-semibold text-white">
              Seller: {gig.seller?.name}
            </p>
            <p className="text-sm text-gray-400">{gig.seller?.role}</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-green-400">₹{gig.price}</p>
            <button
              onClick={() => handlePurchase(gig._id)}
              className="px-5 py-2 mt-2 text-white bg-green-600 rounded hover:bg-green-700"
            >
              Purchase
            </button>
          </div>
        </div>

        {/* Reviews */}
        <div>
          <h2 className="mb-4 text-2xl font-semibold text-white">⭐ Reviews</h2>
          {reviews.length === 0 ? (
            <p className="text-gray-400">No reviews yet.</p>
          ) : (
            <ul className="space-y-4">
              {reviews.map((r) => (
                <li key={r._id} className="p-4 bg-gray-800 rounded-lg shadow">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-semibold text-blue-300">
                      {r.user.name} ({r.user.role})
                    </p>
                    <div className="flex">
                      {[...Array(r.rating)].map((_, i) => (
                        <FaStar key={i} className="text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-300">{r.comment}</p>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Leave Review */}
        {currentUser?.role === "client" && (
          <div className="p-6 mt-10 bg-gray-900 rounded-lg shadow">
            <h3 className="mb-4 text-xl font-semibold text-white">Leave a Review</h3>
            <div className="flex gap-2 mb-3">
              {[1, 2, 3, 4, 5].map((num) => (
                <FaStar
                  key={num}
                  className={`cursor-pointer text-2xl ${
                    num <= rating ? "text-yellow-400" : "text-gray-500"
                  }`}
                  onClick={() => setRating(num)}
                />
              ))}
            </div>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows="3"
              className="w-full p-3 text-black rounded-md resize-none"
              placeholder="Write your review..."
            />
            <button
              onClick={handleSubmitReview}
              className="px-4 py-2 mt-3 text-white bg-blue-600 rounded hover:bg-blue-700"
            >
              Submit Review
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GigDetail;
