import { Eye, FileText, Trash2, Upload } from "lucide-react";

export default function SideBar() {
  const docs = ["Document 1.pdf", "Document 2.docs", "Document 3.pdf"];
  const histories = [
    "2019 - Founding of Acme AI",
    "2021 - Release of Acme AI v1.0",
    "2022 - Acme AI Raises Series A",
    "2023 - Acme AI v2.0 Launch",
  ];

  return (
    <div className="flex flex-col justify-between h-screen bg-[#F3F4F6] p-4 md:w-[35%] max-md:w-[40%] max-mdx:hidden overflow-auto max-md:text-sm max-lg:text-sm">
      <div className="flex flex-col gap-7">
        <div className="flex gap-2 font-bold text-lg text-gray-900">
          <FileText />
          <p>QA App</p>
        </div>
        <div className="flex flex-col gap-5 p-2">
          <div className="flex gap-2">
            <Upload size={20} />
            <p>Upload</p>
          </div>
          <div>
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
          {docs.map((doc, key) => (
            <div
              key={key}
              className="flex text-gray-600 w-full bg-white p-2 rounded-sm justify-between"
            >
              <div>
                <p>{doc}</p>
              </div>
              <div className="flex gap-2">
                <Eye size={20} className="cursor-pointer hover:text-gray-900" />
                <Trash2
                  size={20}
                  className="cursor-pointer hover:text-gray-900"
                />
              </div>
            </div>
          ))}
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
