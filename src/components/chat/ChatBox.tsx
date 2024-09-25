import { useEffect, useRef, useState } from "react";
import { ChatModel } from "../../models/chat/ChatModel";
import { FileText, User } from "lucide-react";

interface ChatBoxProps {
  chatData: ChatModel[] | [];
  chatLoading: boolean;
}

export default function ChatBox({ chatData, chatLoading }: ChatBoxProps) {
  const [chat, setChat] = useState<ChatModel[]>(chatData);
  const chatBoxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setChat(chatData);
  }, [chatData]);

  useEffect(() => {
    const animateScroll = (target: number) => {
      const start = chatBoxRef.current?.scrollTop || 0;
      const distance = target - start;
      const duration = 2000;
      let startTime: number | null = null;

      const animation = (currentTime: number) => {
        if (startTime === null) startTime = currentTime;
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        chatBoxRef.current!.scrollTop = start + distance * progress;

        if (progress < 1) {
          requestAnimationFrame(animation);
        }
      };

      requestAnimationFrame(animation);
    };

    animateScroll(chatBoxRef.current?.scrollHeight || 0);
  }, [chat]);

  const renderExampleWithLinks = (example: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = example.split(urlRegex);

    return parts.map((part, index) => {
      const cleanedPart = part.replace(/\*\*/g, "");

      if (urlRegex.test(cleanedPart)) {
        return (
          <a
            key={index}
            href={cleanedPart}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500"
          >
            {cleanedPart}
          </a>
        );
      }
      return <span key={index}>{cleanedPart}</span>;
    });
  };

  return (
    <div ref={chatBoxRef} className="w-full flex-1 overflow-y-auto p-5">
      {chat.map((msg, index) => {
        const pointsArray = Object.entries(msg.points);

        return (
          <div key={index}>
            <div className="my-10">
              <section className="flex gap-1 items-center flex-row-reverse">
                <User className="text-gray-600" />
                <p className="font-semibold text-xl">You</p>
              </section>
              <p className="mr-7 my-1 text-gray-600 text-right">{msg.query}</p>
            </div>
            <div>
              <section className="flex gap-1 items-center mb-2">
                <FileText className="text-gray-600" />
                <p className="font-semibold text-xl">VerbiSense</p>
              </section>
              <p className="ml-7 my-1 font text-lg">{msg.heading1}</p>
              <p className="ml-16 my-1 text-gray-600 leading-relaxed">
                {msg.key_takeaways}
              </p>
              {pointsArray.map(([key, values]) => (
                <div key={key}>
                  <h3 className="ml-7 my-2">{key}</h3>
                  <ul className="list-disc list-inside leading-loose">
                    {values.map((value, index) => (
                      <li className="ml-16 text-gray-600" key={index}>
                        {value.toString()}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <p className="ml-7 my-1 font text-lg leading-relaxed">Summary</p>
              <p className="ml-16 my-1 text-gray-600">{msg.summary}</p>
              {msg.example.length > 0 && (
                <div>
                  <p className="ml-7 my-1 font text-lg leading-relaxed">
                    Example
                  </p>
                  {msg.example.map((example, exampleIndex) => (
                    <li
                      key={exampleIndex}
                      className="ml-16 my-1 text-gray-600 leading-loose"
                    >
                      {renderExampleWithLinks(example)}
                    </li>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      })}
      {chatLoading && (
        <div className="flex justify-center my-4">
          <div className="spinner"></div>
        </div>
      )}
    </div>
  );
}
