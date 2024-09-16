import { Link } from "react-router-dom"
import { FileText } from "lucide-react"

function Login() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-10">
      <div className="flex flex-col items-center gap-3">
      <FileText size={40} />
        <p className="text-gray-900 text-2xl font-extrabold">Log in to your account</p>
      </div>
      <div className="flex flex-col">
        <input className="w-96 border-2 py-1 pl-3 rounded-t-md focus:outline-none focus:bg-blue-100" type="email" placeholder="Email address"></input>
        <input className="w-96 border-x-2 border-b-2 py-1 pl-3 rounded-b-md focus:outline-none" type="password" placeholder="Password"></input>
      </div>
      <div>
        <Link to="/chat">
          <button className="w-96 bg-gray-900 text-white py-2 rounded-md">Log in</button>
        </Link>
      </div>
      <div>
        <p className="text-gray-600">Don't have an account? <Link to="/signup"><span className="text-gray-900">Sign up</span></Link></p>
      </div>
    </div>
  )
}

export default Login