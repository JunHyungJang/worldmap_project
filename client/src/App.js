import React, { useEffect,useState } from 'react'
import {BrowserRouter, Route, Routes, Router} from 'react-router-dom'
import Title  from './components/views/Title/Title'
import NavBar from './components/views/NavBar/NavBar'
import Main from './components/views/Main/Main'
import LandingPage from './components/views/LandingPage/LandingPage'
import LoginPage from './components/views/LoginPage/LoginPage'
import RegisterPage from './components/views/RegisterPage/RegisterPage'
import Worldmap from './components/views/Worldmap/Worldmap'
import UploadImage from './components/views/UploadImage/UploadImage'
import Detailpage from './components/views/Detailpage/Detailpage'

import "antd/dist/antd.min.css";
import { data } from 'jquery'


function App() {
  const [isLogin, setisLogin] = useState(false)
  const [Id, setId] = useState("")
  
  useEffect(() => {
    if(sessionStorage.getItem('user_id' == null)) {
      // console.log('isLogin ? ::', isLogin)
    }
    else {
      setisLogin(true)
      // console.log('else')
      // console.log('isLogin ? : :', isLogin)
    }
  }, [])
  
  return (
    <div>
      <NavBar/>
       <BrowserRouter>
        <Routes>
        <Route exact path = "/" element = {<Worldmap/>} />
        <Route exact path = "/landingpage" element = {<LandingPage/>}/>
        <Route exact path = "/login" element = {<LoginPage/>}/>
        <Route exact path = "/register" element = {<RegisterPage/>}/>
        <Route exact path = "/title" element = {<Title isLogin = {isLogin}/>}/>
        <Route exact path = "/upload" element = {<UploadImage/>}/>
        <Route exact path = '/:id' element = {<Detailpage />}/>






        </Routes>
      </BrowserRouter>
      </div> 
    
    
  )
}

export default App
