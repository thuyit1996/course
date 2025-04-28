'use client';

import Input from "@/components/form/input/InputField";
import { useState } from "react";
import { CalenderIcon, EyeCloseIcon, EyeIcon, TimeIcon } from "../../../icons";

const SignInPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState('');
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  // Khi blur (mất focus) -> kiểm tra và thêm @gmail.com nếu thiếu
  const handleEmailBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    if (e.target.value && !e.target.value.includes("@")) {
      setEmail(e.target.value + "@gmail.com");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">

      {/* Main container */}
      <div className="flex flex-col md:flex-row w-full max-w-[1440px] overflow-hidden">

        {/* Left image */}
        <div className="md:w-1/2 p-4 md:p-6 flex justify-center w-full relative" data-aos="zoom-in">
          <img src="/images/auth/Image.png" />
        </div>

        {/* Right form */}
        <div className="md:w-1/2 w-full p-8 flex flex-col md:mt-[130px]" data-aos="fade-left">

          {/* Logo */}
          <div className="mb-6 md:mr-[120px] xl:mr-[134px] text-center md:text-left" data-aos="fade-down">
            <img src="/images/logo/logo-main.svg" alt="Logo"
              className="h-10 mx-auto md:mx-0 mb-4" />

            <h2 className="text-2xl font-bold mt-10 lg:mt-15 xl:text-[48px] xl:leading-[60px] text-[#2c2c2c]">
              Welcome to<br />
              <span className="">Your Workspace 🌟</span>
            </h2>
            <p className="mt-3 text-lg text-[#757575]">
              Log in to start fresh or pick up where you left off.
            </p>
          </div>

          {/* Form */}
          <form className="mt-6 lg:mt-10">
            <div className="mb-6">
              <label className="block text-base mb-2 text-[#2c2c2c]">Email</label>
              <Input
                type="email"
                value={email}
                onChange={handleEmailChange}
                onBlur={handleEmailBlur}
                placeholder="@example.com"
                className="w-full border border-gray-200 rounded-md text-[#FDFDFD]"
              />
            </div>
            <div>
              <label className="block text-base mb-2 text-[#2c2c2c]">Password</label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={event => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  className="w-full border border-gray-200 rounded-md "
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                >
                  {showPassword ? (
                    <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                  ) : (
                    <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
                  )}
                </button>
              </div>
              <div className="text-right mt-2.5">
                <a href="#" className="text-sm font-medium text-indigo-600 hover:underline">Forgot Password?</a>
              </div>
            </div>

            {/* <button
              className="w-full bg-primary mt-6 text-lg border-rose-50 font-semibold xl:mt-10 hover:text-white hover:bg-rose-700 text-rose-600 py-2.5 rounded-lg border border- bg-rose-100 transition-all duration-300 transform hover:scale-105"
            >
              Log In
            </button> */}
            <button
              type="submit"
              disabled={true}
              className={`w-full mt-6 text-lg font-semibold xl:mt-10 py-2.5 rounded-lg border transition-all duration-300 transform
                ${true
                  ? "bg-rose-300 cursor-not-allowed text-white"
                  : "bg-rose-100 text-rose-600 hover:bg-rose-700 hover:text-white hover:scale-105"
                }`
              }
            >
              {true ? "Logging in..." : "Log In"}
            </button>

          </form>

          {/* Footer */}
          <div className="text-center mt-4 text-base" data-aos="fade">
            <span className="text-[#757575]">Don't have an account?</span>
            <a href="#" className="text-rose-600 font-medium hover:underline ml-2"> Sign Up</a>
          </div>

        </div>

      </div>

    </div>
  )
}
export default SignInPage;