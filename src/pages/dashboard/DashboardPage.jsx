import axios from "axios";
import { useEffect, useState } from "react";
import { domain } from "../../store";

export default function DashboardPage() {
  const [productCount, setProductCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);
  const [categoriesCount, setCartegoriesCount] = useState(0);
  const [deliveryCount, setDeliveryCount] = useState(0);
  const [orderHistory, setOrderHistory] = useState([]);
  const cartsCount = [
    { title: "products", count: productCount },
    { title: "orders", count: ordersCount },
    { title: "categories", count: categoriesCount },
    { title: "deliveries", count: deliveryCount },
  ];
  
  useEffect(() => {
   axios.get(domain + "/api/items", {
  params: {
    pagination: {
      page: 1,
      pageSize: 100,
    },
  },
}).then((res) => {
      console.log(res.data.data);
      setProductCount(res.data.data.length);
    });
    axios.get(domain + "/api/orders").then((res) => {
      setOrdersCount(res.data.data.length);
    });

       axios.get(domain + "/api/categories").then((res) => {
      setCartegoriesCount(res.data.data.length);
    });


    axios.get(domain + "/api/orders", {
        params: {
          filters: {
            order_status: {
              $eq: "Delivered",
            },
          },
          sort: ["createdAt:desc"],
        },
      })
      .then((res) => { 
        setOrderHistory(res.data.data);
        setDeliveryCount(res.data.data.length);
      });
  }, []);

  return (
  <div className="w-full min-h-dvh bg-slate-100 p-3 sm:p-6 flex flex-col gap-6">

    {/* HEADER */}
   <div className="flex justify-between items-center mb-6">
  <div>
    <h1 className="text-3xl font-bold text-slate-700">
      Dashboard
    </h1>
    <p className="text-slate-400">
      Welcome Back Admin
    </p>
  </div>
</div>

    {/* CARDS */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cartsCount.map((item) => (
        <div
          key={item.title}
          className="
            bg-white
            p-4 sm:p-6
            rounded-2xl
            shadow-sm
            border border-slate-200
            hover:shadow-xl
            transition-all
          "
        >
          <p className="text-xs sm:text-sm text-slate-400 uppercase">
            {item.title}
          </p>

          <h2 className="text-2xl sm:text-3xl font-bold text-emerald-500 mt-2">
            {item.count}
          </h2>
        </div>
      ))}
    </div>

    {/* TABLE */}
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-3 sm:p-4">

      <h2 className="text-lg sm:text-xl font-semibold text-slate-700 mb-4">
        Recent Orders
      </h2>

      <div className="overflow-x-auto">
        <table className="table w-full text-slate-600 text-sm sm:text-base">
          <thead>
            <tr className="text-slate-500">
              <th>#</th>
              <th>Order ID</th>
              <th>Total</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {orderHistory.map((order, index) => (
              <tr key={order.documentId} className="hover:bg-slate-50">
                <td>{index + 1}</td>

                <td className="font-medium">#{order.id}</td>

                <td className="text-emerald-600 font-bold">
                  ${order.total}
                </td>

                <td className="text-xs sm:text-sm">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>

                <td>
                  <span className="px-2 sm:px-3 py-1 rounded-full text-xs bg-green-100 text-green-600">
                    {order.order_status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  </div>
);
}
