'use client'
import Navbar from '@/components/Navbar'
import React, { useEffect, useState } from 'react'

function joinClassroom() {

  const [classCode, setClassCode] = useState('')

  const updateClassCode = (event)=>{
    setClassCode(event.target.value)
  }

  useEffect(()=>{
    console.log(classCode)
  }, [classCode])


  

  return (
    <section className='min-h-screen flex flex-col'>
        <Navbar/>
        <div className='flex h-screen -mt-16 justify-center items-center bg-theme1'>
            <div className='rounded-md h-40 w-1/2 flex flex-row justify-between items-center pt-15 pb-15 pl-10 pr-10 gap-2'>
                <input onChange={updateClassCode} placeholder='Enter classroom code' className='text-white outline-none flex-1 h-10 rounded-sm p-2 bg-transparent border-2 border-white border-opacity-40'></input>
                <button className='bg-theme3 text-black p-3 w-32 h-10 flex justify-center items-center rounded-md text-lg font-semibold'>Join</button>
            </div>
        </div>
    </section>
  )
}

export default joinClassroom