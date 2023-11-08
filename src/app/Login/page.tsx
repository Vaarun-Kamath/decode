// @ts-nocheck
// @ts-ignore
// use client
"use client";

import { signIn, useSession, signOut } from 'next-auth/react';
import React from 'react';
import "../globals.css";
import { sign } from 'crypto';

const CreateAccountForm: React.FC = () => {
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


const Login: React.FC = () => {

    const {data: session} = useSession()

  // const handleRegister = () => {
  //   window.open('about:blank', '_blank');
  // };

  //const { data: session, status } = useSession();

  // if (status == "authenticated") {
  //   return (
  //     <div>
  //       <button onClick={() => signOut()}>Sign Out</button>
  //     </div>
  //   )
  // }

  const handleCreateAccountClick = () => {
    document.getElementById('create-account-form').style.display = 'block';
    document.getElementById('login-container').style.display = 'none';
  };

    return (
      <section className="min-h-screen min-w-full flex gap-2 flex-col bg-neutral-900 text-theme1">
        <div className="login-container" id="login-container">
          <div className="bg-gray-800 rounded-lg p-10">
            <h1 className="login-text">Login</h1>
            {/* Username input */}
            <div className="input-group">
              <label htmlFor="username">Username</label>
              <input type="text" id="username" name="username" placeholder="Username" />
            </div>
  
            {/* Password input */}
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <div className="password-input">
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                />
              </div>
            </div>
            <div className="forgot-password">
              <a href="#forgot-password">Forgot Password?</a>
            </div>
            <br/>
            {/* Submit button */}
            <button type="submit" className="login-button" onClick={()=> signOut}>Log in</button>
  
            {/* Buttons for signing in with GitHub and Google */}
            <div className="oauth-buttons">
              <button className="github-button" onClick={() => signIn("github")}>Sign in with GitHub</button>
              <button className="google-button" onClick={() => signIn("google")}>Sign in with Google</button>
            </div>
            <br/>
            {/* Create Account link */}
            <div className="create-account" style={{ display: 'flex', alignItems: "center" }}>
              <h3 style={{ marginRight: '10px', alignContent: "center"}}>Not Registered?</h3>
              <button onClick={handleCreateAccountClick}>Create Account</button>
            </div>
          </div>
        </div>
        {/* Display the CreateAccountForm by default */}
        <CreateAccountForm />  
      </section>
    );
};

export const __client = true;
export default Login; CreateAccountForm;
