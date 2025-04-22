"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Mic, X, Sparkles, MessageSquarePlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { useAmbientContext } from "@/context/ambient-context"

export function MobileOptimizedThoughtCapture() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState("")
  const [isListening, setIsListening] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const { toast } = useToast()
  const { processThought } = useAmbientContext()

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const handleCapture = async () => {
    if (!input.trim()) return

    setIsProcessing(true)

    try {
      await processThought(input)

      toast({
        title: "思绪已捕获",
        description: "AI已理解并处理您的想法",
      })

      setInput("")
      setIsOpen(false)
    } catch (error) {
      toast({
        title: "处理失败",
        description: "无法处理您的想法，请重试",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const toggleListening = () => {
    // 模拟语音识别
    if (!isListening) {
      setIsListening(true)
      setTimeout(() => {
        setInput((prev) => prev + "这是通过语音识别添加的内容。")
        setIsListening(false)
      }, 2000)
    } else {
      setIsListening(false)
    }
  }

  return (
    <>
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            className="fixed inset-0 bg-background z-50 flex flex-col"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
          >
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-medium">捕获思绪</h2>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex-1 p-4 flex flex-col">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="写下任何想法、任务、笔记或问题...AI将理解并处理"
                className="w-full flex-1 p-4 rounded-md border bg-background resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                disabled={isProcessing}
              />

              <div className="mt-4 flex justify-between items-center">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={toggleListening}
                  className={isListening ? "bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400" : ""}
                >
                  <Mic className="h-4 w-4" />
                </Button>
                <Button onClick={handleCapture} disabled={!input.trim() || isProcessing} className="gap-1">
                  {isProcessing ? (
                    <>处理中...</>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" />
                      处理
                    </>
                  )}
                </Button>
              </div>

              <div className="mt-4 text-xs text-muted-foreground">
                <p>AI将自动理解您的输入，无需指定类别或标签。</p>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            className="fixed bottom-6 right-6 z-50"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
          >
            <Button onClick={() => setIsOpen(true)} size="lg" className="h-14 w-14 rounded-full shadow-lg">
              <MessageSquarePlus className="h-6 w-6" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
