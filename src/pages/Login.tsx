import { Link, useNavigate } from "react-router-dom";
import { Eye, FileText, Mail } from "lucide-react";
import { Alert, Slide, SlideProps } from "@mui/material";
import { useContext } from "react";
import { SnackBarContext } from "../store/snackBarContext";

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="up" />;
}

function Login() {
  const [_, dispatch] = useContext(SnackBarContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    //make api call
    //show snack bar only if login is successful
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
            Account logged in successfully!
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
    //navigation
    navigate("/chat");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-10 max-md:w-[70%] md:w-[35%] mx-auto">
      <div className="flex flex-col items-center gap-3">
        <FileText size={40} />
        <p className="text-gray-900 font-semibold lg:text-2xl text-lg text-center">
          Log in to your account
        </p>
      </div>
      <div className="flex flex-col gap-2 w-full">
        <div className="relative w-full">
          <input
            className="w-full border-2 py-2 pr-10 pl-3 rounded-md focus:outline-none "
            type="email"
            placeholder="Email address"
          />
          <Mail
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
        </div>
        <div className="relative w-full">
          <input
            className="w-full border-2 py-2 pr-10 pl-3 rounded-md focus:outline-none "
            type="password"
            placeholder="Password"
          />
          <Eye
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
        </div>
      </div>
      <div className="w-full">
        <button
          onClick={handleLogin}
          className="w-full bg-gray-900 text-white py-2 rounded-md hover:bg-gray-800 transition-colors"
        >
          Log in
        </button>
      </div>
      <div>
        <p className="text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup">
            <span className="text-gray-900 hover:underline">Sign up</span>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
