import { Link, useNavigate } from "react-router-dom";
import { Eye, FileText, Mail } from "lucide-react";
import { Alert, Slide, SlideProps } from "@mui/material";
import { useContext, useRef } from "react";
import { SnackBarContext } from "../store/SnackBarContext";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  User,
  UserCredential,
} from "firebase/auth";
import { auth, db } from "../config/firebase";
import { emailRegex } from "../constants/regex";
import { doc, setDoc } from "firebase/firestore";

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="up" />;
}

function Signup() {
  const [_, dispatch] = useContext(SnackBarContext);
  const navigate = useNavigate();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const userNameRef = useRef<HTMLInputElement>(null);

  const handleSignUp = async () => {
    const email: string | undefined = emailRef.current?.value;
    const password: string | undefined = passwordRef.current?.value;

    const isValidEmail = emailRegex.test(email!);
    const isValidPassword = password!.length > 5;

    let msg: string = "";
    let setColor: string = "";

    if (userNameRef.current?.value.trim().length === 0) {
      msg = "Please Enter your username";
      setColor = "#B22222";
    } else if (!isValidEmail) {
      msg = "Invaild Email";
      setColor = "#B22222";
    } else if (!isValidPassword) {
      msg = "Password must be at least 6 characters!";
      setColor = "#B22222";
    } else {
      try {
        const userCredentials: UserCredential =
          await createUserWithEmailAndPassword(auth, email!, password!);
        const user: User = userCredentials.user;
        await sendEmailVerification(user);
        msg = "Check your email for verification.";
        setColor = "black";

        await setDoc(doc(db, "users", user.uid), {
          email: email,
          username: userNameRef.current!.value,
        });

        navigate("/login");
      } catch (e) {
        msg = "Email Already Exists.";
        setColor = "#B22222";
      }
    }

    dispatch({
      type: "TOGGLE_SNACKBAR_DATA",
      payload: {
        open: true,
        children: (
          <Alert
            onClose={() =>
              dispatch({
                type: "TOGGLE_SNACKBAR_DATA",
                payload: {
                  open: false,
                },
              })
            }
            severity="success"
            variant="filled"
            sx={{
              width: "100%",
              backgroundColor: setColor,
              color: "white",
            }}
          >
            {msg}
          </Alert>
        ),
        props: {
          anchorOrigin: { vertical: "bottom", horizontal: "right" },
          autoHideDuration: 3000,
          onClose: () =>
            dispatch({
              type: "TOGGLE_SNACKBAR_DATA",
              payload: {
                open: false,
              },
            }),
          TransitionComponent: SlideTransition,
        },
      },
    });
    //navigate after this
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
              type="password"
              ref={passwordRef}
              placeholder="Password"
            ></input>
            <Eye
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
          </div>
          <button
            onClick={handleSignUp}
            className="bg-gray-900 text-white rounded-md w-full py-2 "
          >
            Sign up
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
