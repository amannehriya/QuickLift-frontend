import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function UserLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userData, setUserData] = useState({})
  const [errors, setError] = useState([]);

  const { user, setUser } = useContext(UserDataContext)
  const navigate = useNavigate()



  const submitHandler = async (e) => {
    e.preventDefault();

    const userData = {
      email: email,
      password: password
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/login`, userData)

      if (response.status === 200) {
        const data = await response.data

        localStorage.setItem('token', data.token)
        // setUser(data.user)
        // console.log(user)
        // console.log(data.user)
       
        navigate('/user-home')
      }

    } catch (error) {
      console.log(error.response.data.errors);
      setError(error.response.data.errors)
    }


    setEmail('')
    setPassword('')
  }

  return (
    <div className='p-7 h-screen bg-[#1A1A1A] flex flex-col justify-between'>
      <div>
        <img className='w-[150px] mb-10' src="./logo.png" alt="" />

        <form onSubmit={(e) => {
          submitHandler(e)
        }}>
          <h3 className='text-lg font-medium mb-2 text-gray-300'>What's your email</h3>
          <input
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
            className='bg-[#2A2A2A] text-white mb-7 rounded-lg px-4 py-2 border-[#333333] w-full text-lg placeholder:text-base'
            type="email"
            placeholder='email@example.com'
          />

          <h3 className='text-lg font-medium mb-2 text-gray-300'>Enter Password</h3>

          <input
            className='bg-[#2A2A2A] text-white mb-7 rounded-lg px-4 py-2 border-[#333333] w-full text-lg placeholder:text-base'
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            required type="password"
            placeholder='password'
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
            className='bg-[#00ffd5] text-black font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
          >Login</button>

        </form>
        <p className='text-center text-gray-400'>New here? <Link to='/user-register' className='text-[#00ffd5]'> Create new Account</Link></p>
      </div>
      <div>
        <Link
          to='/captain-login'
          className='bg-[#d5b607] flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
        >Sign in as Captain</Link>
      </div>
    </div>
  )
}

export default UserLogin