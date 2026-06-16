import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './pages/login/Login'
import ForgetPage from './pages/forget/ForgetPage'
import AdminLayout from './layouts/admin/AdminLayout'
import DashboardPage from './pages/dashboard/DashboardPage'
import StaffPage from './pages/staff/StaffPage'
import MenuPage from './pages/menuPage/MenuPage'
import SalesPage from './pages/salesPage/SalesPage'
import { Toaster } from 'react-hot-toast'
import CashierLayout from './layouts/cashier/CashierLayout'
import CategoryItems from './pages/categoryItems/CategoryItems'
import InsidePage from './pages/insidePage/InsidePage'
import OutSidePage from './pages/outSidePage/OutSidePage'
import NotFound from './pages/notFoundPage/NotFound'

export default function App() {
  const routes = createBrowserRouter([
        {path: '/',children: [
            {index: true, element: <Login />},
            {path: 'forget' , element: <ForgetPage />},
        ]},
        {path: '/admin',element: <AdminLayout />, children: [
            {index : true, element: <DashboardPage />},
            {path: 'staff' , element: <StaffPage />},
            {path: 'menu' , element : <MenuPage />},
            {path: 'sales' , element: <SalesPage />},
        ]},
        {path: '/cashier',element: <CashierLayout />, children: [
            {path: ':categoryId', element:<CategoryItems />},
        ]},
        {path: '/resturant', children: [
            {path: 'inside', element: <InsidePage/>},
            {path: 'outside', element: <OutSidePage/>},
        ]},
        {path: '*', element: <NotFound />},
      ])
  return (
    <div className="w-full h-dvh overflow-auto" data-theme="light">
      <Toaster />
      <RouterProvider router={routes} />
    </div>
  )
}

