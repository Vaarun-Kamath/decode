import Link from 'next/link'
import React from 'react'
import ProfileIcon from './ProfileIcon'

function Navbar() {
	return (
		<nav className='bg-theme1 w-full h-14 pl-5 pr-10 flex items-center flex-row justify-between'>
			<Link href={'/'} className='font-bold'>SendIt</Link>
			<ProfileIcon />
			{/* Navbar */}
			{/* <div>
				<button className=''>Sign In</button>
			</div> */}
		</nav>
	)
}

export default Navbar