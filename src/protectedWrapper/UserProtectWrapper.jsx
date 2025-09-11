import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import UserContext, { UserDataContext } from '../context/UserContext';
import axios from 'axios'

function UserProtectWrapper({ children }) {
  const token = localStorage.getItem('token');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserDataContext);

  useEffect(() => {
    if (!token) navigate('/user-login');

    axios.get(`${import.meta.env.VITE_BASE_UR}/user/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(response => {
      if (response.status === 200) {
        setUser(response.data);
        setIsLoading(false);
      }
    }).catch(err => {
      console.log(err);
      localStorage.removeItem('token');
      navigate('/user-login')
    })
  }, [token])


  if (isLoading) {
    return (
      <div>loading...</div>
    )
  }
  return (
    <div>{children}</div>
  )
}

export default UserProtectWrapper