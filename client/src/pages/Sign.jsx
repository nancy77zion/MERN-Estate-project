//import React from 'react'
import { Link } from "react-router-dom"


const Sign = () => {
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className="text-2xl text-center font-semibold my-7">sign Up</h1>
      <form className='flex flex-col gap-4'>
        <input type="text" name="" id="username" placeholder='username' className='border p-3' />
        <input type="email" name="" id="email" placeholder='email' className='border p-3' />
        <input type="password" name="" id="password" placeholder='password' className='border p-3' />
        <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>Sign up</button>
      </form>
      <div className="flex gap-2 mt-5">
        <p className="">Already have an account?</p>
        <Link to={"/sign-in"}>
          <span className="text-blue-700">sign in</span>
        </Link>
      </div>
    </div>
  )
}

export default Sign