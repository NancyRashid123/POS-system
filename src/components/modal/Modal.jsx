import React, { useEffect, useState } from "react";
import { domain, useCart, useModal } from "../../store";
import axios from "axios";
import { CgLaptop } from "react-icons/cg";
import toast from "react-hot-toast";

export default function Modal() {
  const { setModalIndex } = useModal();
  const { cart, setCart } = useCart();
  const [total, setTotal] = useState(0);
  const [given, setGiven] = useState(0);

  const saveOrder = () => {
    let user = JSON.parse(sessionStorage.getItem('user'));
    let dataToPost = {
      data: {
        users_permissions_user: user.documentId,
        total: total,
        order_status: "Under Process",
      },
    };
    let url = domain + "/api/orders";
    axios.post(url, dataToPost).then((res) => {
      cart.forEach(async (item) => {
        let orderItem = {
          data: {
            order: res.data.data.documentId,
            item: item.documentId,
            qty: item.qty,
          },
        };
        let urlItem = domain + "/api/order-items";
        await axios.post(urlItem, orderItem);
      });
      toast.success("Order Done");
      setCart([]);
      setModalIndex(false);
    });
  };

  useEffect(() => {
    let sub = 0;
    cart.forEach((item) => {
      sub += item.price * item.qty;
    });
    let newTax = 0.14 * sub;
    setTotal(sub + newTax);
  }, [cart]);
  return (
    <div
      className="w-full h-full bg-black/70 flex items-center justify-center fixed top-0 left-0 z-50"
      onClick={() => setModalIndex(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="  bg-[#f5f5f5]
    w-[95%]
    max-w-md
    flex
    flex-col
    rounded-3xl
    shadow-2xl
    shadow-slate-400
    border
    border-gray-200
    p-6
    gap-5"
      >
        <h1 className="text-lg uppercase tracking-widest text-emerald-500 font-bold">
          Checkout
        </h1>

        {/* total */}
        <div className="bg-emerald-50 rounded-2xl p-4 flex justify-between items-center">
          <span className="text-sm text-slate-400">Total</span>
          <span className="text-xl font-bold text-emerald-600">
            {total.toFixed(2)}
          </span>
        </div>

        {/* input */}
        <div>
          <input
            onChange={(e) => setGiven(Number(e.target.value))}
            type="number"
            placeholder="Enter Customer Amount"
            className="
            w-full
            border border-slate-200
            rounded-xl
            py-3 px-4
            outline-none
            focus:ring-2 focus:ring-emerald-100
            focus:border-emerald-400
            transition
          "
          />
        </div>

        {/* REMAIN */}
        <div className="flex justify-between text-sm">
          <span className="text-slate-500">Remain</span>
          <span
            className={`font-bold ${given < total ? "text-red-500" : "text-emerald-500"}`}
          >
            {given == 0 ? "0.00" : (total - given).toFixed(2)}
          </span>
        </div>

        {/* BUTTON */}
        <button
          onClick={saveOrder}
          className="
          w-full
          bg-emerald-500
          text-white
          py-3
          rounded-2xl
          font-semibold
          hover:bg-emerald-600
          transition
          shadow-md
          disabled:opacity-50
          "
          disabled={given < total ? true : false}
        >
          Save Order
        </button>
      </div>
    </div>
  );
}
