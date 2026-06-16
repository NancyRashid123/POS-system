import { NavLink } from "react-router-dom";
import { useState } from "react";
import {
  FaHome,
  FaUsers,
  FaUtensils,
  FaDollarSign,
  FaBars,
} from "react-icons/fa";

export default function SideMenu() {
  const [collapsed, setCollapsed] = useState(false);

  const linkStyle = ({ isActive }) =>
    `
      flex items-center
      gap-3
      px-4
      py-3
      rounded-xl
      transition-all
      duration-300

      ${
        isActive
          ? "bg-emerald-500 text-white"
          : "text-slate-500 hover:bg-slate-100 hover:text-emerald-500"
      }
    `;

  return (
    <div
      className={`
      bg-white
      border-r
      border-slate-200
      h-dvh
      p-3
      flex
      flex-col
      transition-all
      duration-300
      ${collapsed ? "w-20" : "w-64"}
    `}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        {!collapsed && (
          <h1 className="text-xl font-bold text-emerald-500">Admin Panel</h1>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="btn btn-sm  rounded-xl
      transition-all
      duration-300 text-slate-500 hover:bg-slate-100 hover:text-emerald-500 
      "
        >
          <FaBars />
        </button>
      </div>

      {/* Links */}
      <div className="flex flex-col gap-2">
        <NavLink to="/admin" end className={linkStyle}>
          <FaHome />
          {!collapsed && <span>Dashboard</span>}
        </NavLink>

        
        <NavLink to="/admin/menu" className={linkStyle}>
          <FaUtensils />
          {!collapsed && <span>Menu</span>}
        </NavLink>

        <NavLink to="/admin/staff" className={linkStyle}>
          <FaUsers />
          {!collapsed && <span>Staff</span>}
        </NavLink>

        <NavLink to="/admin/sales" className={linkStyle}>
          <FaDollarSign />
          {!collapsed && <span>Sales</span>}
        </NavLink>
      </div>
    </div>
  );
}
