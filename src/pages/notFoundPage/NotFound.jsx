import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="w-full h-dvh flex flex-col items-center justify-center bg-slate-50 text-center p-6">
      
      <h1 className="text-7xl font-bold text-emerald-500">404</h1>

      <h2 className="text-2xl font-semibold mt-4 text-slate-700">
        Page Not Found
      </h2>

      <p className="text-slate-400 mt-2">
        The page you are looking for doesn’t exist or has been moved.
      </p>

      <Link
        to="/"
        className="
          mt-6
          bg-emerald-500
          text-white
          px-6 py-3
          rounded-xl
          hover:bg-emerald-600
          transition
        "
      >
        Go Home
      </Link>
    </div>
  );
}