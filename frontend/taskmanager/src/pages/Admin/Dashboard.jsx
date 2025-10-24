// import React, { useContext, useEffect, useState } from 'react'
// import useUserAuth from '../../hooks/useUserAuth'
// import DashBoardLayout from '../../components/layouts/DashBoardLayout';
// import { UserContext } from '../../components/context/useContext';
// import { useNavigate } from 'react-router-dom';
// import axiosInstance from '../../utils/axiosInstance';
// import { API_PATHS } from '../../utils/apiPath';
// import moment from 'moment';
// import InfoCard from '../../components/context/Cards/InfoCard';
// import { addThousandsSeparator } from '../../utils/helper';
// import { LuArrowRight } from 'react-icons/lu';
// import TaskListTable from '../../components/layouts/TaskListTable';
// import CustomPieChart from '../../components/Charts/CustomPieChart';

// const COLORS = ["#8D51FF", "#00BB8D", "#7BCE00"];

// function Dashboard() {
//   useUserAuth();

//   const {user} = useContext(UserContext);

//   const navigate = useNavigate();

//   const[dashboardData, setDashboardData] = useState(null);
//   const[pieChartData, setPieChartData] = useState([]);
//   const[barChartData, setBarChartData] = useState([]);


//   //preapre chart data
//   const prepareChartData = (data) =>{
//     const taskDistribution = data?.taskDistribution || null;
//     const taskPriorityLevels = data?.taskPriorityLevels || null;
  
  
//   const taskDistributionData = [
//     {status: "Pending", count: taskDistribution?.Pending || 0},
//     {status: "In Progress", count: taskDistribution?.InProgress || 0},
//     {status: "Completed", count: taskDistribution?.Completed || 0}
//   ];


//   const PriorityLevelData = [
//     {status: "Low", count: taskDistribution?.Low || 0},
//     {status: "Medium", count: taskDistribution?.Medium || 0},
//     {status: "High", count: taskDistribution?.High || 0}
//   ];

//     setPieChartData(taskDistributionData);
//     setBarChartData(PriorityLevelData);
// }




//   const getDashboardData = async () =>{
//     try {

//       const response = await axiosInstance.get(
//         API_PATHS.TASKS.GET_DASHBOARD_DATA
//       );
//       if(response.data)
//       {
//         setDashboardData(response.data);
//         prepareChartData(response.data?.charts || null);
//       }
      
//     } catch (error) {
//       console.log("Error fetching users", error);
      
//     }
//   };


//   const onSeeMore = () =>{
//     navigate("/admin/tasks")
//   }


//   useEffect(() => {
//     getDashboardData();
  
//     return () => {}
//   }, []);
  


//   return (
//     <DashBoardLayout activeMenu={"Dashboard"}>
//       {/* {JSON.stringify(dashboardData)}   //to view the data */}

//       <div className='card my-5'>
//         <div>
//           <div className='col-span-3'>
//             <h2 className=' text-xl md:text-2xl font-semibold'>Good morning ! {user?.name}</h2>
//             <p className='text-xs md:text-2xl mt-1.5 text-gray-600'>{moment().format("dddd Do MMM YYYY")}</p>
//           </div>
//         </div>

//         <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mt-4'>
//           <InfoCard  
//           // icon = {<IoMdCard/>}
//           label= "Total Tasks"
//           value = {addThousandsSeparator(
//             dashboardData?.charts?.taskDistribution?.All || 0
//           )}
//           color = "bg-blue-600"
//           />


//           <InfoCard  
//           label= "Pending Tasks"
//           value = {addThousandsSeparator(
//             dashboardData?.charts?.taskDistribution?.Pending || 0
//           )}
//           color = "bg-red-800"
//           />

          
//           <InfoCard  
//           label= "InProgress Tasks"
//           value = {addThousandsSeparator(
//             dashboardData?.charts?.taskDistribution?.InProgress || 0
//           )}
//           color = "bg-yellow-400"
//           />

          
//           <InfoCard  
//           label= "Completed Tasks"
//           value = {addThousandsSeparator(
//             dashboardData?.charts?.taskDistribution?.Completed || 0
//           )}
//           color = "bg-green-500"
//           />
//         </div>
//       </div>

//       <div className='grid grid-cols-1 md:grid-cols-2  gap-6 md:my-6'>

//         <div>
//           <div className='card'>
//             <div className='flex items-center justify-between'>
//               <h5 className='font-medium'>Task Distribution</h5>

//             </div>

//             <CustomPieChart
//             data={pieChartData}
//             label="Total Balance"
//             colors={COLORS}
//             />

//           </div>
//         </div>

//         <div className='md:col-span-2'>
//           <div className='card'>
//             <div className='flex items-center justify-between'>
//               <h5 className='text-lg'>Recent Tasks</h5>

//               <button className='card-btn' onClick={onSeeMore}>See All <LuArrowRight className='text-base'/></button>
//             </div>

//             <TaskListTable   tableData={dashboardData?.recentTasks || [] }/>
//           </div>
//         </div>
//       </div>
//     </DashBoardLayout>
//   )
// }

// export default Dashboard


import React, { useContext, useEffect, useState } from 'react';
import useUserAuth from '../../hooks/useUserAuth';
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
import CustomPieChart from '../../components/Charts/CustomPieChart';

const COLORS = ["#8D51FF", "#00BB8D", "#7BCE00"];

function Dashboard() {
  useUserAuth();

  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [pieChartData, setPieChartData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);

  // Prepare chart data
  const prepareChartData = (data) => {
    const taskDistribution = data?.taskDistribution || {};
    const taskPriorityLevels = data?.taskPriorityLevels || {};

    const taskDistributionData = [
      { status: "Pending", count: taskDistribution?.Pending || 0 },
      { status: "In Progress", count: taskDistribution?.InProgress || 0 },
      { status: "Completed", count: taskDistribution?.Completed || 0 },
    ];

    const priorityLevelData = [
      { status: "Low", count: taskPriorityLevels?.Low || 0 },
      { status: "Medium", count: taskPriorityLevels?.Medium || 0 },
      { status: "High", count: taskPriorityLevels?.High || 0 },
    ];

    setPieChartData(taskDistributionData);
    setBarChartData(priorityLevelData);
  };

  const getDashboardData = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.TASKS.GET_DASHBOARD_DATA);
      if (response.data) {
        setDashboardData(response.data);
        prepareChartData(response.data?.charts || null);
      }
    } catch (error) {
      console.log("Error fetching dashboard data", error);
    }
  };

  const onSeeMore = () => {
    navigate("/admin/tasks");
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  if (!dashboardData) return <p className="p-4">Loading dashboard...</p>;

  return (
    <DashBoardLayout activeMenu={"Dashboard"}>
      {/* Dashboard Header */}
      <div className="card my-5">
        <div>
          <div className="col-span-3">
            <h2 className="text-xl md:text-2xl font-semibold">
              Good morning! {user?.name}
            </h2>
            <p className="text-xs md:text-2xl mt-1.5 text-gray-600">
              {moment().format("dddd Do MMM YYYY")}
            </p>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mt-4">
          <InfoCard
            label="Total Tasks"
            value={addThousandsSeparator(dashboardData?.charts?.taskDistribution?.All || 0)}
            color="bg-blue-600"
          />
          <InfoCard
            label="Pending Tasks"
            value={addThousandsSeparator(dashboardData?.charts?.taskDistribution?.Pending || 0)}
            color="bg-red-800"
          />
          <InfoCard
            label="InProgress Tasks"
            value={addThousandsSeparator(dashboardData?.charts?.taskDistribution?.InProgress || 0)}
            color="bg-yellow-400"
          />
          <InfoCard
            label="Completed Tasks"
            value={addThousandsSeparator(dashboardData?.charts?.taskDistribution?.Completed || 0)}
            color="bg-green-500"
          />
        </div>
      </div>

      {/* Charts & Recent Tasks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:my-6">
        {/* Task Distribution Pie Chart */}
        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <h5 className="font-medium">Task Distribution</h5>
          </div>

          <CustomPieChart
            data={pieChartData}
            colors={COLORS}
          />

          {/* ✅ Show statuses below the chart */}
          <div className="flex justify-around mt-4">
            {pieChartData.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <span
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                ></span>
                <span className="text-sm">{item.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Tasks */}
        <div className="card md:col-span-2">
          <div className="flex items-center justify-between">
            <h5 className="text-lg">Recent Tasks</h5>
            <button className="card-btn" onClick={onSeeMore}>
              See All <LuArrowRight className="text-base" />
            </button>
          </div>
          <TaskListTable tableData={dashboardData?.recentTasks || []} />
        </div>
      </div>
    </DashBoardLayout>
  );
}

export default Dashboard;
