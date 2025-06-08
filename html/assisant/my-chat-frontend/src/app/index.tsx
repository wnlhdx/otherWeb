import React, { useState } from "react";
import { MessageProvider, useMessage } from "../context/MessageContext";

function ChatWindow() {
  const { messages } = useMessage();

  return (
    <div className="h-[calc(100vh-100px)] overflow-auto p-4 flex flex-col space-y-2 bg-white rounded shadow">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`p-2 rounded max-w-xs ${
            msg.role === "user" ? "bg-blue-200 self-end" : "bg-gray-200 self-start"
          }`}
        >
          <p>{msg.content}</p>
        </div>
      ))}
    </div>
  );
}

function MessageInput() {
  const { sendMessage } = useMessage();
  const [text, setText] = useState("");

  const handleSend = async () => {
    if (!text.trim()) return;
    await sendMessage(text.trim());
    setText("");
  };

  return (
    <div className="p-4 bg-gray-100 flex gap-2">
      <input
        className="flex-grow p-2 rounded border border-gray-300"
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        placeholder="输入消息，按回车发送"
      />
      <button
        onClick={handleSend}
        className="bg-blue-500 text-white px-4 rounded hover:bg-blue-600"
      >
        发送
      </button>
    </div>
  );
}

export default function Home() {
  return (
    <MessageProvider>
      <div className="flex flex-col max-w-2xl mx-auto h-screen">
        <ChatWindow />
        <MessageInput />
      </div>
    </MessageProvider>
  );
}
