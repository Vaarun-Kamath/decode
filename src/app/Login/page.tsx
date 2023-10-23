import Navbar from "@/components/Navbar";
import LoginButton from '@/components/LoginButton'
import React from "react";


function Login() {
	return (
		<section className="min-h-screen min-w-full flex gap-2 flex-col bg-neutral-900 text-theme1">
			<Navbar />
			<div className="flex flex-col items-center justify-center align-middle flex-1">
				<h1>Login to get started</h1>
				<LoginButton />
			</div>
		</section>
	);
}

export default Login;
