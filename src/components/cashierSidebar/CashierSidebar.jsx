import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaHamburger } from "react-icons/fa";
import { IoCafeOutline } from "react-icons/io5";
import { LuChefHat, LuDessert } from "react-icons/lu";
import { GiFrenchFries } from "react-icons/gi";
import { FiLogOut } from "react-icons/fi";
import { useEffect } from "react";
import axios from "axios";
import { domain } from "../../store";
import { useLocation, useNavigate } from "react-router-dom";

export default function CashierSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [categories, setCategories] = useState([]);
  const linkStyle = ({ isActive }) =>
    ` px-1 py-2 rounded-xl flex flex-col gap-2 items-center justify-center text-2xl hover:text-emerald-500 hover:-translate-y-px transition-all duration-400
       hover:bg-emerald-100 

     ${
       isActive
         ? "bg-emerald-100 text-emerald-500 shadow-md shadow-emerald-100"
         : "text-slate-400"
     }`;

  useEffect(() => {
    let endPoint = "/api/categories?populate=*";
    let url = domain + endPoint;
    axios
      .get(url)
      .then((res) => {
        console.log(res.data);
        setCategories(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (categories.length > 0 && location.pathname === "/cashier") {
      navigate(`/cashier/${categories[0].documentId}`);
    }
  }, [categories, location.pathname, navigate]);

  return (
    <div
      className=" w-20
    md:w-24
    px-2
    bg-white
    border-r
    border-gray-200
    flex
    flex-col
    items-center
    py-3"
    >
      <div className="flex flex-col items-center gap-6 grow h-10">
        <div className=" flex justify-center ">
          <div className="w-13 h-13 bg-emerald-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-md ">
            <LuChefHat />
          </div>
        </div>

        {/* TOP ICONS */}
        <div className="flex flex-col gap-4 overflow-auto grow h-10">
          {categories.map((el) => {
            return (
              <NavLink to={el.documentId} className={linkStyle} key={el.id}>
                <img
                  src={el.icon ? domain + el.icon?.url : ""}
                  className="w-6 h-6 object-contain"
                />
                <span className="text-[9px] md:text-[11px] font-bold text-center">
                  {el.name}
                </span>
              </NavLink>
            );
          })}
        </div>
      </div>

      {/* 👇 LOGOUT SECTION */}
      <div className="mt-auto mb-4">
        <button
          onClick={() => console.log("logout")}
          className="
            w-14 h-14
            rounded-2xl
            flex items-center justify-center
            text-2xl text-gray-400
            hover:bg-red-100 hover:text-red-500
            transition-all duration-300
          "
        >
          <FiLogOut />
        </button>
      </div>
    </div>
  );
}
