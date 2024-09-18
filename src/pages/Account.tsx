import { Lock, LogOut, Save, User } from "lucide-react";

function Account() {
  return (
    <div>
      <div className="flex justify-between p-5">
        <div className="flex gap-2">
          <User />
          <span className="font-semibold">VerbiSense</span>
        </div>
        <div>
          <button className="text-gray-600">Back to Home</button>
        </div>
      </div>
      <hr></hr>
      <div className="flex items-center justify-center h-screen">
        <div className="flex items-start flex-col w-[60%] mx-auto gap-4 px-7 shadow-lg">
          <p className="text-2xl font-semibold">Account Settings</p>
          <div className="flex gap-2">
            <User />
            <p className="text-lg font-medium">Personal Information</p>
          </div>
          <div className="flex w-full gap-3">
            <div className="w-[50%]">
              <p className="pl-1">Name</p>
              <input
                className="border-2 w-full border-gray-300 rounded-md py-1 pr-10 pl-3 focus:outline-none"
                type="text"
              ></input>
            </div>
            <div className="w-[50%]">
              <p className="pl-1">Email</p>
              <input
                className="border-2 w-full border-gray-300 rounded-md py-1 pr-10 pl-3 focus:outline-none"
                type="text"
              ></input>
            </div>
          </div>
          <div>
            <div>
              <div className="flex gap-2">
                <Lock />
                <p className="text-lg font-medium">Change Password</p>
              </div>
              <div>
                <p>Current Password</p>
                <input
                  className="border-2 border-gray-300 rounded-md py-1 pr-10 pl-3 focus:outline-none"
                  type="text"
                ></input>
                <p>New Password</p>
                <input
                  className="border-2 border-gray-300 rounded-md py-1 pr-10 pl-3 focus:outline-none"
                  type="text"
                ></input>
              </div>
            </div>
          </div>
          <hr></hr>
          <div className="flex justify-between p-3 w-full">
            <button className="bg-gray-900 text-white flex gap-3 justify-center items-center w-[30%] py-2 mb-5 rounded-md">
              <Save />
              Save Changes
            </button>
            <button className="bg-gray-900 text-white flex gap-3 justify-center items-center w-[20%] py-2 mb-5 rounded-md">
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
