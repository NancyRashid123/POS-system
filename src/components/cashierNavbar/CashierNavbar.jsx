import React from "react";
import { CiSearch } from "react-icons/ci";
import { useSearch } from "../../store";


export default function CashierNavbar() {
   const { searchValue, setSearchValue } = useSearch();
  return (
    <div className=" h-20
    md:h-24
    bg-white
    border-b
    border-slate-200
    px-3
    md:px-8
    flex
    items-center
    justify-between
    gap-4">
      <div className="relative w-full max-w-xs md:max-w-md">
  <CiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-slate-400" />

  <input
    onChange={(e) => setSearchValue(e.target.value)}
    type="text"
    placeholder="Search..."
    className="
      w-full
      h-10
      md:h-12
      rounded-2xl
      bg-[#f8f8f8]
      pl-10
      outline-none
      focus:bg-white
      focus:border
      focus:border-emerald-500
    "
  />
</div>
      {/* <div className="relative">
        <CiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-slate-400" />

        <input
          
          onChange={(e) => setSearchValue(e.target.value)}
          type="text"
          placeholder="Search..."
          className="
           w-62.5 md:w-87.5
            h-10 md:h-12
            rounded-2xl bg-[#f8f8f8]
            pl-10 outline-none
            focus:bg-white focus:border focus:border-emerald-500
          "
        />
      </div> */}

      <div className="flex items-center gap-3 md:gap-5">
        <div className="bg-emerald-100 text-emerald-500 px-3 md:px-5 py-2 rounded-xl text-xs md:text-sm font-semibold">
          TABLE 12
        </div>

        <div className="text-right">
          <h3 className="font-bold text-sm">Ahmed</h3>
          <p className="text-xs text-gray-400">CASHIER</p>
        </div>

        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-200"></div>
      </div>
    </div>
  );
}
