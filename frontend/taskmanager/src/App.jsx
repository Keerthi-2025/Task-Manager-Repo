import React from 'react'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";


import Dashboard from './pages/Admin/Dashboard';
import ManageTasks from './pages/Admin/ManageTasks';
import ManageUsers from './pages/Admin/ManageUsers';

function App() {
  return (
    <div>
      <Router>

        <Routes>

        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Signup/>} />

        <Route element={<PrivateRoute allowedRoles={["admin"]}/>}/>
          <Route path='/admin/dashboard' element={<Dashboard/>}/>
          <Route path='/admin/tasks' element={<ManageTasks/>}/>
          <Route path='/admin/create-tasks' element={<ManageUsers/>}/>
         
        </Routes>
      </Router>
    </div>
  )
}

export default App
