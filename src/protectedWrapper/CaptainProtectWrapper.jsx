import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import axios from 'axios'
import CaptainContext, { CaptainDataContext } from '../context/CaptainContext';

function CaptainProtectWrapper({ children }) {
  const token = localStorage.getItem('token');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { captain, setCaptain } = useContext(CaptainDataContext);

  useEffect(() => {
    if (!token) navigate('/captain-login');

  
       axios.get(`${import.meta.env.VITE_BASE_URL}/captain/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(response => {
      if (response.status === 200) {
      console.log(response.data)
        setCaptain(response.data.captain);
        console.log(captain)
        setIsLoading(false);
      }
    }).catch(err => {
      console.log(err);
      localStorage.removeItem('token');
      navigate('/captain-login')
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

export default CaptainProtectWrapper;