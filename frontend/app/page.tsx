import React from 'react'
import { OPTIONS } from './api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';

export default async function Home() {
  const session = await getServerSession(OPTIONS);

  return (
    <>
      {session ? (
        <h2>hello</h2>

      ) : (
        <h2>login</h2>
      )
    }
    </>
  );
  
}
