import React from "react";
import { Routes, Route, } from "react-router-dom";
import './App.css'

import Home from "./LandingComponents/Home/Home";
import AdminLayout from "./AdminComponents/Main/layouts/admin";
import FeaturesTop from "./LandingComponents/FeaturesTop/FeaturesTop";
import Features from "./LandingComponents/Features/Features";
import Contact from "./LandingComponents/Contact/Contact";
import Footer from "./LandingComponents/Footer/Footer";
import Newsletter from "./LandingComponents/Newsletter/Newsletter";
import Testimonial from "./LandingComponents/Testimonial/Testimonial";
import Navbar1 from "./LandingComponents/Navbar1/Navbar1";
import { Toaster } from "react-hot-toast";
import { UserContextProvider } from "./context/userContext";
import Register from "LandingComponents/Register";
import Login from "LandingComponents/Login";
import User from "EmployeeComponents/User_main/layouts/user";
import Add from "AdminComponents/Main/views/admin/users/components/adduser/Add";
import Select from "LandingComponents/Select";
import Userlogin from "EmployeeComponents/Userlogin";
import Welcome from "EmployeeComponents/Welcome";
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.withCredentials = true
const App = () => {


  return (
    
    <UserContextProvider>
      <Routes>
        <Route
          path="/" element={
            <>
              
              <Navbar1 />
              <Home />
              <FeaturesTop />
              <Features />
              <Testimonial />
              <Newsletter />
              <Contact />
              <Footer />
              
            </>} />
            </Routes>
            
             
      <Toaster position='top-center' toastOptions={{ duration: 2000 }} />
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path="admin/*" element={<AdminLayout />} />
        <Route path="user/*" element={<User/>} />
        <Route path="/add" element={<Add/>} />
        <Route path="/select" element={<Select />} />
        <Route path="/EmpLogin" element={<Userlogin />} />
        <Route path="/welcome" element={<Welcome />} />
    </Routes>
    

    
    </UserContextProvider>
      

  );
};

export default App;
