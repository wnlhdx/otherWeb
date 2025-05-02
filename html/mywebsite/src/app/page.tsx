// src/app/page.tsx
import React from "react";
import { Input } from "@/components/ui/input";   // shadcn/ui 生成的 Input
import { Button } from "@/components/ui/button"; // shadcn/ui 生成的 Button
import { Search } from "lucide-react";
import {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
  CommandEmpty
} from "@/components/ui/command";






export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white">
      {/* Logo */}
      <h1 className="text-5xl font-bold mb-8">Google</h1>

      {/* 搜索框与按钮组 */}
      <div className="w-full max-w-xl px-4">
        <Input
          className="w-full rounded-full border-gray-300 px-6 py-3 shadow-sm"
          placeholder="搜索 Google 或输入网址"
        />
        <div className="mt-6 flex justify-center space-x-4">
          <Button variant="outline">Google 搜索</Button>
          <Button>手气不错</Button>
        </div>
        <div className="relative w-full max-w-xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
          <Input className="pl-10 w-full rounded-full ..." />
        </div>
        <Command>
          <div className="relative w-full max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
            <CommandInput className="pl-10 w-full rounded-full ..." placeholder="搜索或输入命令" />
            <CommandList>
              <CommandEmpty>无匹配结果</CommandEmpty>
              <CommandItem value="ChatGPT">ChatGPT</CommandItem>
              <CommandItem value="Next.js">Next.js</CommandItem>
              {/* 更多建议 */}
            </CommandList>
          </div>
        </Command>
      </div>
    </main>
  );
}
