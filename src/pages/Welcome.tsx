import { Link } from "react-router-dom";
import { FileText } from "lucide-react";
import { LogIn } from "lucide-react";
import { UserPlus } from "lucide-react";

function Welcome() {
  const api = import.meta.env.API_KEY;
  console.log(api);
  return (
    <div className="flex items-center justify-center flex-col max-md:w-[70%] md:w-[30%] mx-auto h-screen gap-4">
      <div className="flex flex-col items-center">
        <FileText size={40} />
        <p className="text-gray-900 font-extrabold lg:text-2xl text-lg text-center mt-7">
          Welcome to VerbiSense App
        </p>
        <p className="text-gray-600 lg:text-lg text-base text-center my-3">
          Your AI-powered question answering assistant
        </p>
      </div>
      <div className="w-full">
        <Link to="/login">
          <button className="bg-gray-900 text-white flex gap-3 justify-center items-center w-full py-2 mb-5 rounded-md">
            <LogIn size={20} />
            Log In
          </button>
        </Link>
        <Link to="/signup">
          <button className="flex gap-3 justify-center items-center w-full py-2 border-2 border-gray-300 rounded-md">
            <UserPlus size={20} />
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Welcome;
