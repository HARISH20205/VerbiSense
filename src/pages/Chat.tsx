import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { Link } from "react-router-dom";

function Chat() {
  async function handleLogout() {
    try {
      await signOut(auth);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
      <div>
        <Link to="/account">Account</Link>
      </div>
    </div>
  );
}

export default Chat;
