import { signOut } from "firebase/auth";
import { Eye, EyeOff, Lock, LogOut, Save, User } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../config/firebase";

function Account() {
  const [currentEyeState, setCurrentEyeState] = useState<boolean>(false);
  const [newEyeState, setNewEyeState] = useState<boolean>(false);

  async function handleLogout() {
    console.log("Came");
    try {
      await signOut(auth);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div>
      <div className="flex justify-between p-5">
        <div className="flex gap-2">
          <User />
          <span className="font-semibold">VerbiSense</span>
        </div>
        <div>
          <Link to="/chat" className="text-gray-600">
            Back to Chat
          </Link>
        </div>
      </div>
      <hr></hr>
      <div className="flex items-center justify-center h-screen">
        <div className="flex items-start flex-col max-xxs:w-[90%] pt-7 max-xs:w-[80%] md:w-[50%] max-md:w-[60%] mx-auto gap-4 px-7 shadow-[0px_4px_10px_rgba(0,0,0,0.1)]">
          <p className="text-2xl font-semibold">Account Settings</p>
          <div className="flex gap-2">
            <User />
            <p className="text-lg font-medium">Personal Information</p>
          </div>
          <div className="flex w-full gap-3 max-md:flex-col">
            <div className="md:w-[50%]">
              <p className="pl-1 mb-2">Name</p>
              <input
                className="border-2 w-full border-gray-300 rounded-md py-1 pr-10 pl-3 focus:outline-none"
                type="text"
              ></input>
            </div>
            <div className="md:w-[50%]">
              <p className="pl-1 mb-2">Email</p>
              <input
                className="border-2 w-full border-gray-300 rounded-md py-1 pr-10 pl-3 focus:outline-none"
                type="email"
              ></input>
            </div>
          </div>
          <div className="w-full">
            <div className="flex flex-col gap-3 w-full">
              <div className="flex gap-2">
                <Lock />
                <p className="text-lg font-medium">Change Password</p>
              </div>
              <div className="flex flex-col gap-3 w-full">
                <div className="relative">
                  <p className="mb-2">Current Password</p>
                  <input
                    className="border-2 border-gray-300 rounded-md w-full py-1 pr-10 pl-3 focus:outline-none"
                    type={currentEyeState ? "text" : "password"}
                  ></input>
                  {currentEyeState ? (
                    <Eye
                      size={20}
                      onClick={() => setCurrentEyeState(!currentEyeState)}
                      className="absolute right-3 top-[60%] text-gray-400"
                    />
                  ) : (
                    <EyeOff
                      size={20}
                      onClick={() => setCurrentEyeState(!currentEyeState)}
                      className="absolute right-3 top-[60%] text-gray-400"
                    />
                  )}
                </div>
                <div className="relative">
                  <p className="mb-2">New Password</p>
                  <input
                    className="border-2 border-gray-300 rounded-md w-full py-1 pr-10 pl-3 focus:outline-none"
                    type={newEyeState ? "text" : "password"}
                  ></input>
                  {newEyeState ? (
                    <Eye
                      size={20}
                      onClick={() => setNewEyeState(!newEyeState)}
                      className="absolute right-3 top-[60%] text-gray-400"
                    />
                  ) : (
                    <EyeOff
                      size={20}
                      onClick={() => setNewEyeState(!newEyeState)}
                      className="absolute right-3 top-[60%] text-gray-400"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          <hr className="" />
          <div className="flex max-xs:flex-col justify-between p-3 w-full">
            <button className="bg-gray-900 max-xs:w-full text-white flex gap-3 justify-center items-center max-md:text-sm max-md:w-[55%] md:w-[50%] py-2 mb-5 rounded-md">
              <Save />
              Save Changes
            </button>
            <button
              onClick={handleLogout}
              className="bg-gray-900 max-xs:w-full text-white flex gap-3 justify-center items-center max-md:text-sm w-[40%] py-2 mb-5 rounded-md"
            >
              <LogOut />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
