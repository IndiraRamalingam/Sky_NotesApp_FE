import React from 'react'
import '../src/App.css'
import { BrowserRouter, Routes ,Route,Navigate } from 'react-router-dom'
import Home from './components/Pages/Home'
import SignUp from './components/user/SignUp';
import SignIn from './components/user/SignIn';
import ForgotPassword from './components/user/ForgotPassword';
import ResetPassword from './components/user/ResetPassword';
import CreateNote from './components/Pages/CreateNote';
import ViewNote from './components/Pages/ViewNote';

function App() {
  return (
  <>
     <div id="page-container">
        <div id="content-wrap">
          <BrowserRouter>
            <Routes>
              <Route path='/home/:id' element={<Home />} />
              <Route path='/signup' element={<SignUp />} />
              <Route path='/signin' element={<SignIn />} />
              <Route path='/forgot_password' element={<ForgotPassword />} />
              <Route path='/reset_password/:token' element={<ResetPassword />} />
              <Route path='/create_note/:id' element={<CreateNote/>} />
              <Route path='/view_note/:id' element={<ViewNote/>} />
              <Route path="/" element={<Navigate to="/signin" replace />} />
            </Routes>
          </BrowserRouter>
        </div>
        
      </div>
  </>
  )
}

export default App