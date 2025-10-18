import React from 'react'
import useUserAuth from '../../hooks/useUserAuth'
import DashBoardLayout from '../../components/layouts/DashBoardLayout';

function Dashboard() {
  useUserAuth();
  return (
    <DashBoardLayout>Dashboard</DashBoardLayout>
  )
}

export default Dashboard