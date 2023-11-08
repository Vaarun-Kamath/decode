import React from 'react';
import Link from "next/link";

export default function Navbar() {
return (
	<nav className="flex items-center justify-between
	fixed left-0 right -0 px-8 h-12 bg-neutral-900 text-theme1">
		<Link className = "font-bold" href={"/"}>SendIt</Link>
	</nav>
)
}