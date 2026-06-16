import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { FaUser, FaLock } from "react-icons/fa";
import { domain } from "../../store";

export default function Login() {
  const navigate = useNavigate();

  const loginSchema = Yup.object({
    email: Yup.string().required("Email is required").email(),
    password: Yup.string().required("Password is required"),
  });

  const handleLogin = (values) => {
    let data = {
      identifier: values.email,
      password: values.password,
    };

    let endPoint = "/api/auth/local";
    let URL = domain + endPoint;

    axios
      .post(URL, data)
      .then((res) => {
        let jwt = res.data.jwt;
        localStorage.setItem("token", jwt);

        let user = res.data.user;

        if (user.system_role === "Admin") {
          navigate("/admin");
        } else if (user.system_role === "Cashier") {
          navigate("/cashier");
        } else if (user.system_role === "Restaurant") {
          navigate("/orders/inside");
        }
      })
      .catch(() => {
        toast.error("Wrong email or password");
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f8f4] ">
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={handleLogin}
        validationSchema={loginSchema}
      >
        <Form className="w-full max-w-95 bg-white rounded-3xl shadow-xl p-8 flex flex-col gap-6">
          <div className=" flex justify-center">
            <div className="w-14 h-14 bg-[#47b881] rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-md">
              G
            </div>
          </div>

          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800">Staff Access</h1>
            <p className="text-sm text-gray-400 mt-1">
              Welcome back, enter your credentials
            </p>
          </div>

          {/* Email */}
          <div>
            <label className="text-xs uppercase tracking-widest text-[#47b881] font-semibold">
              Staff ID
            </label>

            <div className="relative mt-2">
              <FaUser
                className="
          absolute left-4 top-1/2 -translate-y-1/2
          text-gray-400
          group-focus-within:text-emerald-500
          transition"
              />

              <Field
                name="email"
                type="text"
                placeholder="Enter ID"
                className="w-full  border border-gray-200
            rounded-xl
            py-3 pl-11 pr-4
            text-sm
            outline-none
            transition-all duration-300
            focus:border-emerald-400
            focus:shadow-md
            focus:ring-2 focus:ring-emerald-100
            bg-white"
              />
            </div>

            <ErrorMessage
              name="email"
              component="p"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-xs uppercase tracking-widest text-[#47b881] font-semibold">
              Pin Code
            </label>

            <div className="relative mt-2 group">
              <FaLock
                className="
          absolute left-4 top-1/2 -translate-y-1/2
          text-gray-400
          group-focus-within:text-emerald-500
          transition
        "
              />
              <Field
                name="password"
                type="password"
                placeholder="••••"
                className=" w-full
            border border-gray-200
            rounded-xl
            py-3 pl-11 pr-4
            text-sm
            outline-none
            transition-all duration-300
            focus:border-emerald-400
            focus:shadow-md
            focus:ring-2 focus:ring-emerald-100
            bg-white"
              />
            </div>

            <ErrorMessage
              name="password"
              component="p"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-[#47b881] hover:bg-[#3ea574] text-white font-semibold py-3 rounded-xl shadow-md transition"
          >
            Sign In
          </button>

          {/* Footer */}
          <p className="text-center text-sm text-gray-400">
            Forgot PIN? Reset here
          </p>

          <div className="flex items-center justify-center gap-2">
            <span className="w-2 h-2 bg-[#47b881] rounded-full"></span>
            <p className="text-xs text-[#47b881] uppercase tracking-widest">
              System Secure & Live
            </p>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
