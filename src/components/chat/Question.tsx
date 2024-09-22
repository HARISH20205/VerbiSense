import { ChevronRight } from "lucide-react";
import { useRef } from "react";

interface QuestionProps {
  onSendQuery: (query: string) => void;
}

export default function Question({ onSendQuery }: QuestionProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSendQuery() {
    const query = inputRef.current?.value;
    if (query && query.trim().length > 0) {
      
      onSendQuery(query);
    } else {
      return;
    }
  }

  return (
    <div className="sticky bottom-0 z-10 bg-white">
      <div className="flex p-4 gap-3 border-t-2 border-gray">
        <input
          ref={inputRef}
          className="w-[100%] bg-[#F3F4F6] pl-4 py-2 rounded-md outline-none"
          placeholder="Ask a question..."
        ></input>
        <div className="px-4 py-2 bg-black rounded-md hover:cursor-pointer">
          <ChevronRight onClick={handleSendQuery} color="white" />
        </div>
      </div>
    </div>
  );
}
