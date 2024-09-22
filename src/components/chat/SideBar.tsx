import { Eye, FileText, Trash2, Upload } from "lucide-react";
import { useRef, useState, ChangeEvent, useContext, useEffect } from "react";
import { SnackBarContext } from "../../store/SnackBarContext";
import { themeColors } from "../../resources/colors";
import { deleteFile, uploadFile } from "../../services/chat/chatService";
import { getFilenameFromUrl } from "../../utils/helper";
import { showSnackBar } from "../../utils/snackbar";

interface SideBarProps {
  userFiles: string[] | null;
  isLoding: boolean;
}

export default function SideBar({ userFiles, isLoding }: SideBarProps) {
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

  console.log(files!.length);
  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    await handleFileUpload(selectedFile!);
    e.target.value = "";
  };

  const handleFileUpload = async (file: File | null) => {
    if (!file) return;
    setIsUploadLoading(true);
    let msg = "";
    let setColor = "";

    const fileSizeMB = file.size / (1024 * 1024);
    if (files!.length >= 3) {
      let msg: string = "Exceeded maximum file limit";
      let setColor: string = themeColors.primary;

      showSnackBar({
        dispatch,
        message: msg,
        color: setColor,
      });
      return;
    }
    if (fileSizeMB > 3) {
      msg = "Max file size is 3MB";
      setColor = themeColors.errorColor;
      showSnackBar({
        dispatch,
        message: msg,
        color: setColor,
      });
    } else {
      const response = await uploadFile(file);
      if (response) {
        setFiles((prevFiles) => [...(prevFiles || []), response]);
      }
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

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    const files = e.dataTransfer.files;
    if (files.length) {
      handleFileUpload(files[0]);
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
    <div className="flex flex-col justify-between h-screen bg-[#F3F4F6] p-4 md:w-[35%] max-md:w-[40%] max-mdx:hidden overflow-auto max-md:text-sm max-lg:text-sm">
      <div className="flex flex-col gap-7">
        <div className="flex gap-2 font-bold text-lg text-gray-900">
          <FileText />
          <p>QA App</p>
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
              accept="image/*,application/pdf,audio/*,video/mp4"
              onChange={handleFileChange}
            />
          </div>
          <div
            className={`border-dashed border-2 p-4 ${
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
          {isLoding && <p>Loading...</p>}
          {files && files.length > 0 ? (
            files.map((doc, key) => (
              <div
                key={key}
                className="flex items-center text-gray-600 w-full bg-white p-2 rounded-sm justify-between"
              >
                <p className="truncate">{getFilenameFromUrl(doc)}</p>
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
