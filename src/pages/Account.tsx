import {
  Check,
  Edit2Icon,
  Eye,
  EyeOff,
  FileText,
  Lock,
  LogOut,
  Save,
  User,
} from "lucide-react";
import { useContext, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../store/AuthContext";
import {
  changePassword,
  logout,
  updateName,
} from "../services/auth/authService";
import { SnackBarContext } from "../store/SnackBarContext";
import { themeColors } from "../resources/colors";
import { showSnackBar } from "../utils/snackbar";

function Account() {
  const [currentEyeState, setCurrentEyeState] = useState<boolean>(false);
  const [newEyeState, setNewEyeState] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("");
  const [isNameEdit, setIsNameEdit] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const currentPasswordRef = useRef<HTMLInputElement>(null);
  const newPasswordRef = useRef<HTMLInputElement>(null);

  const { authUser } = useContext(AuthContext);
  const [_, dispatch] = useContext(SnackBarContext);

  useEffect(() => {
    if (authUser) {
      setUserName(authUser.userName);
    }
  }, [authUser]);

  async function hanldeSaveChanges() {
    setIsLoading(true);
    let msg: string = "";
    let setColor: string = "";

    const currentPassword = currentPasswordRef.current?.value;
    const newPassword = newPasswordRef.current?.value;

    if (
      currentPassword &&
      newPassword &&
      authUser?.userName !== userName.trim()
    ) {
      if (currentPassword.trim().length > 0 && newPassword.trim().length > 0) {
        if (newPassword.trim().length > 5) {
          const passwordResponse = await changePassword(
            authUser!.email,
            currentPassword,
            newPassword
          );
          const userNameResponse = await updateName(userName);

          if (
            typeof passwordResponse === "string" &&
            userNameResponse == false
          ) {
            msg = passwordResponse;
            setColor = themeColors.errorColor;
          } else {
            msg = "Username and Password Saved Successfully!";
            setColor = themeColors.primary;
          }
          authUser!.userName = userName;
          currentPasswordRef.current.value = "";
          newPasswordRef.current.value = "";
        } else {
          msg = "New Password must be greater than 5";
          setColor = themeColors.primary;
        }
      }
    } else if (authUser?.userName !== userName.trim()) {
      const response = await updateName(userName);
      if (response) {
        msg = "Username Saved Successfully!";
        setColor = themeColors.primary;
        authUser!.userName = userName;
      }
    } else if (currentPassword && newPassword) {
      if (currentPassword.trim().length > 0 && newPassword.trim().length > 0) {
        if (newPassword.trim().length > 5) {
          const passwordResponse = await changePassword(
            authUser!.email,
            currentPassword,
            newPassword
          );
          if (typeof passwordResponse === "string") {
            msg = passwordResponse;
            setColor = themeColors.errorColor;
          } else {
            msg = "Password Saved Successfully!";
            setColor = themeColors.primary;
          }
          currentPasswordRef.current.value = "";
          newPasswordRef.current.value = "";
        } else {
          msg = "New Password must be greater than 5";
          setColor = themeColors.errorColor;
        }
      }
    } else {
      msg = "No changes found!";
      setColor = themeColors.primary;
    }

    setIsLoading(false);

    showSnackBar({
      dispatch,
      message: msg,
      color: setColor,
    });
  }

  return (
    <div>
      <div className="flex justify-between h-[69.6px] items-center p-4 sticky top-0 left-0 bg-white border-b-gray-300 border-b-2">
        <div className="flex gap-2">
          <FileText />
          <p className="font-bold text-lg">VerbiSense</p>
        </div>
        <div>
          <Link to="/chat" className="text-gray-600">
            Back to Chat
          </Link>
        </div>
      </div>
      <div className="flex items-center justify-center height-fixed">
        <div className="flex items-start flex-col max-xxs:w-[90%] pt-7 max-xs:w-[80%] md:w-[50%] max-md:w-[60%] mx-auto gap-4 my-5  px-7 shadow-[0px_4px_10px_rgba(0,0,0,0.1)]">
          <p className="text-2xl font-semibold">Account Settings</p>
          <div className="flex gap-2">
            <User />
            <p className="text-lg font-medium">Personal Information</p>
          </div>
          <div className="flex w-full gap-3 max-md:flex-col">
            <div className="md:w-[50%] relative">
              <p className="pl-1 mb-2 font-medium">Name</p>
              <input
                className={`border-2 w-full bg-white  ${
                  isNameEdit ? "border-black" : "border-gray-300"
                } rounded-md py-1 pr-5 pl-3 focus:outline-none`}
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                disabled={!isNameEdit}
              ></input>
              {!isNameEdit ? (
                <Edit2Icon
                  size={20}
                  className="absolute right-3 top-[60%] text-gray-400 cursor-pointer"
                  onClick={() => setIsNameEdit(true)}
                />
              ) : (
                <Check
                  size={20}
                  className="absolute right-3 top-[60%] text-black cursor-pointer"
                  onClick={() => setIsNameEdit(false)}
                />
              )}
            </div>
            <div className="md:w-[50%]">
              <p className="pl-1 mb-2 font-medium">Email</p>
              <input
                className="border-2 w-full bg-white border-gray-300 rounded-md py-1 pr-5 pl-3 focus:outline-none"
                type="email"
                value={authUser ? authUser.email : ""}
                disabled
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
                  <p className="mb-2 font-medium">Current Password</p>
                  <input
                    className="border-2 border-gray-300 rounded-md w-full py-1 pr-10 pl-3 focus:outline-none"
                    type={currentEyeState ? "text" : "password"}
                    ref={currentPasswordRef}
                  ></input>
                  {currentEyeState ? (
                    <Eye
                      size={20}
                      onClick={() => setCurrentEyeState(!currentEyeState)}
                      className="absolute right-3 top-[60%] text-gray-400 cursor-pointer"
                    />
                  ) : (
                    <EyeOff
                      size={20}
                      onClick={() => setCurrentEyeState(!currentEyeState)}
                      className="absolute right-3 top-[60%] text-gray-400 cursor-pointer"
                    />
                  )}
                </div>
                <div className="relative">
                  <p className="mb-2 font-medium">New Password</p>
                  <input
                    ref={newPasswordRef}
                    className="border-2 border-gray-300 rounded-md w-full py-1 pr-10 pl-3 focus:outline-none"
                    type={newEyeState ? "text" : "password"}
                  ></input>
                  {newEyeState ? (
                    <Eye
                      size={20}
                      onClick={() => setNewEyeState(!newEyeState)}
                      className="absolute right-3 top-[60%] text-gray-400 cursor-pointer"
                    />
                  ) : (
                    <EyeOff
                      size={20}
                      onClick={() => setNewEyeState(!newEyeState)}
                      className="absolute right-3 top-[60%] text-gray-400 cursor-pointer"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          <hr className="" />
          <div className="flex max-xs:flex-col justify-between py-3 w-full">
            <button
              disabled={isLoading}
              onClick={hanldeSaveChanges}
              className="bg-gray-900 max-xs:w-full text-white flex gap-3 justify-center items-center max-md:text-sm max-md:w-[55%] md:w-[50%] py-2 mb-5 rounded-md"
            >
              <Save />
              {isLoading ? "Loading..." : "Save Changes"}
            </button>
            <button
              onClick={logout}
              className="bg-logoutColor max-xs:w-full text-white flex gap-3 justify-center items-center max-md:text-sm w-[40%] py-2 mb-5 rounded-md"
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
