
import axios from "axios";
import { useEffect, useState } from "react";
import { domain } from "../../store";
import toast from "react-hot-toast";

export default function InsidePage() {
  const [orders, setOrders] = useState([]);

  const getOrders = () => {
    let url = domain + "/api/orders";
    axios
      .get(url, {
        params: {
          populate: { order_items: { populate: "*" } },
          filters: {
            order_status: {
              $in: ["Under Process", "Ready"],
            },
          },
        },
      })
      .then((res) => {
        setOrders(res.data.data);
        console.log(res.data);
      });
  };

  const updateOrder = (id) => {
    let url = domain + `/api/orders/${id}`;
    let dataToPut = {
      data: {
        order_status: "Delivered",
      },
    };

    axios.put(url, dataToPut).then(() => {
      toast.success("Order Delivered Successfully");
      getOrders();
    });
  };
  useEffect(() => {
    getOrders();
  }, []);

  return (
     <div className="w-full h-dvh overflow-auto bg-slate-100 p-6 grid grid-cols-2 gap-6">
        
      <div className="flex flex-col gap-6" >
        <h1 className="text-4xl font-bold text-center text-emerald-400">Under Process Orders</h1>
        {orders.map((el) => (
            el.order_status === "Under Process" && (  <div
            key={el.documentId}
            className="
          p-6
          bg-white
          rounded-3xl
          shadow-lg
          border
          border-slate-200
          overflow-hidden
          hover:shadow-xl
          transition-all
          duration-300
          flex flex-col gap-6
        "
          >
            {/* Header */}
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-slate-500">Order</p>
                <h2 className="text-xl font-bold">{el.id}</h2>
              </div>

              <span className="badge badge-warning badge-lg">
                Under Process
              </span>
            </div>

            {/* Total */}
            <div className="bg-slate-50 rounded-2xl flex justify-between items-center">
              <p className="text-sm text-slate-500">Total Amount</p>
              <h3 className="text-3xl font-bold text-emerald-500">
                ${el.total}
              </h3>
            </div>

            {/* Items */}
            <div>
              <h4 className="font-semibold mb-3 text-slate-500">
                Order Items :
              </h4>

              <ul className="space-y-2">
                {el.order_items.map((item) => (
                  <li
                    key={item.documentId}
                    className="
                    flex
                    justify-between
                    items-center
                    bg-slate-50
                    rounded-xl
                    px-3
                    py-2
                  "
                  >
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="size-4 me-2 inline-block text-success"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="font-medium">{item.item.name}</span>
                    </div>

                    <span className="border border-slate-200 px-2  rounded-lg">
                      x{item.qty}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          )
        
        ))}
      </div>
      <div className="flex flex-col gap-6" >
        <h1 className="text-4xl font-bold text-center text-emerald-400">Ready Orders</h1>
        {orders.map((el) => (
          el.order_status === "Ready" && (<div
            key={el.documentId}
            className="
          p-6
          bg-white
          rounded-3xl
          shadow-lg
          border
          border-slate-200
          overflow-hidden
          hover:shadow-xl
          transition-all
          duration-300
          flex flex-col gap-6
        "
          >
            {/* Header */}
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-slate-500">Order</p>
                <h2 className="text-xl font-bold">{el.id}</h2>
              </div>

              <span className="badge badge-warning badge-lg">
                Ready
              </span>
            </div>

            {/* Total */}
            <div className="bg-slate-50 rounded-2xl flex justify-between items-center">
              <p className="text-sm text-slate-500">Total Amount</p>
              <h3 className="text-3xl font-bold text-emerald-500">
                ${el.total}
              </h3>
            </div>

            {/* Items */}
            <div>
              <h4 className="font-semibold mb-3 text-slate-500">
                Order Items :
              </h4>

              <ul className="space-y-2">
                {el.order_items.map((item) => (
                  <li
                    key={item.documentId}
                    className="
                    flex
                    justify-between
                    items-center
                    bg-slate-50
                    rounded-xl
                    px-3
                    py-2
                  "
                  >
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="size-4 me-2 inline-block text-success"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="font-medium">{item.item.name}</span>
                    </div>

                    <span className="border border-slate-200 px-2  rounded-lg">
                      x{item.qty}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Button */}
            <div>
              <button
                className="
                btn
                btn-success
                w-full
                text-white
                text-base
                font-semibold
              "
                onClick={() => {
                  updateOrder(el.documentId);
                }}
              >
                Order Delivered
              </button>
            </div>
          </div>)
        ))}
      </div>
    </div>
   
  );
}