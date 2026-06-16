import { Outlet, useNavigate } from "react-router-dom";
import SideMenu from "../../components/sideMenu/SideMenu";
import { useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { domain } from "../../store";

export default function AdminLayout() {
  const navigate = useNavigate();
  useEffect(() => {
    let token = localStorage.getItem("token");
    if(token){
      let endPoint = "/api/users/me";
      let url = domain + endPoint;
      axios.get(url, {headers: {Authorization: `Bearer ${token}`}}).then((res) => {
        if(res.data.system_role !== "Admin"){
          toast.error("You are not admin");
          navigate("/");
        }
      }).catch((err) => {
        toast.error("Session Expired, Please login again");
        localStorage.clear();
        navigate("/");
      })
    } 
   }, []);
  return (
    <div className="w-full h-dvh flex overflow-hidden">
        <SideMenu /> 
        <div className="w-full grow bg-[#f5f5f5] p-6 overflow-y-auto">
            <Outlet />
        </div>
    </div>
  )
}
