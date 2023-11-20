// @ts-nocheck
// @ts-ignore
// use client
"use client";

import { signIn, useSession, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';
import React from 'react';
import "../globals.css";
import { sign } from 'crypto';
import cookie from 'js-cookie'
import { useRouter } from 'next/navigation';
import axios from 'axios';
// import { getServerSideProps } from 'next/dist/build/templates/pages';

const Login = ()=>{

  var {data} = useSession();

  if(data == null){
    if(cookie.get('email') != undefined){
      data = {
        user:{
          email: cookie.get('email'),
          userRole: cookie.get('userRole')
        }
      };
    }
  }
  

  // var data = null;
  const {push} = useRouter();
  // var userInDb = false


  const [srn, setSrn] = useState();
  const [first, setFirst] = useState();
  const [last, setLast] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [teacherEmail, setTeacherEmail] = useState();
  const [teacherPassword, setTeacherPassword] = useState();
  const [section, setSection] = useState();
  const [semester, setSemester] = useState();
  const [userInDb,setUserInDb] = useState(false);

  const submitRegistration = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/create-new-student', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          srn,
          first,
          last,
          email,
          password,
          section,
          semester,
        }),
      });
  
      if (response.ok) {
        console.log('Registration successful', data);
        push('/classrooms');
      } else {
        console.error('Registration failed');
        // Handle failure
        alert("Registration failed. Please try again later.")
      }
    } catch (error) {
      console.error('Error submitting registration:', error);
      // Handle failure
      alert("An error occurred. Please try again later.")
    }
  };  

  const loginWithMail = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/studentExists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          loginMethod: "Normal",
        }),
      });

      var result = await response.json();
      console.log("result",result)

      if (result[0].userRole != undefined) {
        cookie.set('userRole', result[0].userRole, {expires:1/24})
        cookie.set('email', result[0].email, {expires:1/24})
        console.log("Result: ", result[0]);
        push('/classrooms');
        // userInDb = true
      } else {
        // User does not exist, show additional details form
        // You can set a flag or state here to conditionally render the form
        setUserInDb(false);
        alert("Invalid email or password. Please try again.")
      }
    } catch (error) {
      console.error('Error logging in:', error);
      // Handle failure
      alert("An error occurred. Please try again later.")
    }
  };

  useEffect(() => {
    const checkUserInDatabase = async () => {
      console.log("data", data)
      if (data) {
        const response = await fetch('http://localhost:4000/api/studentExists', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email:data.user.email,
            password:undefined,
            loginMethod: "NextAuth",
          }),
        });

        const result = await response.json();

        // console.log("RES:L ", result)

        if (result && result.length > 0) {
          // User exists in the database, redirect to the appropriate page
          // push('/classrooms');
          console.log("SETTING TO TRUE")
          setUserInDb(true)
          // userInDb = true
        } else {
          console.log("SETTING TO FALSE")
          setUserInDb(false)
          // userInDb = false
          // User does not exist, show additional details form
          // You can set a flag or state here to conditionally render the form
        }
        console.log(" :: ",userInDb);
      }
    };
    checkUserInDatabase();
  }, [data]);

  useEffect(()=>{
    console.log("USER CHANGED")
  },[userInDb])

  const teacherLogin = async ()=>{
    console.log("Email: ", teacherEmail)
    console.log("Password: ", teacherPassword)
    try {
      const response = await fetch('http://localhost:4000/api/teacherExists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: teacherEmail,
          password: teacherPassword,
          loginMethod: "Normal",
        })
      });

      console.log("response: ",response)
      if (response.ok){
        const result = await response.json();
        console.log("Result: ", result[0]);
        cookie.set('userRole', result[0].userRole, {expires:1/24})
        cookie.set('email', result[0].email, {expires:1/24})
        push('/classrooms')
      }else{
        console.error('Server responded with an error:', response.status);
        alert("An error occurred. Please try again later.");
      }

      // const result = await response.json();

      // console.log("res[0]: ",result[0])

      // if (result && result.length > 0) {  
      //   // User exists in the database, redirect to the appropriate page
      //   // Add first name and email to data object
      //   data = {
      //     ...data,
      //     name: result[0].first_name,
      //     email: result[0].email,
      //   }
      //   console.log("recData: ",data)

      // } else {
      //   // User does not exist, show additional details form
      //   // You can set a flag or state here to conditionally render the form
      //   // setUserInDb(false);
      //   alert("Invalid email or password. Please try again.")
      // }
    } catch (error) {
      console.error('Error logging in:', error);
      // Handle failure
      alert("An error occurred. Please try again later.")
    }

  }
  if(data == null || data == undefined){
    return (
      <section className="min-h-screen min-w-full flex gap-2 flex-col bg-neutral-900 text-theme1" id={"login-container"}>
        <div className="flex h-screen pr-14 pl-14 mr-10 ml-10 justify-between items-center">
          
          
          {/* STUDNET LOGIN */}
          <div className="bg-gray-800 rounded-lg flex flex-col p-7 h-1/2 gap-3 w-1/3 justify-center">
            <h1 className="text-2xl">Student Login</h1>
            {/* Email input */}
            <div className="flex flex-col gap-1">
              <label htmlFor="email">Email</label>
              <input onChange={(event)=>{setEmail(event.target.value)}} className='h-10 p-2 rounded-sm outline-none text-black' id="email" name="email" placeholder="Email" />
            </div>
  
            {/* Password input */}
            <div className="flex flex-col gap-1">
              <label htmlFor="password">Password</label>
                <input onChange={(event)=>{setPassword(event.target.value)}} className='h-10 p-2 rounded-sm outline-none text-black' type="password" id="password" name="password" placeholder="Password"
                />
            </div>
            <div className="text-sm">
              <a href="#forgot-password">Forgot Password?</a>
            </div>
            {/* Submit button */}
            <button type="submit" className="bg-neutral-800 p-2 rounded-sm" onClick={loginWithMail}>Log in</button>
  
            {/* Buttons for signing in with GitHub and Google */}
            <div className="flex flex-row gap-2">
              <button className="bg-neutral-800 p-2 rounded-sm" onClick={() => signIn("github")}>Sign in with GitHub</button>
              <button className="bg-neutral-800 p-2 rounded-sm" onClick={() => signIn("google")}>Sign in with Google</button>
              <button className="bg-neutral-800 p-2 rounded-sm" onClick={() => signOut("github")}>Sign Out</button>
            </div>
          </div>


          {/* TEACHER LOGIN */}
          <div className="bg-gray-800 rounded-lg flex flex-col p-7 h-1/2 gap-3 w-1/3 justify-center">
            <h1 className="text-2xl">Teacher Login</h1>
            {/* Email input */}
            <div className="flex flex-col gap-1">
              <label htmlFor="email">Email</label>
              <input onChange={(event)=>{setTeacherEmail(event.target.value)}} className='h-10 p-2 rounded-sm outline-none text-black' id="email" name="email" placeholder="Email" />
            </div>
  
            {/* Password input */}
            <div className="flex flex-col gap-1">
              <label htmlFor="password">Password</label>
                <input onChange={(event)=>{setTeacherPassword(event.target.value)}} className='h-10 p-2 rounded-sm outline-none text-black' type="password" id="password" name="password" placeholder="Password"
                />
            </div>
            <div className="text-sm">
              <a href="#forgot-password">Forgot Password?</a>
            </div>
            {/* Submit button */}
            <button type="submit" className="bg-neutral-800 p-2 rounded-sm" onClick={teacherLogin}>Log in</button>
  
            {/* Buttons for signing in with GitHub and Google */}
            {/* <div className="flex flex-row gap-2">
              <button className="bg-neutral-800 p-2 rounded-sm" onClick={() => signIn("github")}>Sign in with GitHub</button>
              <button className="bg-neutral-800 p-2 rounded-sm" onClick={() => signIn("google")}>Sign in with Google</button>
              <button className="bg-neutral-800 p-2 rounded-sm" onClick={() => signOut("github")}>Sign Out</button>
            </div> */}
          </div>
        </div>
        {/* Display the CreateAccountForm by default */}
        {/* <CreateAccountForm />   */}
      </section>
    );
  }else if (data != null || data != undefined){
    // console.log(data);
     // Get user from sql
    console.log("ORANGE", data)
    // console.log("APPLE", studentExists);
    
    if(userInDb){
      console.log("User exists in database", data);
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
                <input onChange={(event)=>{setSrn(event.target.value)}} className='text-black outline-none h-10 rounded-sm p-2' id="srn" name="srn" placeholder="Enter your SRN"/>
              </div>
        
              {/* First Name input */}
              <div className='flex flex-col'>
                <label htmlFor="firstName">First Name</label>
                <input onChange={(event)=>{setFirst(event.target.value)}} className='text-black outline-none h-10 rounded-sm p-2' id="firstName" name="firstName" placeholder="Enter your first name" />
              </div>
        
              {/* Last Name input */}
              <div className='flex flex-col'>
                <label htmlFor="lastName">Last Name</label>
                <input onChange={(event)=>{setLast(event.target.value)}} className='text-black outline-none h-10 rounded-sm p-2' id="lastName" name="lastName" placeholder="Enter your last name" />
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
                <input onChange={(event)=>{setSection(event.target.value)}} className='text-black outline-none h-10 rounded-sm p-2' id="section" name="section" placeholder="Enter your section" />
              </div>
        
              {/* Semester input */}
              <div className='flex flex-col'>
                <label htmlFor="semester">Semester</label>
                <input onChange={(event)=>{setSemester(event.target.value)}} className='text-black outline-none h-10 rounded-sm p-2' id="semester" name="semester" placeholder="Enter your semester" />
              </div>
        
              {/* Submit button */}
              <button className='bg-yellow-400 text-black rounded-sm h-10' type="submit" onClick={submitRegistration}>Create Account</button>
            </div>
          </div>
        </div>
      );
    }
  }
};

export default Login;
