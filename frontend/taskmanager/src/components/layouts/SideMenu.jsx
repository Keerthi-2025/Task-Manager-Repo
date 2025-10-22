// import React, { useContext, useEffect, useState } from 'react'
// import { UserContext } from '../context/useContext'
// import { useNavigate } from 'react-router-dom';
// import { SIDE_MENU_DATA, SIDE_MENU_USER_DATA } from '../../utils/data';

// function SideMenu({activeMenu}) {
//   const {user, clearUser} = useContext(UserContext);
//   const [sideMenuData, setSideMenuData] = useState([]);

//   const navigate = useNavigate();

//   const handleClick = (route) =>{
//     if(route === "logout"){
//       handleLogout();
//       return;
//     }

//     navigate(route);
//   };

//   const handleLogout = () =>{
//     localStorage.clear();
//     clearUser();
//     navigate("/login");
//   };

//   useEffect(()=>{
//     if(user){
//       setSideMenuData(user ?.role === 'admin' ? SIDE_MENU_DATA : SIDE_MENU_USER_DATA)
//     }
//     return () => {};
//   }, [user]);
//   return (
//     <div className=''>
//       <div className=''>
//         <div className=''>
//           <img 
//           src={user?.profileImageUrl || ""}
//           alt='profile Image'
//           className=''/>

//         </div>

//         {user?.role === "admin" && (
//           <div className=''>
//             Admin
//             </div>
//         )}

//         <h5 className=''> {user?.name || "} </h5>

//         <p className="">{user?.email || ""}</p>
//     </div>

//     {sideMenuData.map((item, index) =>(
//       <button
//       key={`menu_${index}`}
//       className='{`w-full flex items-center gap-4 text-[15px] ${
//       activeMenu == item.label
//       ? "text-primary bg-linear-to-r from-blue-50 to-blue-100 border-r-3"
//       : ""
//     }
//     py-3 px-6 mb-3 cursor-pointer'}
//     >
//     <item.icon className=""/>
//     {item.label}
//     </button>
//     ))}
//   )
// }

// export default SideMenu


import  { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/useContext";
import { useNavigate } from "react-router-dom";
import { SIDE_MENU_DATA, SIDE_MENU_USER_DATA } from "../../utils/data";

function SideMenu({ activeMenu }) {
  const { user, clearUser } = useContext(UserContext);
  const [sideMenuData, setSideMenuData] = useState([]);
  const navigate = useNavigate();

  const handleClick = (route) => {
    if (route === "logout") {
      handleLogout();
      return;
    }
    navigate(route);
  };

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/login");
  };

  useEffect(() => {
    if (user) {
      setSideMenuData(user?.role === "admin" ? SIDE_MENU_DATA : SIDE_MENU_USER_DATA);
    }
  }, [user]);

  return (
    <div className="p-4 w-full bg-amber-100 h-screen">
      <div className="flex flex-col items-center mb-6">
        <img
          src={ user?.profileImageUrl || null}
          alt="Profile"
          className="w-16 h-16 rounded-full object-cover mb-2"
        />

        {user?.role === "admin" && (
          <div className="text-sm text-white bg-blue-950 rounded-full p-1.5">Admin</div>
        )}

        <h5 className="font-semibold text-lg">{user?.name || ""}</h5>
        <p className="text-sm text-gray-600">{user?.email || ""}</p>
      </div>

      <div className="flex flex-col">
        {sideMenuData.map((item, index) => (
          <button
            key={`menu_${index}`}
            onClick={() => handleClick(item.path)}
            className={`w-full flex items-center gap-4 text-[15px] py-3 px-6 mb-3 rounded-lg transition-all duration-200
              ${
                activeMenu === item.label
                  ? "text-blue-600 bg-gradient-to-r from-blue-50 to-blue-100 border-r-4 border-blue-500"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
          >
            <item.icon className="text-lg" />
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SideMenu;
