import SideBar from "../components/chat/SideBar";
import Header from "../components/chat/Header";
import { useEffect, useState } from "react";
import {
  getChatData,
  getFiles,
  sendMessage,
} from "../services/chat/chatService";
import Question from "../components/chat/Question";
import ChatBox from "../components/chat/ChatBox";
import { ChatModel } from "../models/chat/ChatModel";

function Chat() {
  const [uploadedFiles, setUploadedFiles] = useState<string[] | null>([]);
  const [updatedFiles, setUpdatedFiles] = useState<string[] | null>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showDrawer, setShowDrawer] = useState<boolean>(false);
  const [chatData, setChatData] = useState<ChatModel[] | []>([]);
  const [chatLoading, setChatLoading] = useState<boolean>(false);

  async function getUploadedFiles() {
    const response = await getFiles();
    if (response) {
      setUploadedFiles(response);
      setUpdatedFiles(response);
      handleGetChatData();
      // getChats();
    } else {
      setUploadedFiles(null);
      setUpdatedFiles(null);
    }
  }

  async function handleGetChatData() {
    const chatData = await getChatData();
    setChatData(chatData);
  }
  useEffect(() => {
    getUploadedFiles();

    setIsLoading(false);
  }, []);

  const handleFilesChange = (newFile: string, isDeleted: boolean) => {
    if (isDeleted) {
      setUpdatedFiles(
        (prevFiles) => prevFiles!.filter((file) => file !== newFile) || null
      );
    } else {
      setUpdatedFiles((prevFiles) => [...(prevFiles || []), newFile]);
    }
  };
  function openDrawer() {
    setShowDrawer(true);
  }

  async function onSendChat(query: string) {
    setChatLoading(true);
    const response: ChatModel | null = await sendMessage(query, updatedFiles!);
    if (response) {
      setChatData((pre) => [...pre, response]);
      setChatLoading(false);
    }
  }

  function closeDrawer() {
    setShowDrawer(false);
  }

  return (
    <div>
      <div
        onClick={closeDrawer}
        className={`mdx:hidden fixed z-20 w-full h-full bg-[rgba(255,255,255,0.7)] transform transition-transform duration-300 ease-in-out ${
          showDrawer ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="w-[80%]" onClick={(e) => e.stopPropagation()}>
          <SideBar
            closeDrawer={closeDrawer}
            onFilesChange={handleFilesChange}
            isLoading={isLoading}
            userFiles={uploadedFiles}
          />
        </div>
      </div>
      <div className="flex h-screen">
        <div className="max-mdx:hidden w-[35%]">
          <SideBar
            closeDrawer={closeDrawer}
            onFilesChange={handleFilesChange}
            isLoading={isLoading}
            userFiles={uploadedFiles}
          />
        </div>
        <div className="flex flex-col justify-between w-full">
          <Header showDrawer={openDrawer} />
          <ChatBox chatLoading={chatLoading} chatData={chatData} />
          <Question onSendQuery={onSendChat} />
        </div>
      </div>
    </div>
  );
}

export default Chat;
