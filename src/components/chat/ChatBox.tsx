import { useEffect, useState } from "react";
import { ChatModel } from "../../models/chat/ChatModel";
import { User } from "lucide-react";

interface ChatBoxProps {
  chatData: ChatModel[] | [];
}
export default function ChatBox({ chatData }: ChatBoxProps) {
  const [chat, setChat] = useState<ChatModel[] | []>(chatData);
  useEffect(() => {
    setChat(chatData);
  }, [chatData]);
  console.log(chat);

  return (
    <div className="w-full flex-1 overflow-y-auto p-5">
      {chat &&
        chat.map((msg) => (
          <div>
            <div>
              <section className="flex gap-1 items-center">
                <User className="text-gray-600" />
                <p className="font-semibold">You</p>
              </section>
              <p className="ml-7 my-1">{msg.query}</p>
            </div>
          </div>
        ))}
    </div>
  );
}
