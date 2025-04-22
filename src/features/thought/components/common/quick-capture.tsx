"use client"

import { useState } from "react"
import { Card, CardContent } from "@/shared/components/ui/card"
import { Input } from "@/shared/components/ui/input"
import { Button } from "@/shared/components/ui/button"
import { Sparkles } from "lucide-react"
import { useToast } from "@/shared/hooks/use-toast"

export function QuickCapture() {
  const [input, setInput] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const { toast } = useToast()

  const handleCapture = async () => {
    if (!input.trim()) return

    setIsProcessing(true)

    // 模拟处理
    setTimeout(() => {
      setIsProcessing(false)
      setInput("")

      toast({
        title: "已捕获",
        description: "AI已处理您的输入并添加到相应区域",
      })
    }, 1500)
  }

  return (
    <Card className="bg-gradient-to-r from-violet-50 to-indigo-50 dark:from-violet-950/20 dark:to-indigo-950/20 border-none shadow-md">
      <CardContent className="pt-6">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="快速捕获任何内容...AI将自动分类并处理"
            className="bg-background/80 backdrop-blur-sm"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handleCapture()
              }
            }}
          />
          <Button onClick={handleCapture} disabled={!input.trim() || isProcessing} className="gap-1">
            <Sparkles className="h-4 w-4" />
            {isProcessing ? "处理中..." : "捕获"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
