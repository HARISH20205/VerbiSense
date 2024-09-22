import { Eye, FileText, Trash2, Upload, X } from "lucide-react";
import { useRef, useState, ChangeEvent, useContext, useEffect } from "react";
import { SnackBarContext } from "../../store/SnackBarContext";
import { themeColors } from "../../resources/colors";
import { deleteFile, uploadFile } from "../../services/chat/chatService";
import { getFilenameFromUrl, truncateFilename } from "../../utils/helper";
import { showSnackBar } from "../../utils/snackbar";

interface SideBarProps {
  userFiles: string[] | null;
  isLoading: boolean;
  closeDrawer: () => void;
}

export default function SideBar({
  userFiles,
  isLoading,
  closeDrawer,
}: SideBarProps) {
  const [files, setFiles] = useState<string[] | null>(userFiles);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isUploadLoading, setIsUploadLoading] = useState<boolean>(false);
  const [_, dispatch] = useContext(SnackBarContext);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    setFiles(userFiles);
  }, [userFiles]);


  const histories: string[] = [
    "2019 - Founding of Acme AI",
    "2021 - Release of Acme AI v1.0",
    "2022 - Acme AI Raises Series A",
    "2023 - Acme AI v2.0 Launch",
  ];

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);

    if ((files?.length || 0) + selectedFiles.length > 3) {
      showSnackBar({
        dispatch,
        message: "Exceeded maximum file limit (Max 3 files allowed)",
        color: themeColors.errorColor,
      });
      e.target.value = "";
      return;
    }

    for (const file of selectedFiles) {
      await handleFileUpload(file);
    }
    e.target.value = "";
  };

  const handleFileUpload = async (file: File | null) => {
    if (!file) return;

    const fileSizeMB = file.size / (1024 * 1024);

    if (fileSizeMB > 3) {
      showSnackBar({
        dispatch,
        message: "Max file size is 3MB",
        color: themeColors.errorColor,
      });
      return;
    }

    setIsUploadLoading(true);
    const response = await uploadFile(file);

    if (response) {
      setFiles((prevFiles) => [...(prevFiles || []), response]);
    }

    setIsUploadLoading(false);
  };

  const handleDeleteFile = async (viewUrl: string, fileName: string) => {
    const isDeleted = await deleteFile(fileName);
    if (isDeleted) {
      setFiles(
        (prevFiles) => prevFiles?.filter((file) => file !== viewUrl) || null
      );
    }
  };

  const handleViewFile = (fileUrl: string) => {
    window.open(fileUrl);
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);

    const allowedFileTypes = [
      "text/plain",
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "image/jpeg",
      "image/png",
      "image/webp",
      "audio/mpeg",
      "video/mp4",
    ];

    const droppedFiles = Array.from(e.dataTransfer.files);

    if ((files?.length || 0) + droppedFiles.length > 3) {
      showSnackBar({
        dispatch,
        message: "Exceeded maximum file limit (Max 3 files allowed)",
        color: themeColors.errorColor,
      });
      return;
    }

    for (const file of droppedFiles) {
      if (!allowedFileTypes.includes(file.type)) {
        showSnackBar({
          dispatch,
          message: `File type not allowed: ${file.name}`,
          color: themeColors.errorColor,
        });
        continue;
      }

      await handleFileUpload(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  return (
    <div
      className={`flex  flex-col z-30 justify-between h-screen bg-[#F3F4F6] p-4 overflow-auto max-md:text-sm max-lg:text-sm`}
    >
      <div className="flex flex-col gap-7">
        <div className="flex gap-2 items-center justify-between font-bold text-lg text-gray-900">
          <div className="flex gap-2">
            <FileText />
            <p>VerbiSense</p>
          </div>
          <X className="mdx:hidden" onClick={closeDrawer} />
        </div>
        <div className="flex flex-col gap-5 p-2">
          <div className="flex gap-2">
            <Upload
              size={20}
              className="cursor-pointer"
              onClick={
                isUploadLoading ? () => {} : () => inputRef.current?.click()
              }
            />
            <p>{isUploadLoading ? "Uploading..." : "Upload"}</p>
            <input
              ref={inputRef}
              type="file"
              className="hidden"
              accept="image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain,audio/*,video/mp4"
              onChange={handleFileChange}
              multiple
            />
          </div>
          <div
            className={`border-dashed border-2 p-4 max-mdx:hidden ${
              dragging ? "border-black" : "border-gray-300"
            } transition-all`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <p className="text-gray-600">
              Drag and drop files here <br /> or click to upload
            </p>
          </div>
          <div className="flex gap-2">
            <FileText size={20} />
            <p>Documents</p>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div>
            <p>
              Uploaded Documents<span className="text-sm">(Max.3MB)</span>
            </p>
          </div>
          {isLoading && <p>Loading...</p>}
          {files && files.length > 0 ? (
            files.map((doc, key) => (
              <div
                key={key}
                className="flex items-center text-gray-600 bg-white p-2 rounded-sm justify-between"
              >
                <p>{truncateFilename(getFilenameFromUrl(doc))}</p>
                <div className="flex gap-2">
                  <Eye
                    onClick={() => handleViewFile(doc)}
                    size={20}
                    className="cursor-pointer hover:text-gray-900"
                  />
                  <Trash2
                    onClick={() =>
                      handleDeleteFile(doc, getFilenameFromUrl(doc))
                    }
                    size={20}
                    className="cursor-pointer hover:text-gray-900"
                  />
                </div>
              </div>
            ))
          ) : (
            <p>No Images Uploaded</p>
          )}
        </div>
      </div>
      <div className="text-gray-600 flex flex-col gap-2">
        <p className="text-gray-900 font-bold">History</p>
        {histories.map((history, key) => (
          <p key={key}>{history}</p>
        ))}
      </div>
    </div>
  );
}
