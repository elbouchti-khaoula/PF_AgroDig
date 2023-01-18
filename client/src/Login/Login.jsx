import logo from "../Home/Images/logo.png"
import React, { useState } from 'react';
import { Form, Body, Main, Logo } from './../SignUp/signupcss'
import './../SignUp/signup.css'
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom';
import { setCookie } from '../contexts/RequireAuth';
import axios from "axios";
import configData from "../Config.json";

const Login = () => {
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  const [data, setData] = useState({email: '', password: ''});
  const [status, setStatus] = useState('');
  const [progress, setProgress] = useState(false);

  const [values, setValues] = useState({
    password: "",
    showPassword: false,
  });
  const handleShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };


  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  const handlePasswordChange = (prop) => (e) => {
    setData({...data, password: e.target.value})
    setValues({ ...values, [prop]: e.target.value });
  };

  const onloginsubmit = e => {
    setProgress(true);
    
    e.preventDefault();
    const endpoint = configData.USER_SERVICE_URL+'/login'
    axios.post(`${endpoint}`, {
       			username: data.email,
       			password: data.password,
       		}, {
      headers: {
          'Content-Type': 'application/json',
      }
  }).then(
      (res) => {
        
        
        const auth = ""+res.headers["authorization"];
        const token = auth.split(' ')[1];
        setCookie("token",token,3);
        console.log("token is " + token);
          
          window.location.href = "/";
      }
      ,
      (err) => {
          //TODO : handle error with customized stuff
          alert("erreur lors de l'authentification, veuillez reentrer vos données, en cas de besoin contacter l'admin");
          console.error(err);
      }
  );
    }

  return (
    <>
      <Body className='loback text-black'>
        <Main>
          <Form className=' bg-slate-200 text-black' onSubmit={onloginsubmit}>
            <Logo><img src={logo} alt="logo" /></Logo>
            <h1 className='text-black'>Log into AgroDig</h1>
            <div className="min-w-[200px] w-4/5 flex flex-col justify-center">
              <label className="text-black ml-2" htmlFor="">Email</label>
              <input className="w-full border border-white bg-white/30 focus:border-blue-700 focus:ring-1 focus:ring-sky-500 mt-1 h-[40px] px-2 rounded-md outline-none text-black
                 bg-transparen " type="text" placeholder="Enter your email"
                onChange={(e)=> setData({...data, email: e.target.value})} required/>
            </div>
            <div className="min-w-[200px] w-4/5 flex mt-4 flex-col justify-center">
              <label className="text-black ml-2" htmlFor="">Password</label>
              <input className="w-full border border-white bg-white/30 focus:border-blue-700 focus:ring-1 focus:ring-sky-500 mt-1 h-[40px] px-2 rounded-md outline-none text-black
                 bg-transparen "  placeholder="Enter your passoward"
                 type={values.showPassword ? "text" : "password"}
                 onChange={handlePasswordChange("password")}
                 value={values.password} required/>
            </div>
            <div className="min-w-[200px] w-4/5 flex mt-2 items-center">
              <Checkbox {...label} onClick={handleShowPassword}
                onMouseDown={handleMouseDownPassword} type="checkbox" />
              <label className='text-black'>Show password</label>
            </div>
            <p className="text-center mt-2 text-yellow-600">{status}</p>
            <div className={`${progress?"bg-blue-200 cursor-not-allowed":"bg-blue-600"} rounded-md mt-2 p-2 px-5 flex w-4/5 cursor-pointer`}>
              {/* {progress? <CircularProgress /> :( */}
              <input className="cursor-pointer w-full" type='submit' value='Login' />
              {/* )} */}
            </div>
            <div className="text-black mt-2">
              <a href="./">Forgot your password?</a>
            </div>
            <div className="flex my-2 w-full text-black items-center justify-center">
              <p>Don't have an account?</p>
              <Link to='/signup' className='text-blue-600 ml-2'>Sign Up</Link>
            </div>
          </Form>
        </Main>
      </Body>
    </>
  );
}

export default Login;
