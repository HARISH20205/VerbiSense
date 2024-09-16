import { Link } from "react-router-dom"
import logo from "./assets/iconoir--page.svg"
import loginicon from "./assets/material-symbols-light--login.svg"
import signupicon from "./assets/octicon--person-add-24.svg"

function Welcome() {
  return (
    <div className='flex items-center justify-center flex-col h-screen gap-8'>
      <div className='flex flex-col items-center'>
        <img src={logo} className='h-8 mb-5'></img>
        <p className='text-gray-900 font-extrabold text-2xl'>Welcome to VerbiSense App</p>
        <p className='text-gray-600'>Your AI-powered question answering assistant</p>
      </div>
      <div>
        <Link to="/login">
        <button className='bg-gray-900 text-white flex gap-3 justify-center w-96 py-2 mb-5 rounded-md'>
          <img src={loginicon} className='h-6'></img>
          Log In
        </button>
        </Link>
        <Link to="/signup">
        <button className='flex gap-3 justify-center w-96 py-2 border-2 border-gray-300 rounded-md'>
          <img src={signupicon} className='h-6'></img>
          Sign Up
        </button>
        </Link>
      </div>
    </div>
  )
}

export default Welcome