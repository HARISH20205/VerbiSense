import {
  Calendar,
  Clock10,
  Eye,
  FileText,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import {
  useRef,
  useState,
  ChangeEvent,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { SnackBarContext } from "../../store/snackBarContext";
import { themeColors } from "../../resources/colors";
import {
  deleteFile,
  getHistory,
  uploadFile,
} from "../../services/chat/chatService";
import {
  formatDate,
  getFilenameFromUrl,
  truncateFilename,
} from "../../utils/helper";
import { showSnackBar } from "../../utils/snackbar";
import { Link, useParams } from "react-router-dom";

interface SideBarProps {
  userFiles: string[] | null;
  isLoading: boolean;
  closeDrawer: () => void;
  onFilesChange: (file: string, isDeleted: boolean) => void;
}

type HistoryState = {
  displayString: string;
  urlString: string;
};

export default function SideBar({
  userFiles,
  isLoading,
  closeDrawer,
  onFilesChange,
}: SideBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isUploadLoading, setIsUploadLoading] = useState<boolean>(false);
  const [_, dispatch] = useContext(SnackBarContext);
  const [dragging, setDragging] = useState(false);
  const [files, setFiles] = useState<string[] | null>(userFiles);
  const [histories, setHistories] = useState<HistoryState[] | []>([]);
  const [isHistoryLoading, setIsHistoryLoading] = useState<boolean>(false);

  const { id } = useParams();

  useEffect(() => {
    setFiles(userFiles);

    getDates();
  }, [userFiles]);

  const getDates = useCallback(async () => {
    setIsHistoryLoading(true);
    const history = await getHistory();

    const formattedHistory: HistoryState[] = [];

    for (let i = 0; i < history!.length; i++) {
      let dateHistory = Object.keys(history![i]).toString();
      let msg = Object.values(history![i]).toString();
      const formattedDate: string = formatDate(dateHistory);
      const setHistory = `${formattedDate} - ${msg}`;
      formattedHistory.push({
        displayString: setHistory,
        urlString: dateHistory,
      });
    }
    setIsHistoryLoading(false);
    setHistories(formattedHistory);
  }, []);

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
      onFilesChange(response, false);
    }

    setIsUploadLoading(false);
  };

  const handleDeleteFile = async (viewUrl: string, fileName: string) => {
    const isDeleted = await deleteFile(fileName);
    if (isDeleted) {
      const updatedFiles = files?.filter((file) => file !== viewUrl) || null;
      setFiles(updatedFiles);
      onFilesChange(viewUrl, true);
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
            className={`border-dashed border-2 p-4 max-mdx:hidden cursor-pointer ${
              dragging ? "border-black" : "border-gray-300"
            } transition-all`}
            onClick={
              isUploadLoading ? () => {} : () => inputRef.current?.click()
            }
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
            <p>No Files Uploaded</p>
          )}
        </div>
      </div>
      <div className="text-gray-600 flex flex-col gap-2">
        <p className="text-gray-900 font-bold border-b-2 pb-2">History</p>
        {isHistoryLoading ? (
          <p>Loading...</p>
        ) : (
          <div>
            <p className="flex gap-2 items-center my-2 ">
              <Clock10
                className={`${id === undefined && "text-black font-semibold"}`}
                size={20}
              />
              <Link
                className={`${id === undefined && "text-black font-semibold"}`}
                to="/chat"
              >
                Today
              </Link>
            </p>
            {histories.length > 0 &&
              histories.map((history, key) => (
                <p className="flex items-center my-2 gap-2" key={key}>
                  <Calendar
                    className={`${
                      id === history.urlString && "text-black font-semibold"
                    }`}
                    size={20}
                  />
                  <Link
                    className={`${
                      id === history.urlString && "text-black font-semibold"
                    }`}
                    to={`/chat/${history.urlString}`}
                  >
                    {history.displayString}
                  </Link>
                </p>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
