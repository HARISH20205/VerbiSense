import { CircleUserRound, LogOut, Menu, Settings } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { logout } from "../../services/auth/authService";

interface HeaderProps {
  showDrawer: () => void;
}

export default function Header({ showDrawer }: HeaderProps) {
  const [open, setOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setOpen(!open);
  };

  const handleClose = () => {
    if (open) {
      setOpen(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        handleClose();
      }
    };

    if (open) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [open]);

  return (
    <div className="flex justify-between p-5 border-b-2 border-gray sticky top-0 z-10 bg-white">
      <div className="mdx:hidden cursor-pointer">
        <Menu onClick={showDrawer} />
      </div>
      <div>
        <p className="font-semibold text-lg">Question Answering</p>
      </div>
      <div className="flex items-center gap-4">
        <p className="text-black hover:underline">
          <Link to="/about">About</Link>
        </p>
        <Settings onClick={handleClick} className="cursor-pointer static" />
        {open ? (
          <div
            ref={menuRef}
            className="absolute right-10 top-12 shadow-lg w-[15%] max-md:w-[20%] max-sm:w-[30%] rounded-md bg-white"
          >
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
