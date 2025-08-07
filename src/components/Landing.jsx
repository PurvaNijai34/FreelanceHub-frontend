// import React, { useEffect, useRef, useState } from "react";
// import { BASE_URL, BASE_FILE_URL } from "../utils/config";
// import toast from "react-hot-toast";
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";

// const categories = ["Web Design", "WordPress", "Logo Design", "AI Services"];

// const fadeIn = {
//   hidden: { opacity: 0, y: 30 },
//   visible: { opacity: 1, y: 0 },
// };

// const Landing = () => {
//   const [user, setUser] = useState(null);
//   const [gigs, setGigs] = useState([]);
//   const [search, setSearch] = useState("");
//   const [activeCategory, setActiveCategory] = useState("");

//   const gigsSectionRef = useRef(null);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const userData = localStorage.getItem("user");
//     if (token && userData) {
//       setUser(JSON.parse(userData));
//     }
//     fetchGigs();
//   }, []);

//   const fetchGigs = async () => {
//     try {
//       const res = await fetch(`${BASE_URL}/gigs`);
//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message);
//       setGigs(data);
//     } catch (err) {
//       toast.error("Failed to load gigs");
//     }
//   };

//   const scrollToGigs = () => {
//     gigsSectionRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   const filteredGigs = gigs.filter((gig) => {
//     const matchesSearch =
//       gig.title.toLowerCase().includes(search.toLowerCase()) ||
//       gig.description.toLowerCase().includes(search.toLowerCase());
//     const matchesCategory = activeCategory
//       ? gig.category?.toLowerCase() === activeCategory.toLowerCase()
//       : true;
//     return matchesSearch && matchesCategory;
//   });

//   const halfway = Math.ceil(filteredGigs.length / 2);
//   const firstRow = filteredGigs.slice(0, halfway);
//   const secondRow = filteredGigs.slice(halfway);

//   return (
//     <div className="min-h-screen text-white bg-gray-950">
//       {/* HERO SECTION */}
//       <motion.section
//         variants={fadeIn}
//         initial="hidden"
//         animate="visible"
//         transition={{ duration: 0.6 }}
//         className="flex flex-col items-center justify-center px-6 py-20 text-center"
//       >
//         <h1 className="text-4xl font-bold text-white">
//           Find the perfect <em className="italic text-gray-300">freelance</em>{" "}
//           <span className="text-blue-400">services</span> for your business
//         </h1>

//         {/* Search Bar */}
//         <div className="flex w-full max-w-xl mt-6 overflow-hidden rounded-lg shadow-lg">
//           <input
//             type="text"
//             value={search}
//             onChange={(e) => {
//               setSearch(e.target.value);
//               scrollToGigs(); // auto-scroll on search input
//             }}
//             placeholder='Try "building mobile app"'
//             className="w-full px-4 py-2 text-sm text-black outline-none"
//           />
//           <button
//             disabled
//             className="px-6 font-medium text-white bg-blue-600 cursor-not-allowed opacity-60"
//           >
//             Search
//           </button>
//         </div>

//         {/* Category Filters */}
//         <div className="flex flex-wrap justify-center gap-3 mt-4 text-sm">
//           <span className="text-gray-400">Popular:</span>
//           <button
//             onClick={() => {
//               setActiveCategory("");
//               scrollToGigs();
//             }}
//             className={`px-4 py-1 border rounded-full transition-all ${
//               activeCategory === ""
//                 ? "bg-blue-500 border-blue-400"
//                 : "hover:bg-blue-700 border-gray-600"
//             }`}
//           >
//             All
//           </button>
//           {categories.map((cat) => (
//             <button
//               key={cat}
//               onClick={() => {
//                 setActiveCategory(cat);
//                 scrollToGigs(); // auto-scroll on category click
//               }}
//               className={`px-4 py-1 border rounded-full transition-all ${
//                 activeCategory === cat
//                   ? "bg-blue-500 border-blue-400"
//                   : "hover:bg-blue-700 border-gray-600"
//               }`}
//             >
//               {cat}
//             </button>
//           ))}
//         </div>

//         {/* Filter Summary */}
//         {(search || activeCategory) && (
//           <div className="mt-4 text-sm text-gray-400">
//             Showing results for{" "}
//             {search && <span className="text-white">"{search}"</span>}
//             {search && activeCategory && " in "}
//             {activeCategory && (
//               <span className="text-blue-400">{activeCategory}</span>
//             )}
//           </div>
//         )}
//       </motion.section>

//       {/* GIGS SECTION */}
//       <section ref={gigsSectionRef} className="px-6 py-12">
//         {filteredGigs.length === 0 ? (
//           <p className="text-center text-gray-400">No gigs match your search.</p>
//         ) : (
//           <>
//             {/* First Row */}
//             <div className="mb-6 overflow-x-auto styled-scrollbar scroll-smooth">
//               <div className="flex gap-6 w-max">
//                 {firstRow.map((gig) => {
//                   const imageUrl = gig.images?.[0]?.startsWith("/uploads/")
//                     ? `${BASE_FILE_URL}${gig.images[0]}`
//                     : `${BASE_FILE_URL}/uploads/${gig.images[0]}`;

//                   return (
//                     <Link
//                       to={`/gigs/${gig._id}`}
//                       key={gig._id}
//                       className="w-[270px] bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-4 shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-1 hover:scale-[1.02] transition-all"
//                     >
//                       <img
//                         src={imageUrl}
//                         onError={(e) => (e.target.src = "/default.png")}
//                         alt={gig.title}
//                         className="object-cover w-full mb-2 rounded-lg h-36"
//                       />
//                       <h3 className="text-lg font-semibold truncate">
//                         {gig.title}
//                       </h3>
//                       <p className="text-sm text-gray-400 line-clamp-2">
//                         {gig.description}
//                       </p>
//                       <div className="flex items-center justify-between mt-2">
//                         <span className="text-sm font-bold text-blue-400">
//                           ₹{gig.price}
//                         </span>
//                         <span className="bg-blue-700 text-xs px-2 py-0.5 rounded-full text-white">
//                           {gig.category}
//                         </span>
//                       </div>
//                     </Link>
//                   );
//                 })}
//               </div>
//             </div>

//             {/* Second Row */}
//             <div className="overflow-x-auto styled-scrollbar scroll-smooth">
//               <div className="flex gap-6 w-max">
//                 {secondRow.map((gig) => {
//                   const imageUrl = gig.images?.[0]?.startsWith("/uploads/")
//                     ? `${BASE_FILE_URL}${gig.images[0]}`
//                     : `${BASE_FILE_URL}/uploads/${gig.images[0]}`;

//                   return (
//                     <Link
//                       to={`/gigs/${gig._id}`}
//                       key={gig._id}
//                       className="w-[270px] bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-4 shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-1 hover:scale-[1.02] transition-all"
//                     >
//                       <img
//                         src={imageUrl}
//                         onError={(e) => (e.target.src = "/default.png")}
//                         alt={gig.title}
//                         className="object-cover w-full mb-2 rounded-lg h-36"
//                       />
//                       <h3 className="text-lg font-semibold truncate">
//                         {gig.title}
//                       </h3>
//                       <p className="text-sm text-gray-400 line-clamp-2">
//                         {gig.description}
//                       </p>
//                       <div className="flex items-center justify-between mt-2">
//                         <span className="text-sm font-bold text-blue-400">
//                           ₹{gig.price}
//                         </span>
//                         <span className="bg-blue-700 text-xs px-2 py-0.5 rounded-full text-white">
//                           {gig.category}
//                         </span>
//                       </div>
//                     </Link>
//                   );
//                 })}
//               </div>
//             </div>
//           </>
//         )}
//       </section>

//       {/* FOOTER */}
//       <footer className="py-6 mt-12 text-sm text-center text-gray-500 border-t border-gray-800 bg-gray-950">
//         © 2025 FreelanceHub. All rights reserved.
//       </footer>
//     </div>
//   );
// };

// export default Landing;




import React, { useEffect, useRef, useState } from "react";
import { BASE_URL, BASE_FILE_URL } from "../utils/config";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const categories = ["Web Design", "WordPress", "Logo Design", "AI Services"];

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const Landing = () => {
  const [user, setUser] = useState(null);
  const [gigs, setGigs] = useState([]);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("");

  const gigsSectionRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
    fetchGigs();
  }, []);

  const fetchGigs = async () => {
    try {
      const res = await fetch(`${BASE_URL}/gigs`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setGigs(data);
    } catch (err) {
      toast.error("Failed to load gigs");
    }
  };

  const scrollToGigs = () => {
    gigsSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const filteredGigs = gigs.filter((gig) => {
    const matchesSearch =
      gig.title.toLowerCase().includes(search.toLowerCase()) ||
      gig.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory
      ? gig.category?.toLowerCase() === activeCategory.toLowerCase()
      : true;
    return matchesSearch && matchesCategory;
  });

  const halfway = Math.ceil(filteredGigs.length / 2);
  const firstRow = filteredGigs.slice(0, halfway);
  const secondRow = filteredGigs.slice(halfway);

  return (
    <div className="min-h-screen text-white bg-gray-950">
      {/* HERO SECTION */}
      <motion.section
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center justify-center px-6 py-20 text-center"
      >
        <h1 className="text-4xl font-bold text-white">
          Find the perfect <em className="italic text-gray-300">freelance</em>{" "}
          <span className="text-blue-400">services</span> for your business
        </h1>

        {/* Search Bar */}
        <div className="flex w-full max-w-xl mt-6 overflow-hidden rounded-lg shadow-lg">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder='Try "building mobile app"'
            className="w-full px-4 py-2 text-sm text-black outline-none"
          />
          <button
            onClick={scrollToGigs}
            className="px-6 font-medium text-white transition bg-blue-600 hover:bg-blue-700"
          >
            Search
          </button>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mt-4 text-sm">
          <span className="text-gray-400">Popular:</span>
          <button
            onClick={() => {
              setActiveCategory("");
              scrollToGigs();
            }}
            className={`px-4 py-1 border rounded-full transition-all ${
              activeCategory === ""
                ? "bg-blue-500 border-blue-400"
                : "hover:bg-blue-700 border-gray-600"
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                scrollToGigs();
              }}
              className={`px-4 py-1 border rounded-full transition-all ${
                activeCategory === cat
                  ? "bg-blue-500 border-blue-400"
                  : "hover:bg-blue-700 border-gray-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Filter Summary */}
        {(search || activeCategory) && (
          <div className="mt-4 text-sm text-gray-400">
            Showing results for{" "}
            {search && <span className="text-white">"{search}"</span>}
            {search && activeCategory && " in "}
            {activeCategory && (
              <span className="text-blue-400">{activeCategory}</span>
            )}
          </div>
        )}
      </motion.section>

      {/* GIGS SECTION */}
      <section ref={gigsSectionRef} className="px-6 py-12">
        {filteredGigs.length === 0 ? (
          <p className="text-center text-gray-400">No gigs match your search.</p>
        ) : (
          <>
            {/* First Row */}
            <div className="mb-6 overflow-x-auto styled-scrollbar scroll-smooth">
              <div className="flex gap-6 w-max">
                {firstRow.map((gig) => {
                  const imageUrl = gig.images?.[0]?.startsWith("/uploads/")
                    ? `${BASE_FILE_URL}${gig.images[0]}`
                    : `${BASE_FILE_URL}/uploads/${gig.images[0]}`;

                  return (
                    <Link
                      to={`/gigs/${gig._id}`}
                      key={gig._id}
                      className="w-[300px] bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-4 shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-1 hover:scale-105 transition-all"
                    >
                      <img
                        src={imageUrl}
                        onError={(e) => (e.target.src = "/default.png")}
                        alt={gig.title}
                        className="object-cover w-full h-48 mb-3 rounded-xl"
                      />
                      <h3 className="mb-1 text-lg font-semibold truncate">
                        {gig.title}
                      </h3>
                      <p className="text-sm text-gray-400 line-clamp-2">
                        {gig.description}
                      </p>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-base font-bold text-blue-400">
                          ₹{gig.price}
                        </span>
                        <span className="bg-blue-700 text-xs px-2 py-0.5 rounded-full text-white">
                          {gig.category}
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Second Row */}
            <div className="overflow-x-auto styled-scrollbar scroll-smooth">
              <div className="flex gap-6 w-max">
                {secondRow.map((gig) => {
                  const imageUrl = gig.images?.[0]?.startsWith("/uploads/")
                    ? `${BASE_FILE_URL}${gig.images[0]}`
                    : `${BASE_FILE_URL}/uploads/${gig.images[0]}`;

                  return (
                    <Link
                      to={`/gigs/${gig._id}`}
                      key={gig._id}
                      className="w-[300px] bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-4 shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-1 hover:scale-105 transition-all"
                    >
                      <img
                        src={imageUrl}
                        onError={(e) => (e.target.src = "/default.png")}
                        alt={gig.title}
                        className="object-cover w-full h-48 mb-3 rounded-xl"
                      />
                      <h3 className="mb-1 text-lg font-semibold truncate">
                        {gig.title}
                      </h3>
                      <p className="text-sm text-gray-400 line-clamp-2">
                        {gig.description}
                      </p>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-base font-bold text-blue-400">
                          ₹{gig.price}
                        </span>
                        <span className="bg-blue-700 text-xs px-2 py-0.5 rounded-full text-white">
                          {gig.category}
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </section>

      {/* FOOTER */}
      <footer className="py-6 mt-12 text-sm text-center text-gray-500 border-t border-gray-800 bg-gray-950">
        © 2025 FreelanceHub. All rights reserved.
      </footer>
    </div>
  );
};

export default Landing;
