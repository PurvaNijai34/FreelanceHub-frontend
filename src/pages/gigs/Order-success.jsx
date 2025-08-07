import React from "react";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center text-white bg-gray-900">
      <div className="max-w-md">
        <h1 className="mb-4 text-4xl font-bold text-green-400">🎉 Payment Successful!</h1>
        <p className="mb-6 text-lg text-gray-300">
          Thank you for your purchase! Your order has been confirmed and is being processed.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-2 text-sm font-semibold text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;
