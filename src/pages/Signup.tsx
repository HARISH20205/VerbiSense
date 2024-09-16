import { Link } from "react-router-dom"
import logo from "./assets/iconoir--page.svg"

function Signup() {
  return (
    <div className="flex flex-col justify-center items-center h-screen gap-10">
      <div className="flex flex-col items-center gap-2">
        <img src={logo} className='w-8'></img>
        <p className='text-gray-900 font-semibold text-2xl'>Create your account</p>
      </div>
      <div className="flex flex-col gap-7">
        <input className='border-2 border-gray-300 rounded-md w-96 py-1 pl-3 focus:outline-none focus:bg-blue-100 active:bg-blue-100' type='text' placeholder='Full name'></input>
        <input className='border-2 border-gray-300 rounded-md w-96 py-1 pl-3 focus:outline-none focus:bg-blue-100' type='email' placeholder='Email address'></input>
        <input className='border-2 border-gray-300 rounded-md w-96 py-1 pl-3 focus:outline-none' type='password' placeholder='Password'></input>
        <Link to="/chat">
          <button className='bg-gray-900 text-white rounded-md w-96 py-2 '>Sign Up</button>
        </Link>
      </div>
      <p className="text-gray-600">Already have an account? <Link to="/login"><span className="text-gray-900">Log in</span></Link> </p>
    </div>
  )
}

export default Signup