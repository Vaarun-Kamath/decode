'use client'
import Navbar from '@/components/Navbar'
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import cookie from 'js-cookie'

function joinClassroom() {

  const [classCode, setClassCode] = useState('')
  var {data} = useSession();
  const {push} = useRouter();

  const updateClassCode = (event)=>{
    setClassCode(event.target.value)
  }

  if(data == null){
		if(cookie.get('email') != undefined){
			data = {
				user:{
				email: cookie.get('email'),
				userRole: cookie.get('userRole')
				}
			};
		}else{
			push('/login')
		}
	}

  useEffect(()=>{
    console.log(classCode)
  }, [classCode])

  // Check if classroom exists
  const checkCode = async () => {
		try {
			const response = await fetch('http://localhost:4000/api/check-class-code', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					classroomCode: classCode,
				}),
			});
			if (!response.ok) {
				console.log("Error fetching classrooms. Please try again later.");
			} else {
				const resultsJSON = await response.json();
        const results = resultsJSON["data"];

        if(results.length < 1){
          return null;
        }

				return results;
			}
		} catch (error) {
			console.error('Error fetching data:', error);
			return null;
		}
	};

  // Join classroom
  const joinClass = async () => {
    try {
      const results = await checkCode();

      if(results == null){
        console.log("No classroom found with this code.")
        return;
      }

      if(data == null){
        console.log("No user logged in.")
        return;
      }

      const response = await fetch('http://localhost:4000/api/student-join-classroom', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.user.email,
          classroomID: results[0]["classroom_id"],
        }),
      });
      if (!response.ok) {
        console.log("Error joining classrooms. Please try again later.");
      } else {
        const resultsJSON = await response.json();
        const results = resultsJSON["data"];

        if(results.length < 1){
          return null;
        }
        // Redirect to classroom page
        push(`/classrooms`);
        return results;
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
  };

  return (
    <section className='min-h-screen flex flex-col'>
        <Navbar/>
        <div className='flex h-screen -mt-16 justify-center items-center bg-theme1'>
            <div className='rounded-md h-40 w-1/2 flex flex-row justify-between items-center pt-15 pb-15 pl-10 pr-10 gap-2'>
                <input onChange={updateClassCode} placeholder='Enter classroom code' className='text-white outline-none flex-1 h-10 rounded-sm p-2 bg-transparent border-2 border-white border-opacity-40'></input>
                <button className='bg-theme3 text-black p-3 w-32 h-10 flex justify-center items-center rounded-md text-lg font-semibold' onClick={
                  async ()=> {
                    await joinClass();
                  }}>Join</button>
            </div>
        </div>
    </section>
  )
}

export default joinClassroom