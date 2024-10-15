import { useContext, useEffect, useRef, useState } from "react";
import { ChatModel } from "../../models/chat/ChatModel";
import { FileText, User } from "lucide-react";
import { AuthContext } from "../../store/AuthContext";
import { PulseLoader } from "react-spinners";

interface ChatBoxProps {
  chatData: ChatModel[] | [];
  chatLoading: boolean;
}

const renderExampleWithLinks = (example: string) => {
  const urlRegex =
    /(https?:\/\/[^\s]+|(?:www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,6})/g;
  const parts = example.split(urlRegex);

  return parts.map((part, index) => {
    const cleanedPart = part.replace(/\*\*/g, "").trim();

    if (urlRegex.test(cleanedPart)) {
      return (
        <a
          target="_blank"
          key={index}
          href={
            cleanedPart.startsWith("http")
              ? cleanedPart
              : `http://${cleanedPart}`
          }
          rel="noopener noreferrer"
          className="text-black font-semibold hover:underline"
        >
          {cleanedPart}
        </a>
      );
    }
    return <span key={index}>{cleanedPart}</span>;
  });
};

export default function ChatBox({ chatData, chatLoading }: ChatBoxProps) {
  const [chat, setChat] = useState<ChatModel[]>(chatData);
  const [welcomeMessage, setWelcomeMessage] = useState<string>("");
  const chatBoxRef = useRef<HTMLDivElement | null>(null);
  const { authUser } = useContext(AuthContext);

  const welcomeMessages = [
    "Hello", // English
    "Bonjour", // French
    "வணக்கம்", // Tamil
    "Hallo", // German
    "ようこそ", // Japanese
    "హలో", // Telugu
    "ഹലോ", // Malayalam
    "नमस्ते", // Hindi
    "Hola", // Spanish
    "ಹಲೋ", // Kannada
    "Olá", // Portuguese
    "مرحبا", // Arabic
    "Ciao", // Italian
  ];

  useEffect(() => {
    setChat(chatData);
  }, [chatData]);

  useEffect(() => {
    if (chat.length === 0) {
      setWelcomeMessage(welcomeMessages[0]);

      const intervalId = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * welcomeMessages.length);
        setWelcomeMessage(welcomeMessages[randomIndex]);
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [chat.length]);

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
  }, [chat, chatLoading]);

  return (
    <div ref={chatBoxRef} className="w-full flex-1 overflow-y-auto p-5">
      {chat.length > 0
        ? chat.map((msg, index) => {
            const pointsArray = Object.entries(msg.points);
            return (
              <div key={index}>
                <div className="my-10">
                  <section className="flex gap-1 items-center flex-row-reverse">
                    <User className="text-gray-600" />
                    <p className="font-semibold text-xl">
                      {authUser!.userName}
                    </p>
                  </section>
                  <p className="mr-7 my-1 text-gray-600 text-right">
                    {msg.query}
                  </p>
                </div>
                <div>
                  <section className="flex gap-1 items-center mb-2">
                    <FileText className="text-gray-600" />
                    <p className="font-semibold text-xl">VerbiSense</p>
                  </section>
                  <p className="md:ml-7 ml-4 my-1 mt-4 font text-lg font-medium">
                    {msg.heading1}
                  </p>
                  <p className="md:ml-16 ml-7 my-1 text-gray-600 leading-relaxed">
                    {msg.key_takeaways}
                  </p>
                  {pointsArray.map(([key, values]) => (
                    <div key={key}>
                      <h3 className="md:ml-7 ml-4 my-2">{key}</h3>
                      <ul className="list-disc list-inside leading-loose">
                        {values.map((value, index) => (
                          <li
                            className="md:ml-16 ml-7 break-words  text-gray-600"
                            key={index}
                          >
                            {renderExampleWithLinks(value)}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  {msg.example.length !== 0 &&
                    msg.heading1.length !== 0 &&
                    msg.heading2.length !== 0 &&
                    pointsArray.length !== 0 && (
                      <p className="md:ml-7 ml-4 my-1 font text-lg leading-relaxed">
                        Summary
                      </p>
                    )}
                  <p className="md:ml-16 ml-7 my-1 text-gray-600">
                    {msg.summary}
                  </p>
                  {msg.example.length > 0 && (
                    <div>
                      <p className="md:ml-7 ml-4 my-1 font text-lg leading-relaxed">
                        Example
                      </p>
                      {msg.example.map((example, exampleIndex) => (
                        <li
                          key={exampleIndex}
                          className="md:ml-16 ml-7 my-1 text-gray-600 leading-loose"
                        >
                          {renderExampleWithLinks(example)}
                        </li>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })
        : !chatLoading && (
            <div className="flex flex-col justify-center items-center h-full">
              <p className=" text-[50px] md:text-[65px]">{welcomeMessage}</p>
              <p>Ask me Anything!</p>
            </div>
          )}
      {chatLoading && (
        <div className="flex items-center justify-center my-5">
          <PulseLoader color="#000000" loading={true} size={15} />
        </div>
      )}
    </div>
  );
}
