import Link from 'next/link'
import React from 'react'
import ProfileIcon from './ProfileIcon'

function Navbar() {
	return (
		<nav className='bg-theme1 w-full h-14 pl-5 pr-10 flex items-center flex-row justify-between z-10'>
			<div className='flex flex-row gap-10 items-center'>
				<Link href={'/'} className='font-bold text-lg'>SendIt</Link>

				<Link className=' rounded-md p-2 text-white font-semibold text-sm' href={'/classrooms/create-classroom'}>Create Classroom</Link>
				<Link className=' rounded-md p-2 text-white font-semibold text-sm' href={'/classrooms/join-classroom'}>Join Classroom</Link>
				<Link className=' rounded-md p-2 text-white font-semibold text-sm' href={'/assignment/create-assignment'}>Create assignment</Link>
				<Link className=' rounded-md p-2 text-white font-semibold text-sm' href={'/assignment/create-task'}>Create task</Link>
			</div>
			<div className='flex flex-row gap-10 items-center'>
				<Link href={'/classrooms'} className='font-bold text-sm '>My classrooms</Link>
				<ProfileIcon />
			</div>
			{/* Navbar */}
			{/* <div>
				<button className=''>Sign In</button>
			</div> */}
		</nav>
	)
}

export default Navbar