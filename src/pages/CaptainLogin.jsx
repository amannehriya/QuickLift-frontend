import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


function CaptainLogin() {
  const navigate = useNavigate();
  const [mobile, setMobile] = useState("");
  const [errors, setError] = useState([]);


  const submitHandler = async (e) => {
    e.preventDefault();

    const userData = {
      mobile
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/send-otp`, userData)

      if (response.status === 200) {
        console.log(response.data)
        navigate(`/verify-otp/${mobile}`)
      }
    } catch (err) {
      console.log(err.response.data.errors);
      setError(err.response.data.errors)
    }

  }


  return (
    <div className='p-7 h-screen bg-[#1A1A1A] flex flex-col justify-between'>
      <div>
        <img className='w-[150px] mb-10' src="./logo.png" alt="" />
        <h1 className='text-[#d5a507fa] text-xl font-semibold mb-10'>Start Your Journey as a QuikLift Driver</h1>
        <form onSubmit={(e) => {
          submitHandler(e)
        }}>
          <h3 className='text-lg font-medium mb-2 text-gray-300'>What's your mobile no. :</h3>
          <input
            required
            value={mobile}
            onChange={(e) => {
              setMobile(e.target.value)
            }}
            className='bg-[#2A2A2A] text-white mb-7 rounded-lg px-4 py-2 border-[#333333] w-full text-lg placeholder:text-base'
            type="text"
            placeholder='91+'
          />


          {/* Show backend validation errors */}
          {errors.length > 0 && (
            <ul className="text-red-600 mb-2">
              {errors.map((err, index) => (
                <li key={index}>{typeof err === "string" ? err : err.msg}</li>
              ))}
            </ul>
          )}

          <button
          // onClick={submitHandler}
            className=' bg-[#d5b607]  hover:bg-[#b89d08] text-black font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
          >continue</button>

        </form>
      </div>
      <div>
        <Link
          to='/user-login'
          className='bg-[#00ffd5] hover:bg-[#07c3a3] flex items-center justify-center text-black font-semibold mb-5 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
        >Sign in as user</Link>
      </div>
    </div>

  )
}

export default CaptainLogin