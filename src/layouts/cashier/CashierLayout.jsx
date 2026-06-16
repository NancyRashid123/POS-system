import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import CashierSidebar from "../../components/cashierSidebar/CashierSidebar";
import CashierNavbar from "../../components/cashierNavbar/CashierNavbar";
import OrderSidebar from "../../components/orderSidebar/OrderSidebar";
import axios from "axios";
import toast from "react-hot-toast";
import { domain, useCart, useModal } from "../../store";
import Modal from "../../components/modal/Modal";
import { FaShoppingCart } from "react-icons/fa";

export default function CashierLayout() {
  const [showOrder, setShowOrder] = useState(false);
  const{cart , setCart} = useCart();
  const{modalIndex} = useModal();
  const navigate = useNavigate();
   useEffect(() => {
      let token = localStorage.getItem("token");
      if(token){
        let endPoint = "/api/users/me";
        let url = domain + endPoint;
        axios.get(url, {headers: {Authorization: `Bearer ${token}`}}).then((res) => {
          if(res.data.system_role == "Rastaurant"){
            toast.error("You are not admin or cashier");
            navigate("/");
          }else{
            sessionStorage.setItem('user' , JSON.stringify(res.data))
          }
        }).catch((err) => {
          toast.error("Session Expired, Please login again");
          localStorage.clear();
          navigate("/");
        })
      } 
     }, []);
 return (
    <div className="h-dvh flex overflow-hidden bg-[#f5f5f5]">

      {/* LEFT SIDEBAR */}
      <CashierSidebar />

      {/* MIDDLE SECTION */}
      <div className="flex-1 flex flex-col min-w-0">

        <CashierNavbar />

        <div className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </div>

      </div>


     

     {/* Desktop Order Sidebar */}
<div className="hidden lg:block">
  <OrderSidebar orderItems={cart} />
</div>

{/* Mobile Floating Button */}
<button
  onClick={() => setShowOrder(true)}
  className="
    lg:hidden
    fixed
    bottom-5
    right-5
    w-14 h-14
    rounded-full
    bg-emerald-500
    text-white
    shadow-xl
    flex items-center justify-center
    text-xl
    z-40
    
  "
>
  <FaShoppingCart />
  {cart.length > 0 && (
    <span
      className="
        absolute
        -top-1
        -right-1
        bg-red-500
        text-white
        text-xs
        w-5 h-5
        flex items-center justify-center
        rounded-full
        font-bold
      "
    >
      {cart.length}
    </span>
  )}
</button>
{/* Mobile Drawer */}
{showOrder && (
  <div
    className="lg:hidden fixed inset-0 bg-black/40 z-50"
    onClick={() => setShowOrder(false)}
  >
    <div
      onClick={(e) => e.stopPropagation()}
      className="
        absolute
        right-0 top-0
        h-full
        w-[80%]
        bg-white
      "
    >
      <OrderSidebar orderItems={cart} />
    </div>
  </div>
)}

{modalIndex && <Modal />}

    </div>
  );
}



