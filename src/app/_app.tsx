import './globals.css';
import type { AppProps } from 'next/app';
import Head from "next/head";
import Navbar from './Navbar'
import { SessionProvider } from 'next-auth/react';

export default function App({ Component, pageProps}: AppProps) {
    return (
        <>
            <head>
                <Navbar/>
                <title>SendIt</title>
                <meta name = 'viewport' content='width=device-width, initial-scale=1' />
                <link rel="icon" href="src/app/logo.png"/>
                <meta name='description' content='Code assignment & submission platform with plaigarism check' />
            </head>
            <SessionProvider>
                <Component {...pageProps} />
            </SessionProvider>
            
        </>
    );
}


