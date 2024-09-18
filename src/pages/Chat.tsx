import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";

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
    </div>
  );
}

export default Chat;
