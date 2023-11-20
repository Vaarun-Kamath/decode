// 'use client';

import React, { useEffect } from 'react';
import { signIn, useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import cookie from 'js-cookie';

function ProfileIcon() {
  const { push } = useRouter();
  const { data: session, status, update } = useSession();

  useEffect(() => {
    // Check the session status after the initial render on the client side
    if (status == 'authenticated') {
      // Handle authenticated status
      console.log('User is authenticated');
    }
  }, [status]);

  const logout = () => {
    cookie.remove('userRole');
    cookie.remove('email');
    signOut('github');
    push('/login');
  };

  if (status === 'authenticated') {
    return (
      <div className='flex gap-5'>
        <img src={'https://placehold.co/40x40'} width={40} height={40} className='rounded-full' />
        <button className='z-10' onClick={() => signOut('github')}>
          Sign Out
        </button>
      </div>
    );
  } else if (cookie.get('userRole') !== undefined) {
    return (
      <div className='flex gap-5'>
        <img src={'https://placehold.co/40x40'} width={40} height={40} className='rounded-full' />
        <button className='z-10' onClick={logout}>
          Sign Out
        </button>
      </div>
    );
  } else {
    return <button className='z-10' onClick={() => push('/login')}>
      Sign In
    </button>;
  }
}

export default ProfileIcon;
