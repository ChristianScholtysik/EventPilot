// import { useState } from "react";
// import { FaSearch, FaUser, FaCalendarAlt, FaPlus } from "react-icons/fa";
// import { MdExplore } from "react-icons/md";
// import { NavLink } from "react-router-dom";

// const Navbar = () => {
//   const [activeTab, setActiveTab] = useState("");

//   return (
//     <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-gray-200 z-50 w-full w-max-sm">
//       <div className="relative">
//         {/* Floating Button */}
//         <button className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-primary text-white rounded-full p-2 shadow-lg z-50 mr-4 ">
//           <FaPlus className="h-8 w-8 bg-white rounded bg-opacity-30 p-2 m-1 text-primary" />
//         </button>

//         <div className="flex items-center h-24 w-full w-max-sm">
//           <NavLink to="/">
//             {/* Explore Icon */}
//             <div
//               className="flex flex-col items-center cursor-pointer ml-2 mr-6"
//               onClick={() => setActiveTab("explore")}
//             >
//               <MdExplore
//                 className={`h-6 w-6 ${
//                   activeTab === "explore" ? "text-primary" : "text-gray-400"
//                 }`}
//               />
//               <span
//                 className={`text-normal font-InterThin ${
//                   activeTab === "explore" ? "text-primary" : "text-gray-400"
//                 }`}
//               >
//                 Explore
//               </span>
//             </div>
//           </NavLink>

//           {/* Events Icon */}
//           <NavLink to="/favorites">
//             <div
//               className="flex flex-col items-center cursor-pointer mr-24"
//               onClick={() => setActiveTab("events")}
//             >
//               <FaCalendarAlt
//                 className={`h-6 w-6 ${
//                   activeTab === "events" ? "text-primary" : "text-gray-400"
//                 }`}
//               />
//               <span
//                 className={`text-normal font-InterThin ${
//                   activeTab === "events" ? "text-primary" : "text-gray-400"
//                 }`}
//               >
//                 Events
//               </span>
//             </div>
//           </NavLink>

//           {/* Search Icon */}
//           <NavLink to="/search">
//             <div
//               className="flex flex-col items-center cursor-pointer"
//               onClick={() => setActiveTab("search")}
//             >
//               <FaSearch
//                 className={`h-6 w-6 ${
//                   activeTab === "search" ? "text-primary" : "text-gray-400"
//                 }`}
//               />
//               <span
//                 className={`text-normal font-InterThin ${
//                   activeTab === "search" ? "text-primary" : "text-gray-400"
//                 }`}
//               >
//                 Search
//               </span>
//             </div>
//           </NavLink>

//           {/* Profile Icon */}
//           <NavLink to="/profile">
//             <div
//               className="flex flex-col items-center cursor-pointer mr-2 ml-6"
//               onClick={() => setActiveTab("profile")}
//             >
//               <FaUser
//                 className={`h-6 w-6 ${
//                   activeTab === "profile" ? "text-primary" : "text-gray-400"
//                 }`}
//               />
//               <span
//                 className={`text-normal font-InterThin ${
//                   activeTab === "profile" ? "text-primary" : "text-gray-400"
//                 }`}
//               >
//                 Profile
//               </span>
//             </div>
//           </NavLink>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import { FaSearch, FaUser, FaCalendarAlt, FaPlus } from "react-icons/fa";
import { MdExplore } from "react-icons/md";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-gray-200 z-50 w-full w-max-sm">
      <div className="relative">
        {/* Floating Button */}
        <button className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-primary text-white rounded-full p-2 shadow-lg z-50 mr-4">
          <FaPlus className="h-8 w-8 bg-white rounded bg-opacity-30 p-2 m-1 text-primary" />
        </button>

        <div className="flex items-center h-24 w-full w-max-sm">
          {/* Explore Icon */}
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex flex-col items-center cursor-pointer ml-2 mr-6 ${
                isActive ? "text-primary" : "text-gray-400"
              }`
            }
          >
            <MdExplore className="h-6 w-6" />
            <span className="text-normal font-InterThin">Explore</span>
          </NavLink>

          {/* Events Icon */}
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              `flex flex-col items-center cursor-pointer mr-24 ${
                isActive ? "text-primary" : "text-gray-400"
              }`
            }
          >
            <FaCalendarAlt className="h-6 w-6" />
            <span className="text-normal font-InterThin">Events</span>
          </NavLink>

          {/* Search Icon */}
          <NavLink
            to="/search"
            className={({ isActive }) =>
              `flex flex-col items-center cursor-pointer ${
                isActive ? "text-primary" : "text-gray-400"
              }`
            }
          >
            <FaSearch className="h-6 w-6" />
            <span className="text-normal font-InterThin">Search</span>
          </NavLink>

          {/* Profile Icon */}
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `flex flex-col items-center cursor-pointer mr-2 ml-6 ${
                isActive ? "text-primary" : "text-gray-400"
              }`
            }
          >
            <FaUser className="h-6 w-6" />
            <span className="text-normal font-InterThin">Profile</span>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
