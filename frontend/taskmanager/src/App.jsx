import React, { useContext } from 'react'
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";


import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';

import Dashboard from './pages/Admin/Dashboard';
import ManageTasks from './pages/Admin/ManageTasks';
import ManageUsers from './pages/Admin/ManageUsers';
import CreateTask from './pages/Admin/CreateTask';

import UserDashboard from './pages/User/UserDashboard';
import MyTasks from './pages/User/MyTasks';
import ViewTaskDetails from './pages/User/ViewTaskDetails';

import PrivateRoute from './routes/PrivateRoute';
import UserProvider, { UserContext } from './components/context/useContext';

function App() {
  return (
    <UserProvider>

   
    <div>
      <Router>
        <Routes>

        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Signup/>} />

        <Route element={<PrivateRoute allowedRoles={["admin"]}/>}>
          <Route path='/admin/dashboard' element={<Dashboard/>}/>
          <Route path='/admin/tasks' element={<ManageTasks/>}/>
          <Route path='/admin/create-tasks' element={<CreateTask/>}/>
          <Route path='/admin/users' element={<ManageUsers/>}/>
        </Route>

        <Route element={<PrivateRoute allowedRoles={["user"]}/>}>
           <Route path='/user/userdashboard' element={<UserDashboard/>}/>
           <Route path='/user/tasks' element={<MyTasks/>}/>
           <Route path='/user/task-details/:id' element={<ViewTaskDetails/>}/>
        </Route>  

      {/* default router */}
      <Route path='/'element={<Root/>} />

        </Routes>
      </Router>
    </div>
     </UserProvider>
  )
}

export default App


const Root = () => {

  const {user, loading} = useContext(UserContext);
  if(loading) return <Outlet/>

  if (!user){
    return <Navigate to ="/login" />
  }

  return user.role === "admin" ? <Navigate to="/admin/dashboard" /> : <Navigate to ="/user/dashboard" />;

};
