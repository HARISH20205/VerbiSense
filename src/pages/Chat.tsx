import SideBar from "../components/chat/SideBar";
import Header from "../components/chat/Header";
import { useEffect, useState } from "react";
import { getFiles, sendMessage } from "../services/chat/chatService";
import Question from "../components/chat/Question";
import ChatBox from "../components/chat/ChatBox";

function Chat() {
  const [uploadedFiles, setUploadedFiles] = useState<string[] | null>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showDrawer, setShowDrawer] = useState<boolean>(false);

  async function getUploadedFiles() {
    const response = await getFiles();
    if (response) {
      setUploadedFiles(response);
    } else {
      setUploadedFiles(null);
    }
  }
  useEffect(() => {
    getUploadedFiles();
    setIsLoading(false);
  }, []);

  function openDrawer() {
    setShowDrawer(true);
  }

  async function onSendChat(query: string) {
    
    const response = await sendMessage(query, uploadedFiles!);
    if (response) {
      console.log(response);
    }
  }

  function closeDrawer() {
    setShowDrawer(false);
  }

  return (
    <div>
      <div
        className={`mdx:hidden fixed z-20 w-full h-full bg-[rgba(255,255,255,0.7)] transform transition-transform duration-300 ease-in-out ${
          showDrawer ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="w-[80%]">
          <SideBar
            closeDrawer={closeDrawer}
            isLoading={isLoading}
            userFiles={uploadedFiles}
          />
        </div>
      </div>
      <div className="flex h-screen">
        <div className="max-mdx:hidden w-[35%]">
          <SideBar
            closeDrawer={closeDrawer}
            isLoading={isLoading}
            userFiles={uploadedFiles}
          />
        </div>
        <div className="flex flex-col justify-between w-full">
          <Header showDrawer={openDrawer} />
          <ChatBox />
          <Question onSendQuery={onSendChat} />
        </div>
      </div>
    </div>
  );
}

export default Chat;
