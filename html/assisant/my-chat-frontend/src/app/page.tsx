'use client';

import React, { useState, useRef } from 'react';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  async function sendMessage() {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      // 调用后端聊天接口，示例地址/api/chat
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      if (!res.ok) {
        throw new Error('请求失败');
      }

      const data = await res.json();
      const assistantMessage = { role: 'assistant', content: data.reply };

      setMessages((prev) => [...prev, assistantMessage]);

      // 播放语音，示例接口 /api/voice?text=xxx
      if (audioRef.current) {
        audioRef.current.src = `/api/voice?text=${encodeURIComponent(data.reply)}`;
        audioRef.current.play();
      }
    } catch (error) {
      alert('发送消息失败，请检查后端服务');
      console.error(error);
    } finally {
      setLoading(false);
      setInput('');
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <main className="max-w-xl mx-auto p-4 flex flex-col h-screen">
      <h1 className="text-2xl font-bold mb-4">智能助理聊天</h1>

      <div className="flex-grow overflow-y-auto border rounded p-3 mb-3">
        {messages.length === 0 && (
          <p className="text-gray-400 text-center mt-10">请输入消息开始聊天</p>
        )}
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`my-2 p-2 rounded max-w-[80%] ${
              msg.role === 'user'
                ? 'bg-blue-200 text-right self-end'
                : 'bg-gray-200 text-left self-start'
            }`}
          >
            {msg.content}
          </div>
        ))}
        {loading && <p className="text-gray-500">助手正在输入...</p>}
      </div>

      <textarea
        className="border rounded p-2 mb-2 resize-none"
        rows={3}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="请输入内容，回车发送，Shift+Enter换行"
        disabled={loading}
      />

      <button
        className="bg-blue-500 text-white py-2 rounded disabled:opacity-50"
        onClick={sendMessage}
        disabled={loading || !input.trim()}
      >
        发送
      </button>

      <audio ref={audioRef} hidden />
    </main>
  );
}
