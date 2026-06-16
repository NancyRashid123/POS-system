import React from "react";
import { FiPlus } from "react-icons/fi";
import { domain, useCart } from "../../store";

export default function ProductCard({ item }) {
  const {cart , setCart} = useCart();
  const addToCart = () => {
    let newItem = {...item , qty: 1};
    let id = newItem.documentId;
    let indexItem = cart.findIndex((el) => el.documentId === id);
    if(indexItem == -1){
      setCart([...cart , newItem]);
    }else{
      let copyCart = [...cart];
      copyCart[indexItem].qty += 1;
      setCart(copyCart);
    }
  }
  const imageUrl = item.img?.url
  ? `${domain}${item.img.url}`
  : " ";

  return (
  <div
    className="
      group
      bg-white
      rounded-[26px]
      p-3
      flex
      flex-col
      justify-between
      h-full
      gap-3
      border
      border-slate-200
      shadow-sm
      hover:-translate-y-2
      transition-all
      duration-500
      hover:shadow-xl
      hover:border-emerald-100
    "
  >
    <div className="w-full h-32 sm:h-40 md:h-45 rounded-[22px] overflow-hidden bg-slate-50">
      <img
        src={imageUrl}
        alt={item.name}
        className="
          w-full
          h-full
          object-cover
          rounded-2xl
          group-hover:scale-105
          transition-all
          duration-500
        "
      />
    </div>

    <h3
      className="
        font-bold
        text-sm
        sm:text-base
        md:text-lg
        line-clamp-1
      "
    >
      {item.name}
    </h3>

    <div className="flex items-center justify-between">
      <span
        className="
          text-emerald-500
          font-bold
          text-sm
          md:text-lg
        "
      >
        ${item.price}
      </span>

      <button
        onClick={addToCart}
        className="
          w-9 h-9
          md:w-11 md:h-11
          rounded-2xl
          bg-emerald-500
          text-white
          flex
          items-center
          justify-center
          hover:bg-emerald-600
          transition-all
          duration-500
        "
      >
        <FiPlus />
      </button>
    </div>
  </div>
);
  // return (
  //   <div className="
  //     group
  //     bg-white rounded-[26px] p-3
  //     flex flex-col justify-between
  //     h-full gap-4
  //     border
  //     border-slate-200
  //     shadow-sm
  //     hover:-translate-y-2 transition-all duration-500
  //     hover:shadow-xl
  //     hover:border-emerald-100
  //   ">

  //     {/* image */}
  //     <div className="w-full h-45 rounded-[22px] overflow-hidden bg-slate-50">
  //       <img
  //        src={imageUrl}
  //        alt={item.name} className="w-full h-full  object-cover rounded-2xl group-hover:scale-105 transition-all duration-500"
  //     />
  //     </div>
      

  //     {/* title */}
  //     <h3 className="font-bold text-base md:text-lg ">
  //       {item.name}
  //     </h3>

  //     {/* bottom section FIXED */}
  //   <div className="flex items-center justify-between ">

  //       {/* price */}
  //       <span className="text-emerald-500 font-bold text-lg">
  //         ${item.price}
  //       </span>

  //       {/* button */}
  //       <button onClick={addToCart} className="
  //         w-10 h-10 md:w-11 md:h-11
  //         rounded-2xl
  //         bg-emerald-500 
  //         text-white
  //         flex items-center justify-center
  //         transition-colors duration-500
  //         hover:bg-emerald-600
  //       ">
  //         <FiPlus />
  //       </button>

  //     </div>

  //   </div>
  // );
}
