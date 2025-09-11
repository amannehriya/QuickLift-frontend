import React from 'react'
import { Route, Routes } from 'react-router-dom'
import UserLogin from './pages/UserLogin'
import UserRegister from './pages/UserRegister'
import CaptainRegister from './pages/CaptainRegister'
import CaptainLogin from './pages/CaptainLogin'
import LandingPage from './pages/LandingPage'
import UserProtectWrapper from './protectedWrapper/UserProtectWrapper'
import CaptainProtectWrapper from './protectedWrapper/CaptainProtectWrapper'
import UserHome from './pages/UserHome'
import CaptainHome from './pages/CaptainHome'
import VerifyOtp from './pages/VerifyOtp'

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/user-login' element={<UserLogin />} />
        <Route path='/user-register' element={<UserRegister />} />
        <Route path='/captain-login' element={<CaptainLogin />} />
        <Route path='/verify-otp/:mobile' element={<VerifyOtp />} />
        
        <Route path='/captain-register/:mobile/:otp' element={<CaptainRegister />} />
        <Route path='/verify-otp' element={<VerifyOtp />} />

        <Route path='/user-home' element={
          <UserProtectWrapper>
            <UserHome />
          </UserProtectWrapper>
        } />

        <Route path='/captain-home' element={
          <CaptainProtectWrapper>
            <CaptainHome />
          </CaptainProtectWrapper>
        } />



      </Routes>


    </div>
  )
}

export default App