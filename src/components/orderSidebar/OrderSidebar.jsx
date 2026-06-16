import React, { useEffect, useState } from "react";
import { domain, useCart, useModal } from "../../store";
import { BsTrash3 } from "react-icons/bs";

export default function OrderSidebar({ orderItems }) {
  const { cart, setCart } = useCart();
  const{ setModalIndex} = useModal();
  const increment = (id) => {
    let indexItem = cart.findIndex((el) => el.documentId === id);
    let copyCart = [...cart];
    copyCart[indexItem].qty += 1;
    setCart(copyCart);
  };
  const decrement = (id) => {
    let indexItem = cart.findIndex((el) => el.documentId === id);
    let copyCart = [...cart];
    if (copyCart[indexItem].qty == 1) {
      copyCart.splice(indexItem, 1);
    } else {
      copyCart[indexItem].qty -= 1;
    }
    setCart(copyCart);
  };

  const clearorder = () => setCart([]);

  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    let sub = 0;
    cart.forEach((item) => {
      sub += item.price * item.qty;
    });
    let newTax = 0.14 * sub;
    let newTotal = sub + newTax;
    setSubtotal(sub);
    setTax(newTax);
    setTotal(sub + newTax);
  }, [cart]);

  return (
    <aside
      className="
      w-full
    lg:w-85
    xl:w-95
    bg-white
    border-l
    border-slate-200
    flex
    flex-col
    h-full
    "
    >
      {/* HEADER */}
      <div className="p-5 border-b border-slate-200 flex items-center justify-between">
        <h2 className="text-xl md:text-2xl font-bold">Current Order</h2>

        <button onClick={clearorder} className=" text-rose-400 hover:text-rose-500 hover:scale-125 transition-all duration-500">
          <BsTrash3/>
        </button>
      </div>

      {/* ITEMS */}
      <div className="grow overflow-y-auto p-5 space-y-5 ">
        {orderItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-3 transition-all duration-500 hover:-translate-y-0.5"
          >
            <div className="w-10 h-10 md:w-12 md:h-12 rounded overflow-hidden">
              <img
                src={domain + item.img?.url}
                alt={item.name}
                className="w-full h-full  object-cover "
              />
            </div>

            {/* name + price */}
            <div className="flex-1">
              <h3 className="text-sm font-semibold">{item.name}</h3>

              <span className="text-emerald-500 font-bold text-sm">
                ${item.price * item.qty}
              </span>
            </div>

            <div className="w-20 h-8 flex items-center gap-2 p-2 rounded-xl bg-slate-50 justify-between">
              <button
                onClick={() => decrement(item.documentId)}
                className="text-slate-500 hover:text-red-500 hover:-translate-y-0.5  transition-all duration-500"
              >
                -
              </button>

              <span className="text-sm font-semibold">{item.qty}</span>

              <button
                onClick={() => increment(item.documentId)}
                className="text-slate-500 hover:text-emerald-500 hover:-translate-y-0.5  transition-all duration-500"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* TOTAL SECTION */}
      <div className="p-5 border-t border-slate-200 flex flex-col gap-4">
        {/* subtotal */}
        <div className="flex justify-between text-sm text-slate-400">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        {/* tax */}
        <div className="flex justify-between text-sm text-slate-400">
          <span>Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>

        {/* total */}
        <div className="flex justify-between text-xl font-bold">
          <span>Total</span>
          <span className="text-emerald-500">${total.toFixed(2)}</span>
        </div>

        {/* button */}
        <button
        onClick={() => setModalIndex(true)}
          className="
          w-full h-12
          bg-emerald-500 
          text-white
          rounded-2xl
          font-bold
          shadow-md
          uppercase
          tracking-[0.18em]
          text-[10px]
         hover:-translate-y-0.5 transition-all duration-500
          hover:bg-emerald-600
        "
        >
        proceed to Checkout
        </button>
      </div>
    </aside>
  );
}




