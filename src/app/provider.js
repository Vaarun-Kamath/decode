"use client";

import { SessionProvider } from "next-auth/react";

export const NextAuthProvider = ({ children }) => {
    return <SessionProvider>{children}</SessionProvider>
};


import { CookiesProvider } from 'next-client-cookies';

export const ClientCookiesProvider = ({props}) => {
    return <CookiesProvider>{props}</CookiesProvider>
};