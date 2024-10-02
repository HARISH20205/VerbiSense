import { ChevronRight } from "lucide-react";
import { useRef, useState } from "react";

interface QuestionProps {
  onSendQuery: (query: string) => void;
}

export default function Question({ onSendQuery }: QuestionProps) {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [inputHeight, setInputHeight] = useState<number>(40);

  const adjustHeight = () => {
    if (inputRef.current) {
      if (inputRef.current.value === "") {
        inputRef.current.style.height = "40px";
        setInputHeight(40);
      } else {
        const newHeight = Math.min(inputRef.current.scrollHeight, 200);
        inputRef.current.style.height = `${newHeight}px`;
        setInputHeight(newHeight);
      }
    }
  };

  async function handleSendQuery() {
    const query = inputRef.current?.value;
    if (query && query.trim().length > 0 && query.trim().length <= 6000) {
      inputRef.current.value = "";
      setInputHeight(40);
      onSendQuery(query);
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSendQuery();
    }
  };

  return (
    <div className="sticky bottom-0 z-10 bg-white">
      <div className="flex items-end p-4 gap-3 border-t-2 border-gray">
        <textarea
          ref={inputRef}
          onKeyDown={handleKeyDown}
          onInput={adjustHeight}
          style={{ height: inputHeight }}
          className="w-full bg-[#F3F4F6] pl-4 py-2 rounded-md outline-none resize-none overflow-y-auto"
          placeholder="Ask a question..."
        ></textarea>
        <div
          onClick={handleSendQuery}
          className="flex h-[40px] items-center justify-center px-4 py-2 bg-black rounded-md hover:cursor-pointer"
        >
          <ChevronRight color="white" />
        </div>
      </div>
    </div>
  );
}
