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
              $eq: "Under Process",
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
        order_status: "Ready",
      },
    };

    axios.put(url, dataToPut).then(() => {
      toast.success("Order Ready Successfully");
      getOrders();
    });
  };
  useEffect(() => {
    getOrders();
  }, []);

  return (
     <div className="w-full h-dvh overflow-auto bg-slate-100 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {orders.map((el) => (
          <div
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
          duration-500
          flex flex-col gap-6
        "
          >
            {/* Header */}
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-slate-500">Order</p>
                <h2 className="text-xl font-bold">{el.id}</h2>
              </div>

             <span className="px-3 py-1 rounded-full text-xs md:text-sm bg-yellow-100 text-yellow-600">
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
                Ready Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
