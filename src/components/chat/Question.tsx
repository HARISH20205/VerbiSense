import { ChevronRight } from "lucide-react";

export default function Question() {
  return (
    <div className="sticky bottom-0 z-10 bg-white">
      <div className="flex p-4 gap-3 border-t-2 border-gray">
        <input
          className="w-[100%] bg-[#F3F4F6] pl-4 py-2 rounded-md outline-none"
          placeholder="Ask a question..."
        ></input>
        <div className="px-4 py-2 bg-black rounded-md hover:cursor-pointer">
          <ChevronRight color="white" />
        </div>
      </div>
    </div>
  );
}
