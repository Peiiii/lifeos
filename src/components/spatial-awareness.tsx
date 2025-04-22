"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useToast } from "@/hooks/use-toast"
import { useAmbientContext } from "@/context/ambient-context"
import { Card } from "@/components/ui/card"
import { MapPin, Wifi, Clock } from "lucide-react"

export function SpatialAwareness() {
  const [currentContext, setCurrentContext] = useState<{
    location: string
    time: string
    environment: string
  }>({
    location: "未知",
    time: "未知",
    environment: "未知",
  })
  const [isVisible, setIsVisible] = useState(false)
  const { toast } = useToast()
  const { updateSpatialContext } = useAmbientContext()

  useEffect(() => {
    // 模拟空间感知系统
    const detectContext = async () => {
      // 在真实应用中，这里会使用GPS、WiFi信号、环境声音分析等
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const newContext = {
        location: "办公室",
        time: "工作时间",
        environment: "安静，适合专注工作",
      }

      setCurrentContext(newContext)
      updateSpatialContext(newContext)
      setIsVisible(true)

      toast({
        title: "环境已识别",
        description: "已根据您的环境调整系统行为",
      })
    }

    detectContext()

    // 模拟环境变化
    const intervalId = setInterval(() => {
      const environments = [
        {
          location: "办公室",
          time: "工作时间",
          environment: "安静，适合专注工作",
        },
        {
          location: "咖啡厅",
          time: "休息时间",
          environment: "适中噪音，适合创意思考",
        },
        {
          location: "会议室",
          time: "会议时间",
          environment: "多人交谈，正在进行会议",
        },
        {
          location: "家",
          time: "个人时间",
          environment: "放松，适合休息",
        },
      ]

      const randomEnvironment = environments[Math.floor(Math.random() * environments.length)]
      setCurrentContext(randomEnvironment)
      updateSpatialContext(randomEnvironment)
    }, 30000) // 每30秒变化一次环境，仅用于演示

    return () => clearInterval(intervalId)
  }, [toast, updateSpatialContext])

  if (!isVisible) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-4"
    >
      <Card className="bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-950/20 dark:to-gray-950/10 border-none shadow-sm">
        <div className="p-4">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              <span>{currentContext.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{currentContext.time}</span>
            </div>
            <div className="flex items-center gap-1">
              <Wifi className="h-3 w-3" />
              <span>{currentContext.environment}</span>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
