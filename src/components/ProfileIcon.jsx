'use client';

import React from 'react'
import {signIn, useSession, signOut} from 'next-auth/react'
import Image from 'next/image';
import { useRouter } from 'next/navigation';

function ProfileIcon() {

    const {push} = useRouter();

    const {data: session, status } = useSession();
    
    if(status == 'authenticated') {
        return (
            <div className='flex gap-5'>
                <Image src = {session.user.image} width={40} height={40} className='rounded-full'/>
                <button className='z-10' onClick={()=> signOut('github')}>Sign Out </button>
            </div>
        )
    }

    return <button className='z-10' onClick={push('/login')}>Sign In</button>
}

export default ProfileIcon