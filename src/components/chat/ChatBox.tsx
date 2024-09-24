import { useEffect, useState } from "react";
import { ChatModel } from "../../models/chat/ChatModel";
import { FileText, User } from "lucide-react";

interface ChatBoxProps {
  chatData: ChatModel[] | [];
}
export default function ChatBox({ chatData }: ChatBoxProps) {
  const [chat, setChat] = useState<ChatModel[] | []>(chatData);
  useEffect(() => {
    setChat(chatData);
  }, [chatData]);

  return (
    <div className="w-full flex-1 overflow-y-auto p-5">
      {chat &&
        chat.map((msg, index) => {
          const pointsArray = Object.entries(msg.points);

          return (
            <div key={index}>
              <div className="my-10">
                <section className="flex gap-1 items-centre flex-row-reverse">
                  <User className="text-gray-600" />
                  <p className="font-semibold text-xl">You</p>
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
                <p className="ml-7 my-1 font text-lg">{msg.heading1}</p>
                {/* <p className="ml-7 my-1 text-gray-600">{msg.heading2}</p> */}
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
                <p className="ml-7 my-1 font text-lg leading-relaxed">
                  Summary
                </p>
                <p className="ml-16 my-1 text-gray-600">{msg.summary}</p>
                <p className="ml-7 my-1 text-gray-600">{msg.example}</p>
              </div>
            </div>
          );
        })}
    </div>
  );
}
