import SideBar from "../components/chat/SideBar";
import Header from "../components/chat/Header";
import { useEffect, useState } from "react";
import { getFiles } from "../services/chat/chatService";

function Chat() {
  const [uploadedFiles, setUploadedFiles] = useState<string[] | null>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    async function getUploadedFiles() {
      const response = await getFiles();
      if (response) {
        setUploadedFiles(response);
      } else {
        setUploadedFiles(null);
      }
    }
    getUploadedFiles();
    setIsLoading(false);
  }, []);

  return (
    <div>
      <div className="flex">
        <SideBar isLoding={isLoading} userFiles={uploadedFiles} />
        <Header />
      </div>
    </div>
  );
}

export default Chat;
