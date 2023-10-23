"use client"
import React, { useState } from 'react';

export default function Login() {
  const [showRegister, setShowRegister] = useState(false);

  return (
    <div>
      {!showRegister ? (
        <div>
          <h2>
            login
          </h2>
          <label>Email</label>
          <input
            type="text"
            name="email"
            className="mt-1 p-2 block w-full rounded-md shadow border-gray-300"
            required
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            className="mt-1 p-2 block w-full rounded-md shadow border-gray-300"
            required
          />

          <div className='flex justify-between pt-2'>
            <button className='bg-blue-500 p-2 rounded text-white'>
              Login
            </button>
            <button className='bg-blue-500 p-2 rounded text-white' onClick={() => setShowRegister(true)}>
              Register
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h2>
            Register
          </h2>
        </div>
      )}
    </div>
  );
}
