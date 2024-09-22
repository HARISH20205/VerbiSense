import { CircleUserRound, LogOut, Menu, Settings } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { logout } from "../../services/auth/authService";

export default function Header() {
  const [open, setOpen] = useState<HTMLElement | boolean>(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    if (open) {
      setOpen(false);
    }
  };

  return (
    <div
      onClick={handleClose}
      className="flex justify-between w-full p-5 border-b-2 border-gray h-full"
    >
      <div className="mdx:hidden cursor-pointer">
        <Menu />
      </div>
      <div>
        <p>Question Answering</p>
      </div>
      <div>
        <Settings onClick={handleClick} className="cursor-pointer static" />
        {open ? (
          <div className="absolute right-10 top-15 shadow-lg w-[15%] max-md:w-[20%] max-sm:w-[30%] rounded-md bg-white">
            <Link to="/account">
              <div className="flex gap-2 items-center p-3 cursor-pointer hover:bg-gray-100">
                <CircleUserRound size={20} />
                <p>Account</p>
              </div>
            </Link>
            <div
              onClick={logout}
              className="flex gap-2 items-center p-3 cursor-pointer hover:bg-gray-100"
            >
              <LogOut size={20} />
              <p>Logout</p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
