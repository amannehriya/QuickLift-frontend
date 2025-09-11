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
      className="flex flex-col justify-between  h-screen w-full bg-cover bg-center relative overflow-hidden"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1557404763-69708cd8b9ce?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
    >
      {/* Top Bar */}
      <div className="flex justify-between items-center p-4">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-zinc-900">🚖 QuikLift</h1>

        {/* Current Time */}
        <p className="text-lg font-semibold text-white">{time}</p>
      </div>

      {/* Center Content */}
      <div className="  flex flex-col justify-center items-center h-1/3 text-center">
        <h2 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg">
          Ride Smarter with QuikLift
        </h2>
        <p className="mt-4 text-lg md:text-xl text-white opacity-90">
          Your reliable ride, anytime, anywhere
        </p>

        <button className=" mt-8 px-8 py-3 w-5/6  bg-black text-white font-semibold rounded-2xl shadow-lg hover:bg-gray-800 transition"
        onClick={()=>{navigate('/user-login')}}>
          Get Started
        </button>
      </div>
    </div>
  );
}
