import SideBar from "../components/chat/SideBar";
import Header from "../components/chat/Header";

function Chat() {
  return (
    <div>
      <div className="flex">
        <SideBar />
        <Header />
      </div>
    </div>
  );
}

export default Chat;
