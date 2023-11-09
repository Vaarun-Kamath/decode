// @ts-nocheck
// @ts-ignore
// use client
"use client";

import { signIn, useSession, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';
import React from 'react';
import "../globals.css";
import { sign } from 'crypto';
import { useRouter } from 'next/navigation';

const Login = ()=>{

  const {data} = useSession();
  const {push} = useRouter();

  const [srn, setSrn] = useState();
  const [first, setFirst] = useState();
  const [last, setLast] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [section, setSection] = useState();
  const [semester, setSemester] = useState();

  if(data == null || data == undefined){
    return (
      <section className="min-h-screen min-w-full flex gap-2 flex-col bg-neutral-900 text-theme1" id={"login-container"}>
        <div className="flex min-h-screen pr-14 pl-14 mr-10 ml-10 justify-end items-center">
          <div className="bg-gray-800 rounded-lg flex flex-col p-7 h-fit gap-3">
            <h1 className="text-2xl">Login</h1>
            {/* Username input */}
            <div className="flex flex-col gap-1">
              <label htmlFor="username">Username</label>
              <input className='h-10 p-2 rounded-sm outline-none text-black' type="text" id="username" name="username" placeholder="Username" />
            </div>
  
            {/* Password input */}
            <div className="flex flex-col gap-1">
              <label htmlFor="password">Password</label>
                <input className='h-10 p-2 rounded-sm outline-none text-black' type="password" id="password" name="password" placeholder="Password"
                />
            </div>
            <div className="text-sm">
              <a href="#forgot-password">Forgot Password?</a>
            </div>
            {/* Submit button */}
            <button type="submit" className="bg-neutral-800 p-2 rounded-sm" onClick={()=> signOut}>Log in</button>
  
            {/* Buttons for signing in with GitHub and Google */}
            <div className="flex flex-row gap-2">
              <button className="bg-neutral-800 p-2 rounded-sm" onClick={() => signIn("github")}>Sign in with GitHub</button>
              <button className="bg-neutral-800 p-2 rounded-sm" onClick={() => signIn("google")}>Sign in with Google</button>
              <button className="bg-neutral-800 p-2 rounded-sm" onClick={() => signOut("github")}>Sign Out</button>
            </div>
          </div>
        </div>
        {/* Display the CreateAccountForm by default */}
        {/* <CreateAccountForm />   */}
      </section>
    );
  }else if (data != null || data != undefined){
    const userInDb = true // Get user from sql
    if(userInDb){
      push('/classrooms');
    }else{
      return (
        <div className='flex justify-center items-center min-h-screen flex-col gap-5 '>
          <div className='bg-gray-800 p-10 w-1/4 flex flex-col justify-between items-center gap-10'>
            <h2>To continue please fill this form</h2>
            <div className='flex flex-col gap-5 w-full'>
              {/* SRN input */}
              <div className='flex flex-col'>
                <label htmlFor="srn">SRN</label>
                <input onChange={(event)=>{setSrn(event.target.value)}} className='text-black outline-none h-10 rounded-sm p-2' type="text" id="srn" name="srn" placeholder="Enter your SRN"/>
              </div>
        
              {/* First Name input */}
              <div className='flex flex-col'>
                <label htmlFor="firstName">First Name</label>
                <input onChange={(event)=>{setFirst(event.target.value)}} className='text-black outline-none h-10 rounded-sm p-2' type="text" id="firstName" name="firstName" placeholder="Enter your first name" />
              </div>
        
              {/* Last Name input */}
              <div className='flex flex-col'>
                <label htmlFor="lastName">Last Name</label>
                <input onChange={(event)=>{setLast(event.target.value)}} className='text-black outline-none h-10 rounded-sm p-2' type="text" id="lastName" name="lastName" placeholder="Enter your last name" />
              </div>
        
              {/* Email input */}
              <div className='flex flex-col'>
                <label htmlFor="email">Email</label>
                <input onChange={(event)=>{setEmail(event.target.value)}} className='text-black outline-none h-10 rounded-sm p-2' type="email" id="email" name="email" placeholder="Enter your email" />
              </div>
        
              {/* Password input */}
              <div className='flex flex-col'>
                <label htmlFor="password">Password</label>
                <input onChange={(event)=>{setPassword(event.target.value)}} className='text-black outline-none h-10 rounded-sm p-2' type="password" id="newpassword" name="password" placeholder="Enter your password" />
              </div>
        
              {/* Section input */}
              <div className='flex flex-col'>
                <label htmlFor="section">Section</label>
                <input onChange={(event)=>{setSection(event.target.value)}} className='text-black outline-none h-10 rounded-sm p-2' type="text" id="section" name="section" placeholder="Enter your section" />
              </div>
        
              {/* Semester input */}
              <div className='flex flex-col'>
                <label htmlFor="semester">Semester</label>
                <input onChange={(event)=>{setSemester(event.target.value)}} className='text-black outline-none h-10 rounded-sm p-2' type="text" id="semester" name="semester" placeholder="Enter your semester" />
              </div>
        
              {/* Submit button */}
              <button className='bg-yellow-400 text-black rounded-sm h-10' type="submit" /*onClick={submitregistration}*/>Create Account</button>
            </div>
          </div>
        </div>
      );
    }
  }
};

export default Login;