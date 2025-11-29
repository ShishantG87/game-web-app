import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'


function App() {
  

  return (
    <div className="min-h-screen  bg-gray-900 text-white">
      <div className=" bg-white p-8 flex flex-col items-center text-black font-mono text-2xl">  {/*This is a comment, this is the top white bar */}
        <p className="text-black">Currently Building... Just a template with functions for now..</p>
      </div>
      <div className="flex flex-col items-center justify-center mt-40">
      <form className="flex flex-col  bg-white w-1/3  p-5 rounded-lg text-black 
       text-2xl shadow-[0_0_30px_rgba(255,255,255,0.2)]">
        <h2 className="text-2xl font-bold text-black mb-10 font-bold text-center">Form Title</h2>
        <div className="flex flex-col space-y-1 font-mono">
          <label className="text-black mb-1 ">
            Email
          </label>
          <input type="email" className="p-2 rounded bg-gray-700 text-white outline-none mb-10 w-full " placeholder='sma@gmail.com'/>
        </div>
        <div className="flex flex-col space-y-1 font-mono">
          <label className="text-black mb-1">
            Password
          </label>
          <input type="password" className="p-2 rounded bg-gray-700 text-white outline-none mb-10 w-full " placeholder='password'/>
        </div>
        <div className="flex justify-center">
        <button type="submit" className="w-40 bg-gray-700 hover:bg-red-700 text-white font-medium p-3 rounded-lg transition mb-10">
            Login
        </button>
          </div>
      </form>

      </div>
      </div>
  );
}

export default App
