/* eslint-disable react/react-in-jsx-scope */
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'
// landingPage
import LandingPage from './pages/landingPage/LandingPage'
// auth
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import Verified from './pages/auth/Verified'
import NotFound from './components/notFound'
// admin
import HomeAdm from './pages/admin/Home_admin'
import ProductsAdm from './pages/admin/Products_admin'
import AddProductAdm from './pages/admin/AddProducts_admin'
import UsersAdm from './pages/admin/Users_admin'
// user
import Home from './pages/user/Home'
import SuccessPayment from './components/SuccessPayment'

function App () {
  useEffect(() => {
    document.title = "Doorgan Apparel ™";
  }, [])

  const { user } = useAuthContext()

  return (
    <div className="app">
      <BrowserRouter>
      <div className="pages">
        <Routes>
        <Route path='/' element={<LandingPage/>}/>
        {/* auth */}
        <Route path='/login' element={!user ? <Login /> : <Navigate to='/home' />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/userVerify/:id/:token' element={<Verified />} />
        <Route path='/home' element={user ? (user.role === 'admin' ? <HomeAdm /> : <Home />) : (<Navigate to='/login' />)} />
        <Route path='*' element={<NotFound />} />
        {/* admin */}
        <Route path='/home' element={user ? (user.role === 'admin' ? <HomeAdm /> : <NotFound />) : (<Navigate to='/login' />)} />
        <Route path='/admin/products' element={user ? (user.role === 'admin' ? <ProductsAdm /> : <NotFound />) : (<Navigate to='/login' />)} />
        <Route path='/admin/add-product' element={user ? (user.role === 'admin' ? <AddProductAdm /> : <NotFound />) : (<Navigate to='/login' />)} />
        <Route path='/admin/users' element={user ? (user.role === 'admin' ? <UsersAdm /> : <NotFound />) : (<Navigate to='/login' />)} />
        {/* user */}
        <Route path='/home' element={ user ? (user.role === 'user' ? <Home /> : <NotFound />) : (<Navigate to='/login' />)} />
        {/* <Route path='/success' element={ user ? (user.role === 'user' ? <SuccessPayment /> : <NotFound />) : (<Navigate to='/login' />)} /> */}
        <Route path='/success/:productId' element={!user ? <Login /> : <SuccessPayment />} />
        </Routes>
      </div>
      </BrowserRouter>
    </div>
  )
}

export default App
