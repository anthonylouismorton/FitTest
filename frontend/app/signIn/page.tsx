"use client"
import React, { useState } from 'react';
import { User } from '../interfaces';
import { userApi } from '../api/user/route';
import { signIn } from 'next-auth/react';

export default function Login() {
  const [validation, setValidation] = useState({
    passwordMatch: false,
    userNotFound: false,
    incorrectPassword: false
  });
  const [showRegister, setShowRegister] = useState<Boolean>(false);
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [ loginUser, setLoginUser] = useState<User>({
    username: undefined,
    password: undefined
  });
  const [ registerUser, setRegisterUser] = useState<User>({
    email: undefined,
    firstname: undefined,
    lastname: undefined,
    password: undefined,
  });

  const handleRegisterUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.currentTarget;

    if(name === "confirmpassword"){
      setConfirmPassword(value)
    }
    else{
      setRegisterUser({
        ...registerUser,
        [name]: value
      });
    }
  };

  const handleLoginUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.currentTarget;
    setLoginUser({
      ...loginUser,
      [name]: value
    });
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // const userValidated = await validateApi.validateUser(loginUser);
      // setValidation({incorrectPassword: false, passwordMatch: false, userNotFound: false })
      console.log('here')
      await signIn("credentials", {
        username: loginUser.username,
        password: loginUser.password,
        redirect: true,
        callbackUrl: "/"
      })
      
    } catch (error) {
      if (typeof error === 'object') {
        const response = error as { response: any };
        if ('response' in response) {
          if(response.response.data.detail === 'Invalid User'){
            setValidation({incorrectPassword: false, passwordMatch: false, userNotFound: true })
          }
          else if(response.response.data.detail === 'Incorrect Password'){
            setValidation({incorrectPassword: true, passwordMatch: false, userNotFound: false })
          }
        }
      }
      else{
        console.log(error)
      }
    }
    
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if(registerUser?.password === confirmPassword) {
        setValidation({ ...validation, passwordMatch: false })
        await userApi.createUserData(registerUser)
      }
      else{
        setValidation({ ...validation, passwordMatch: true })
      }
    } 
    catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      {!showRegister ? (
        <form onSubmit={handleLogin}>
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Login
            </h2>
            <div className="mb-4">
            {validation.userNotFound && (
              <p className="text-red-500 text-xs mt-1">Please check username or register below</p>
            )}
              <label className="block text-md font-medium text-black">Username</label>
              <input
                type="text"
                name="username"
                onChange={handleLoginUser}
                className="p-2 block w-full rounded-md shadow border-gray-300"
                required
              />
            </div>
            <div className="mb-4">
            {validation.incorrectPassword && (
              <p className="text-red-500 text-xs mt-1">Incorrect password</p>
            )}
              <label className="block text-md font-medium text-black">Password</label>
              <input
                type="password"
                name="password"
                onChange={handleLoginUser}
                className="p-2 block w-full rounded-md shadow border-gray-300"
                required
              />
            </div>
            <div className='flex justify-between'>
              <button type='submit' className='bg-blue-500 p-2 rounded text-white'>
                Login
              </button>
              <button className='bg-blue-500 p-2 rounded text-white' onClick={() => setShowRegister(true)}>
                Register
              </button>
            </div>
          </div>
        </form>
      ) : (
        <form onSubmit={handleRegister}>
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Register
            </h2>
            <div className="mb-4">
              <label className="block text-md font-medium text-black">First name</label>
              <input
                type="text"
                name="firstname"
                onChange={handleRegisterUser}
                className="p-2 block w-full rounded-md shadow border-gray-300"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-md font-medium text-black">Last Name</label>
              <input
                type="text"
                name="lastname"
                onChange={handleRegisterUser}
                className="p-2 block w-full rounded-md shadow border-gray-300"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-md font-medium text-black">Email</label>
              <input
                type="text"
                name="email"
                onChange={handleRegisterUser}
                className="p-2 block w-full rounded-md shadow border-gray-300"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-md font-medium text-black">Password</label>
              <input
                type="password"
                name="password"
                onChange={handleRegisterUser}
                className="p-2 block w-full rounded-md shadow border-gray-300"
                required
              />
            </div>
            {validation.passwordMatch && (
              <p className="text-red-500 text-xs mt-1">Password does not match</p>
            )}
            <div className="mb-4">
              <label className="block text-md font-medium text-black">Confirm Password</label>
              <input
                type="password"
                name="confirmpassword"
                onChange={handleRegisterUser}
                className="p-2 block w-full rounded-md shadow border-gray-300"
                required
              />
            </div>
            <div className='flex justify-between'>
              <button className='bg-blue-500 p-2 rounded text-white'>
                Register
              </button>
              <button className='bg-blue-500 p-2 rounded text-white' onClick={() => setShowRegister(false)}>
                Cancel
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
