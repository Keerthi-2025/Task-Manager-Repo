import React, { useContext, useEffect, useState } from 'react'
import useUserAuth from '../../hooks/useUserAuth'
import DashBoardLayout from '../../components/layouts/DashBoardLayout';
import { UserContext } from '../../components/context/useContext';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPath';
import moment from 'moment';
import InfoCard from '../../components/context/Cards/InfoCard';
import { addThousandsSeparator } from '../../utils/helper';
import { LuArrowRight } from 'react-icons/lu';
import TaskListTable from '../../components/layouts/TaskListTable';

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
  };


  const onSeeMore = () =>{
    navigate("/admin/tasks")
  }


  useEffect(() => {
    getDashboardData();
  
    return () => {}
  }, []);
  


  return (
    <DashBoardLayout activeMenu={"Dashboard"}>
      {/* {JSON.stringify(dashboardData)}   //to view the data */}

      <div className='card my-5'>
        <div>
          <div className='col-span-3'>
            <h2 className=' text-xl md:text-2xl font-semibold'>Good morning ! {user?.name}</h2>
            <p className='text-xs md:text-2xl mt-1.5 text-gray-600'>{moment().format("dddd Do MMM YYYY")}</p>
          </div>
        </div>

        <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mt-4'>
          <InfoCard  
          // icon = {<IoMdCard/>}
          label= "Total Tasks"
          value = {addThousandsSeparator(
            dashboardData?.charts?.taskDistribution?.All || 0
          )}
          color = "bg-blue-600"
          />


          <InfoCard  
          label= "Pending Tasks"
          value = {addThousandsSeparator(
            dashboardData?.charts?.taskDistribution?.Pending || 0
          )}
          color = "bg-red-800"
          />

          
          <InfoCard  
          label= "InProgress Tasks"
          value = {addThousandsSeparator(
            dashboardData?.charts?.taskDistribution?.InProgress || 0
          )}
          color = "bg-yellow-400"
          />

          
          <InfoCard  
          label= "Completed Tasks"
          value = {addThousandsSeparator(
            dashboardData?.charts?.taskDistribution?.Completed || 0
          )}
          color = "bg-green-500"
          />
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2  gap-6 md:my-6'>
        <div className='md:col-span-2'>
          <div className='card'>
            <div className='flex items-center justify-between'>
              <h5 className='text-lg'>Recent Tasks</h5>

              <button className='card-btn' onClick={onSeeMore}>See All <LuArrowRight className='text-base'/></button>
            </div>

            <TaskListTable   tableData={dashboardData?.recentTasks || [] }/>
          </div>
        </div>
      </div>
    </DashBoardLayout>
  )
}

export default Dashboard