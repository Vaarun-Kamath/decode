import Navbar from '@/components/Navbar'
import React from 'react'

function createClassroom() {
  return (
    <section>
      <Navbar />
      <div className='flex h-screen -mt-16 justify-center items-center bg-theme1'>
        <div className='bg-red-500 h-1/2 w-96 flex flex-row'>

        </div>
      </div>
    </section>
  )
}

export default createClassroom