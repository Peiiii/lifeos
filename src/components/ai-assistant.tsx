"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Bot, Mic, Send } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type Message = {
  role: "user" | "assistant"
  content: string
}

export default function AIAssistant() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "你好！我是你的AI助手。我能帮你管理任务、安排日程、记录笔记，或者回答你的问题。有什么我能帮到你的吗？",
    },
  ])
  const [isProcessing, setIsProcessing] = useState(false)

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      role: "user",
      content: input,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsProcessing(true)

    // 模拟AI响应
    setTimeout(() => {
      const assistantMessage: Message = {
        role: "assistant",
        content: getAIResponse(input),
      }
      setMessages((prev) => [...prev, assistantMessage])
      setIsProcessing(false)
    }, 1000)
  }

  const getAIResponse = (query: string): string => {
    // 简单的模拟响应逻辑
    if (query.includes("任务") || query.includes("待办")) {
      return "我已为您创建了新任务。您想设置截止日期或提醒吗？"
    } else if (query.includes("日程") || query.includes("安排")) {
      return "我已查看您的日程安排。今天下午2点您有一个会议，明天上午10点有一个截止日期。"
    } else if (query.includes("笔记") || query.includes("记录")) {
      return "我已保存您的笔记。您想将其与任何项目关联吗？"
    } else {
      return "我理解了。还有什么我能帮您的吗？"
    }
  }

  return (
    <>
      <Button variant="outline" size="icon" onClick={() => setOpen(true)}>
        <Bot className="h-5 w-5" />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>AI助手</DialogTitle>
            <DialogDescription>您的个人AI助手，随时为您提供帮助</DialogDescription>
          </DialogHeader>

          <ScrollArea className="h-[300px] pr-4">
            <div className="space-y-4 pt-4">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`flex gap-3 max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : ""}`}>
                    <Avatar className="h-8 w-8">
                      {message.role === "assistant" ? (
                        <>
                          <AvatarImage src="/placeholder.svg?height=32&width=32" />
                          <AvatarFallback>AI</AvatarFallback>
                        </>
                      ) : (
                        <>
                          <AvatarImage src="/placeholder.svg?height=32&width=32" />
                          <AvatarFallback>ME</AvatarFallback>
                        </>
                      )}
                    </Avatar>
                    <div
                      className={`rounded-lg px-4 py-2 ${
                        message.role === "assistant"
                          ? "bg-secondary text-secondary-foreground"
                          : "bg-primary text-primary-foreground"
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                </div>
              ))}
              {isProcessing && (
                <div className="flex justify-start">
                  <div className="flex gap-3 max-w-[80%]">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" />
                      <AvatarFallback>AI</AvatarFallback>
                    </Avatar>
                    <div className="rounded-lg px-4 py-2 bg-secondary text-secondary-foreground">
                      <div className="flex space-x-1">
                        <div className="h-2 w-2 animate-bounce rounded-full bg-secondary-foreground"></div>
                        <div
                          className="h-2 w-2 animate-bounce rounded-full bg-secondary-foreground"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                        <div
                          className="h-2 w-2 animate-bounce rounded-full bg-secondary-foreground"
                          style={{ animationDelay: "0.4s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="shrink-0">
              <Mic className="h-4 w-4" />
            </Button>
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="输入消息..."
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  handleSend()
                }
              }}
            />
            <Button size="icon" className="shrink-0" onClick={handleSend} disabled={!input.trim() || isProcessing}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
