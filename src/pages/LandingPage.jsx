import React from 'react'

import { useEffect, useState } from "react";
import { Navigate, useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const navigate = useNavigate();


  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="  flex flex-col justify-between bg-[url(/mobile-landing.png)] bg-no-repeat lg:bg-[url(/landing-page.png)] h-screen w-full   bg-cover object-contain relative overflow-hidden"
      
    >
  
      {/* Top Bar */}
      <div className="flex justify-between items-center px-4">
        {/* Logo */}
         <img src="/logo.png" className=' w-40' alt="" />
        {/* Current Time */}
        <p className="text-lg font-semibold text-white">{time}</p>
      </div>

      {/* Center Content */}
      <div className=" absolute top-[550px]  lg:left-[100px] left-[50px]  flex flex-col  items-center h-1/3 text-center">
       

        <button className=" mt-8 py-3 w-[180px] h-[50px]  bg-gray-200 text-black hover:text-white text-xl  font-bold rounded-full shadow-lg hover:bg-gray-800 transition"
        onClick={()=>{navigate('/user-login')}}>
          Get Started
        </button>
      </div>
   
    </div>
  );
}
