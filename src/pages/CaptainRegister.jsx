import React, { useContext, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CaptainDataContext } from '../context/CaptainContext'


function CaptainRegister() {
  const navigate = useNavigate()
  const { mobile, otp } = useParams();
  const [errors, setError] = useState([]);

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  const [vehicleColor, setVehicleColor] = useState('')
  const [vehiclePlate, setVehiclePlate] = useState('')
  const [vehicleCapacity, setVehicleCapacity] = useState('')
  const [vehicleType, setVehicleType] = useState('')


  const { captain, setCaptain } = useContext(CaptainDataContext)


  const submitHandler = async (e) => {
    e.preventDefault()
    const captainData = {
      fullname: {
        firstname: firstName,
        lastname: lastName
      },
      mobile:mobile.toString(),
      otp,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType
      }
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/register`, captainData)

      if (response.status === 201) {
        const data = response.data
        setCaptain(data.captain)
        localStorage.setItem('token', data.token)
        navigate('/captain-home')
      }
    } catch (error) {
      console.log(error.response.data.message)
      setError(error.response.data.message)
    }

    // setFirstName('')
    // setLastName('')
    // setVehicleColor('')
    // setVehiclePlate('')
    // setVehicleCapacity('')
    // setVehicleType('')

  }
  return (
    <div className='py-5 px-5 bg-[#1A1A1A] h-screen flex flex-col justify-between overflow-hidden'>
      <div>
        
        <img className='w-[150px] mb-7' src="/logo.png" alt="" />
        <h2 className='text-white text-center font-semibold text-xl mb-5 '>Enter your details</h2>

        <form onSubmit={(e) => {
          submitHandler(e)
        }}>

          <h3 className='text-lg w-full  font-medium mb-2 text-gray-300'>What's our Captain's name</h3>
          <div className='flex gap-4 mb-7'>
            <input
              required
              className='bg-[#2A2A2A] text-white  w-1/2 rounded-lg px-4 py-2 border-[#333333]  text-lg placeholder:text-base'
              type="text"
              placeholder='First name'
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value)
              }}
            />
            <input
              required
              className='bg-[#2A2A2A] text-white  w-1/2  rounded-lg px-4 py-2 border-[#333333]  text-lg placeholder:text-base'
              type="text"
              placeholder='Last name'
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value)
              }}
            />
          </div>

          <h3 className='text-lg font-medium mb-2 text-gray-300'>What's mobile no.</h3>
          <input
            required
            value={mobile}
            readOnly
            className='bg-[#2A2A2A] text-white  mb-7 rounded-lg px-4 py-2 border-[#333333] w-full text-lg placeholder:text-base'
            type="number"
            placeholder='email@example.com'
          />

          <h3 className='text-lg font-medium mb-2 text-gray-300'>Enter otp</h3>

          <input
            className='bg-[#2A2A2A] text-white  mb-7 rounded-lg px-4 py-2 border-[#333333] w-full text-lg placeholder:text-base'
            value={otp}
            readOnly
            required
            type="number"
          />

          <h3 className='text-lg font-medium mb-2 text-gray-300'>Vehicle Information</h3>
          <div className='flex gap-4 mb-7'>
            <input
              required
              className='bg-[#2A2A2A] text-white  w-1/2 rounded-lg px-4 py-2 border-[#333333] text-lg placeholder:text-base'
              type="text"
              placeholder='Vehicle Color'
              value={vehicleColor}
              onChange={(e) => {
                setVehicleColor(e.target.value)
              }}
            />
            <input
              required
              className='bg-[#2A2A2A] text-white  w-1/2 rounded-lg px-4 py-2 border-[#333333] text-lg placeholder:text-base'
              type="text"
              placeholder='Vehicle Plate'
              value={vehiclePlate}
              onChange={(e) => {
                setVehiclePlate(e.target.value)
              }}
            />
          </div>
          <div className='flex gap-4 mb-7'>
            <input
              required
              className='bg-[#2A2A2A] text-white  w-1/2 rounded-lg px-4 py-2 border-[#333333] text-lg placeholder:text-base'
              type="number"
              placeholder='Vehicle Capacity'
              value={vehicleCapacity}
              onChange={(e) => {
                setVehicleCapacity(e.target.value)
              }}
            />
            <select
              required
              className='bg-[#2A2A2A] text-white  w-1/2 rounded-lg px-4 py-2 border-[#333333] text-lg placeholder:text-base'
              value={vehicleType}
              onChange={(e) => {
                setVehicleType(e.target.value)
              }}
            >
              <option value="" disabled>Select Vehicle Type</option>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
              <option value="moto">Moto</option>
            </select>
          </div>

           {/* Show backend validation errors */}
        {errors.length > 0 && (
          <ul className="text-red-600 mb-2">
            {errors.map((err, index) => ( //hamara error kabhi array of string aata he and or kabhi error of object aata he
              <li key={index}>{typeof err === "string" ? err : err.msg}</li>
            ))}
          </ul>
        )}
          <button
            className=' bg-[#d5b607]  hover:bg-[#b89d08] text-black font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
          >Create Captain Account</button>

        </form>
      </div>
    </div>
  )
}

export default CaptainRegister