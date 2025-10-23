import React, { useContext, useState } from 'react'
import useUserAuth from '../../hooks/useUserAuth'
import DashBoardLayout from '../../components/layouts/DashBoardLayout';
import { UserContext } from '../../components/context/useContext';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPath';

function Dashboard() {
  useUserAuth();

  const {user} = useContext(UserContext);

  const navigate = useNavigate();

  const[dashboardData, setDashboardData] = useState(null);
  const[pieChartData, setPieChartData] = useState([]);
  const[barChartData, setBarChartData] = useState([]);


  const getDashboardData = async () =>{
    try {

      const response = await axiosInstance.get(
        API_PATHS.TASKS.GET_DASHBOARD_DATA
      );
      if(response.data)
      {
        setDashboardData(response.data);
      }
      
    } catch (error) {
      console.log("Error fetching users", error);
      
    }
  }


  return (
    <DashBoardLayout activeMenu={"Dashboard"}>Dashboard</DashBoardLayout>
  )
}

export default Dashboard