import SideBar from "../components/chat/SideBar";
import Header from "../components/chat/Header";
import { useContext, useEffect, useState } from "react";
import {
  getChatData,
  getFiles,
  sendMessage,
} from "../services/chat/chatService";
import Question from "../components/chat/Question";
import ChatBox from "../components/chat/ChatBox";
import { ChatModel } from "../models/chat/ChatModel";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { SnackBarContext } from "../store/SnackBarContext";
import { showSnackBar } from "../utils/snackbar";
import { themeColors } from "../resources/colors";

function Chat() {
  const [uploadedFiles, setUploadedFiles] = useState<string[] | null>([]);
  const [updatedFiles, setUpdatedFiles] = useState<string[] | null>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showDrawer, setShowDrawer] = useState<boolean>(false);
  const [chatData, setChatData] = useState<ChatModel[] | []>([]);
  const [chatLoading, setChatLoading] = useState<boolean>(false);
  const [_, dispatch] = useContext(SnackBarContext);

  const { id } = useParams();

  async function getUploadedFiles() {
    const response = await getFiles();
    if (response) {
      setUploadedFiles(response);
      setUpdatedFiles(response);
      setIsLoading(false);
    } else {
      setUploadedFiles(null);
      setUpdatedFiles(null);
      setIsLoading(false);
    }
  }

  async function handleGetChatData(id: string | undefined) {
    const chatData = await getChatData(id);
    setIsLoading(false);
    setChatData(chatData);
  }
  useEffect(() => {
    setIsLoading(true);
    setShowDrawer(false);
    getUploadedFiles();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    setShowDrawer(false);
    handleGetChatData(id);
  }, [id]);

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
    const response: ChatModel | null = await sendMessage(
      query,
      updatedFiles!,
      id
    );
    if (response) {
      setChatData((pre) => [...pre, response]);
      setChatLoading(false);
    } else {
      showSnackBar({
        color: themeColors.errorColor,
        dispatch: dispatch,
        message: "Failed to get the response.",
      });
      setChatLoading(false);
    }
  }

  function closeDrawer() {
    setShowDrawer(false);
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <CircularProgress
          color="inherit"
          size={50}
          sx={{
            animationDuration: "1s", // Controls the speed
            animationTimingFunction: "ease-in-out", // Smooth out the animation
          }}
        />
      </div>
    );
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
