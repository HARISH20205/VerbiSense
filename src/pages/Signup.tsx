import { Link } from "react-router-dom";
import { Eye, FileText, Mail } from "lucide-react";
import { Alert, Slide, SlideProps } from "@mui/material";
import { useContext } from "react";
import { StoreContext } from "../store/context";

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="up" />;
}

function Signup() {
  const [_, dispatch] = useContext(StoreContext);

  const handleSignUp = () => {
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
            sx={{ width: "100%", backgroundColor: "black", color: "white" }}
          >
            Account created successfully!
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
            className="border-2 border-gray-300 rounded-md w-full py-2 pr-10 pl-3 focus:outline-none focus:bg-blue-100 active:bg-blue-100"
            type="text"
            placeholder="Full name"
          ></input>
          <div className="relative w-full">
            <input
              className="border-2 border-gray-300 rounded-md w-full py-2 pr-10 pl-3 focus:outline-none focus:bg-blue-100"
              type="email"
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
              placeholder="Password"
            ></input>
            <Eye
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
          </div>
          <Link to="/chat" onClick={handleSignUp}>
            <button className="bg-gray-900 text-white rounded-md w-full py-2 ">
              Sign Up
            </button>
          </Link>
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
