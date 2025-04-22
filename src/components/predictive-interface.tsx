"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, X, Brain } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Prediction {
  id: string
  action: string
  context: string
  confidence: number
  time: string
}

export function PredictiveInterface() {
  const [predictions, setPredictions] = useState<Prediction[]>([])
  const [showingPrediction, setShowingPrediction] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    // 模拟预测系统
    const possiblePredictions = [
      {
        action: "创建会议笔记",
        context: "您的日历显示10分钟后有会议",
        confidence: 0.92,
        time: "即将到来",
      },
      {
        action: "回复张总的邮件",
        context: "基于您的工作习惯和优先级",
        confidence: 0.87,
        time: "建议现在处理",
      },
      {
        action: "开始专注工作模式",
        context: "现在是您通常的高效工作时段",
        confidence: 0.95,
        time: "适合现在开始",
      },
      {
        action: "休息提醒",
        context: "您已连续工作2小时",
        confidence: 0.89,
        time: "建议短暂休息",
      },
      {
        action: "准备回家",
        context: "接近您通常的下班时间",
        confidence: 0.82,
        time: "30分钟后",
      },
    ]

    // 模拟随机预测出现
    const intervalId = setInterval(() => {
      if (showingPrediction) return

      const shouldShowPrediction = Math.random() > 0.7
      if (shouldShowPrediction) {
        const randomPrediction = possiblePredictions[Math.floor(Math.random() * possiblePredictions.length)]
        const newPrediction = {
          ...randomPrediction,
          id: Date.now().toString(),
        }

        setPredictions([newPrediction])
        setShowingPrediction(true)

        // 如果用户不响应，10秒后自动消失
        setTimeout(() => {
          setPredictions((prev) => prev.filter((p) => p.id !== newPrediction.id))
          setShowingPrediction(false)
        }, 10000)
      }
    }, 15000) // 每15秒检查是否显示预测，仅用于演示

    return () => clearInterval(intervalId)
  }, [showingPrediction])

  const handleAccept = (prediction: Prediction) => {
    toast({
      title: "已接受预测",
      description: `正在执行: ${prediction.action}`,
    })
    setPredictions((prev) => prev.filter((p) => p.id !== prediction.id))
    setShowingPrediction(false)
  }

  const handleDismiss = (prediction: Prediction) => {
    toast({
      title: "已忽略预测",
      description: "系统将学习您的偏好",
    })
    setPredictions((prev) => prev.filter((p) => p.id !== prediction.id))
    setShowingPrediction(false)
  }

  return (
    <AnimatePresence>
      {predictions.map((prediction) => (
        <motion.div
          key={prediction.id}
          className="fixed bottom-24 left-6 z-50 max-w-sm"
          initial={{ opacity: 0, x: -50, y: 0 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="border-none shadow-lg bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/20">
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <div className="bg-background rounded-full p-2 shadow-sm">
                  <Brain className="h-5 w-5 text-blue-500" />
                </div>
                <div className="flex-1 space-y-2">
                  <div>
                    <h3 className="font-medium">{prediction.action}</h3>
                    <p className="text-sm text-muted-foreground">{prediction.context}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="h-1.5 flex-1 bg-background rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500" style={{ width: `${prediction.confidence * 100}%` }}></div>
                    </div>
                    <span className="text-xs text-muted-foreground">{Math.round(prediction.confidence * 100)}%</span>
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs text-muted-foreground">{prediction.time}</span>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0"
                        onClick={() => handleDismiss(prediction)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                      <Button size="sm" className="h-8 w-8 p-0" onClick={() => handleAccept(prediction)}>
                        <Check className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </AnimatePresence>
  )
}
