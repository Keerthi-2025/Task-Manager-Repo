import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/useContext'
import { useNavigate } from 'react-router-dom';
import { SIDE_MENU_DATA, SIDE_MENU_USER_DATA } from '../../utils/data';

function SideMenu({activeMenu}) {
  const {user, clearUser} = useContext(UserContext);
  const [sideMenuData, setSideMenuData] = useState([]);

  const navigate = useNavigate();

  const handleClick = (route) =>{
    if(route === "logout"){
      handleLogout();
      return;
    }

    navigate(route);
  };

  const handleLogout = () =>{
    localStorage.clear();
    clearUser();
    navigate("/login");
  };

  useEffect(()=>{
    if(user){
      setSideMenuData(user ?.role === 'admin' ? SIDE_MENU_DATA : SIDE_MENU_USER_DATA)
    }
    return () => {};
  }, [user]);
  return (
    <div>SideMenu</div>
  )
}

export default SideMenu