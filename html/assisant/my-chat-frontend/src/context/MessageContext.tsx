import React, { createContext, useContext, useState, ReactNode } from "react";

export type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

type MessageContextType = {
  messages: Message[];
  addMessage: (msg: Message) => void;
  sendMessage: (content: string) => Promise<void>;
  clearMessages: () => void;
};

const MessageContext = createContext<MessageContextType | undefined>(undefined);

export const MessageProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<Message[]>([]);

  const addMessage = (msg: Message) => {
    setMessages((prev) => [...prev, msg]);
  };

  const clearMessages = () => {
    setMessages([]);
  };

  // 模拟发送消息和接收回复
  const sendMessage = async (content: string) => {
    const userMsg: Message = { id: Date.now().toString(), role: "user", content };
    addMessage(userMsg);

    // 这里你后续改成真实API调用
    await new Promise((r) => setTimeout(r, 1000)); // 模拟等待

    const replyMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: `这是模拟回复: ${content}`,
    };
    addMessage(replyMsg);
  };

  return (
    <MessageContext.Provider
      value={{ messages, addMessage, sendMessage, clearMessages }}
    >
      {children}
    </MessageContext.Provider>
  );
};

export const useMessage = () => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error("useMessage必须在MessageProvider内使用");
  }
  return context;
};
