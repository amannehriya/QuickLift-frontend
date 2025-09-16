import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserDataContext } from '../context/UserContext'



function UserRegister() {
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ firstName, setFirstName ] = useState('')
  const [ lastName, setLastName ] = useState('')
  const [ userData, setUserData ] = useState({})
 const [errors,setError] = useState(null);
  const navigate = useNavigate()



  const { user, setUser } = useContext(UserDataContext)




  const submitHandler = async (e) => {
    e.preventDefault()
    const newUser = {
      fullname: {
        firstname: firstName,
        lastname: lastName
      },
      email: email,
      password: password
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/register`, newUser)

    if (response.status === 201) {
      const data = response.data
      setUser(data.user)
      localStorage.setItem('token', data.token)
      navigate('/user-home')
    }
    } catch (error) {
      
       console.log(error.response.data.errors)
      setError(error.response.data.errors)
    
    }

     
    


    setEmail('')
    setFirstName('')
    setLastName('')
    setPassword('')

  }

  return (
    <div>
      <div className='p-7 h-screen bg-[#1A1A1A] flex flex-col justify-between'>
        <div>
         <img className='w-[150px] mb-10' src="./logo.png" alt="" />

          <form onSubmit={(e) => {
            submitHandler(e)
          }}>

            <h3 className='text-lg w-1/2  font-medium mb-2 text-white '>What's your name</h3>
            <div className='flex gap-4 mb-7'>
              <input
                required
                className='bg-[#2A2A2A] text-white w-1/2 rounded-lg px-4 py-2 border-[#333333]  text-lg placeholder:text-base'
                type="text"
                placeholder='First name'
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value)
                }}
              />
              <input
                required
                className='bg-[#2A2A2A] text-white w-1/2  rounded-lg px-4 py-2 border-[#333333]  text-lg placeholder:text-base'
                type="text"
                placeholder='Last name'
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value)
                }}
              />
            </div>

            <h3 className='text-lg font-medium mb-2 text-gray-300'>What's your email</h3>
            <input
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
              className='  bg-[#2A2A2A] text-gray-300 mb-7 rounded-lg px-4 py-2 border-[#333333] w-full text-lg placeholder:text-base'
              type="email"
              placeholder='email@example.com'
            />

            <h3 className='text-lg font-medium mb-2 text-gray-300'>Enter Password</h3>

            <input
              className='bg-[#2A2A2A] text-gray-300 mb-7 rounded-lg px-4 py-2 border-[#333333] w-full text-lg placeholder:text-base'
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
              }}
              required type="password"
              placeholder='password'
            />

              {/* Show backend validation errors */}
        {errors?.length > 0 && (
          <ul className="text-red-600 mb-2">
            {errors.map((err, index) => (
              <li key={index}>{typeof err === "string" ? err : err.msg}</li>
            ))}
          </ul>
        )}
            <button
              className='bg-[#00ffd5] text-black font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
            >Create account</button>

          </form>
          <p className='text-center text-gray-400'>Already have a account? <Link to='/user-login' className='text-[#00ffd5]'>Login here</Link></p>
        </div>
        <div>
          <p className='text-[10px] leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy
            Policy</span> and <span className='underline'>Terms of Service apply</span>.</p>
        </div>
      </div>
    </div >
  )
}

export default UserRegister