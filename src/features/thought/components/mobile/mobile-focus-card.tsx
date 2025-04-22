"use client"

import { motion } from "framer-motion"
import { Card } from "@/shared/components/ui/card"
import { Button } from "@/shared/components/ui/button"
import { CheckCircle, Clock, Pause, Play } from "lucide-react"
import { useState, useEffect } from "react"
import { useToast } from "@/shared/hooks/use-toast"
import { cn } from "@/shared/lib/utils"

interface MobileFocusCardProps {
  focus: string
}

export function MobileFocusCard({ focus }: MobileFocusCardProps) {
  const [timer, setTimer] = useState<number | null>(null)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const { toast } = useToast()

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const startTimer = () => {
    if (isRunning) return

    setIsRunning(true)
    const startTime = Date.now() - elapsedTime * 1000
    const id = window.setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTime) / 1000))
    }, 1000)
    setTimer(id as unknown as number)
  }

  const pauseTimer = () => {
    if (timer) {
      clearInterval(timer)
      setTimer(null)
    }
    setIsRunning(false)
  }

  const completeTask = () => {
    pauseTimer()
    toast({
      title: "任务完成",
      description: `您已完成"${focus}"，用时 ${formatTime(elapsedTime)}`,
    })
  }

  // 自动开始计时
  useEffect(() => {
    startTimer()
    return () => {
      if (timer) clearInterval(timer)
    }
  }, [])

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-violet-50 to-indigo-50 dark:from-violet-950/20 dark:to-indigo-950/20 p-4">
          <h2 className="text-base font-medium mb-1">当前专注</h2>
          <p className="text-xl font-medium">{focus}</p>

          {/* 计时器 */}
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className={cn("text-2xl font-mono transition-colors", isRunning && "text-primary")}>
                {formatTime(elapsedTime)}
              </span>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full h-10 w-10"
                onClick={isRunning ? pauseTimer : startTimer}
              >
                {isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>

              <Button size="sm" onClick={completeTask} className="rounded-full">
                <CheckCircle className="h-4 w-4 mr-1" />
                完成
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
