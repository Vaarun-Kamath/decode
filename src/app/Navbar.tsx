"use client";
import React from 'react';
import Link from "next/link";
import { signIn, useSession, signOut } from 'next-auth/react';

export default function Navbar() {
	const {data} = useSession();
	return (
		<nav className="flex items-center justify-between
		fixed left-0 right -0 px-8 h-12 bg-neutral-900 text-theme1">
			<Link className = "font-bold" href={"/"}>SendIt</Link>
			<button className="bg-neutral-800 p-2 rounded-sm" onClick={() => signOut('github')}>Sign Out of GitHub</button>
		</nav>
	)
}