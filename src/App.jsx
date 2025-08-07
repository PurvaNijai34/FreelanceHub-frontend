// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";
// import Dashboard_freelancer from "./pages/freelancer/Dashboard_freelancer";
// import Dashboard_client from "./pages/Client_user/Dashboard_client";
// import Freelancer_profile from "./pages/freelancer/freelancer_profile";
// import GigDetail from "./pages/gigs/GigDetail";
// import OrderSuccess from "./pages/gigs/order-success";
// import FreelancerOrders from "./pages/freelancer/FreelancerOrders";
// import ClientOrders from "./pages/client_user/ClientOrders";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/dashboard/freelancer" element={<Dashboard_freelancer />} />
//         <Route path="/dashboard/client" element={<Dashboard_client />} />
//         <Route path="/dashboard/freelancer/freelancer_profile" element={<Freelancer_profile/>} />
//         <Route path="/gigs/:id" element={<GigDetail />} />
//         <Route path="/order-success" element={<OrderSuccess />} />
//         <Route path="/freelancers/orders" element={<FreelancerOrders/>}/>
//         <Route path="/client/orders" element={<ClientOrders/>}/>
//       </Routes>
//     </Router>
//   );
// }

// export default App;
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import socket from "./utils/socket";

import Home from "./pages/Home";
import Dashboard_freelancer from "./pages/freelancer/Dashboard_freelancer";
// import Dashboard_client from "./pages/Client_user/Dashboard_client";

import Freelancer_profile from "./pages/freelancer/Freelancer_profile";
import GigDetail from "./pages/gigs/GigDetail";
import OrderSuccess from "./pages/gigs/Order-success";
import FreelancerOrders from "./pages/freelancer/FreelancerOrders";
import ClientOrders from "./pages/client_user/ClientOrders";
import Chat from "./pages/chat/Chat";
import ChatWrapper from "./pages/chat/ChatWrapper";

function App() {
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log("👤 user in App.jsx:", user);
    if (user?._id) {
      socket.emit("join", user._id);
      console.log("🛰 Joined socket room:", user._id);
    }
  }, []);

  return (
    <Router>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard/freelancer" element={<Dashboard_freelancer />} />
        <Route path="/dashboard/client" element={<Dashboard_client />} />
        <Route path="/dashboard/freelancer/freelancer_profile" element={<Freelancer_profile />} />
        <Route path="/gigs/:id" element={<GigDetail />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/freelancers/orders" element={<FreelancerOrders />} />
        <Route path="/client/orders" element={<ClientOrders />} />
        <Route path="/chat/:userId" element={<ChatWrapper />} />
      </Routes>
    </Router>
  );
}

export default App;
