import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, FileText, Mail } from "lucide-react";
import { useContext, useRef, useState } from "react";
import { SnackBarContext } from "../store/SnackBarContext";
import { emailRegex } from "../constants/regex";
import { signup } from "../services/auth/authService";
import { themeColors } from "../resources/colors";
import { showSnackBar } from "../utils/snackbar";

function Signup() {
  const [eyeState, setEyeState] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [_, dispatch] = useContext(SnackBarContext);
  const navigate = useNavigate();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const userNameRef = useRef<HTMLInputElement>(null);

  const handleSignUp = async () => {
    setIsLoading(true);

    const email: string | undefined = emailRef.current?.value;
    const password: string | undefined = passwordRef.current?.value;

    const isValidEmail = emailRegex.test(email!);
    const isValidPassword = password!.length > 5;

    let msg: string = "";
    let setColor: string = "";

    if (userNameRef.current?.value.trim().length === 0) {
      msg = "Please Enter your username";
      setColor = themeColors.errorColor;
    } else if (!isValidEmail) {
      msg = "Invaild Email";
      setColor = themeColors.errorColor;
    } else if (!isValidPassword) {
      msg = "Password must be at least 6 characters!";
      setColor = themeColors.errorColor;
    } else {
      const response = await signup(
        userNameRef.current!.value,
        email!,
        password!
      );
      if (response != null) {
        msg = "Check your email for verification.";
        setColor = themeColors.primary;
        navigate("/login");
      } else {
        msg = "Email Already Exists.";
        setColor = themeColors.errorColor;
      }
    }

    setIsLoading(false);

    showSnackBar({
      dispatch,
      message: msg,
      color: setColor,
    });
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-center h-screen gap-10 max-md:w-[70%] md:w-[35%] mx-auto">
        <div className="flex flex-col items-center gap-2">
          <FileText size={40} />
          <p className="text-gray-900 font-semibold lg:text-2xl text-lg text-center">
            Create your account
          </p>
        </div>
        <div className="flex flex-col gap-4 w-full">
          <input
            className="border-2 border-gray-300 rounded-md w-full py-2 pr-10 pl-3 focus:outline-none"
            type="text"
            ref={userNameRef}
            placeholder="Full name"
          ></input>
          <div className="relative w-full">
            <input
              className="border-2 border-gray-300 rounded-md w-full py-2 pr-10 pl-3 focus:outline-none "
              type="email"
              ref={emailRef}
              placeholder="Email address"
            ></input>
            <Mail
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
          </div>
          <div className="relative w-full">
            <input
              className="border-2 border-gray-300 rounded-md w-full py-2 pr-10 pl-3 focus:outline-none"
              type={eyeState ? "text" : "password"}
              ref={passwordRef}
              placeholder="Password"
            ></input>
            {eyeState ? (
              <Eye
                onClick={() => setEyeState(!eyeState)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                size={20}
              />
            ) : (
              <EyeOff
                onClick={() => setEyeState(!eyeState)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                size={20}
              />
            )}
          </div>
          <button
            disabled={isLoading}
            onClick={handleSignUp}
            className="bg-gray-900 text-white rounded-md w-full py-2 "
          >
            {isLoading ? "Loading..." : "Sign up"}
          </button>
        </div>
        <p className="text-gray-600">
          Already have an account?{" "}
          <Link to="/login">
            <span className="text-gray-900">Log in</span>
          </Link>{" "}
        </p>
      </div>
    </div>
  );
}

export default Signup;
