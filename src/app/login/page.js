// @ts-nocheck
// @ts-ignore
// use client
"use client";

import { signIn, useSession, signOut } from 'next-auth/react';
import React from 'react';
import { FC } from 'react';
import "../globals.css";
import { sign } from 'crypto';
import { useRouter } from 'next/navigation';

const CreateAccountForm = () => {
  // const submitregistration = () => {
  //   document.getElementById(<Login/>).style.display = 'block';
  //   document.getElementById('register').style.display = 'none';
  // };


  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <form id="create-account-form" className="hideform" style={{ width: '30%' }}>
      <br/>
      <br/>
      <h2>Create Account</h2>

      {/* SRN input */}
      <div className="input-group">
        <label htmlFor="srn">SRN</label>
        <input type="text" id="srn" name="srn" placeholder="Enter your SRN"/>
      </div>

      {/* First Name input */}
      <div className="input-group">
        <label htmlFor="firstName">First Name</label>
        <input type="text" id="firstName" name="firstName" placeholder="Enter your first name" />
      </div>

      {/* Last Name input */}
      <div className="input-group">
        <label htmlFor="lastName">Last Name</label>
        <input type="text" id="lastName" name="lastName" placeholder="Enter your last name" />
      </div>

      {/* Email input */}
      <div className="input-group">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" placeholder="Enter your email" />
      </div>

      {/* Password input */}
      <div className="input-group">
        <label htmlFor="password">Password</label>
        <input type="password" id="newpassword" name="password" placeholder="Enter your password" />
      </div>

      {/* Section input */}
      <div className="input-group">
        <label htmlFor="section">Section</label>
        <input type="text" id="section" name="section" placeholder="Enter your section" />
      </div>

      {/* Semester input */}
      <div className="input-group">
        <label htmlFor="semester">Semester</label>
        <input type="text" id="semester" name="semester" placeholder="Enter your semester" />
      </div>

      {/* Submit button */}
      <button className = "register" type="submit" /*onClick={submitregistration}*/>Create Account</button>
    </form>
    </div>
  );
};


const Login = ()=>{

  const {data} = useSession();
  const {push} = useRouter();

  const handleCreateAccountClick = () => {
    document.getElementById('create-account-form').style.display = 'block';
    document.getElementById('login-container').style.display = 'none';
  };

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
            </div>
            <br/>
            {/* Create Account link */}
            <div className="create-account" style={{ display: 'flex', alignItems: "center" }}>
              <h3 style={{ marginRight: '10px', alignContent: "center"}}>Not Registered?</h3>
              <button onClick={handleCreateAccountClick} className='text-blue-400'>Create Account</button>
            </div>
          </div>
        </div>
        {/* Display the CreateAccountForm by default */}
        <CreateAccountForm />  
      </section>
    );
  }else if (data != null || data != undefined){
    push('/classrooms');
  }
  
};

// export const __client = true;
export default Login;
