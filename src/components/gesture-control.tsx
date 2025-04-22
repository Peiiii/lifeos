"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Hand, HandMetal, Fingerprint } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function GestureControl() {
  const [isDetecting, setIsDetecting] = useState(false)
  const [lastGesture, setLastGesture] = useState<string | null>(null)
  const [showTutorial, setShowTutorial] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const { toast } = useToast()

  const toggleDetection = () => {
    if (isDetecting) {
      setIsDetecting(false)
      if (videoRef.current) {
        const stream = videoRef.current.srcObject as MediaStream
        if (stream) {
          stream.getTracks().forEach((track) => track.stop())
        }
        videoRef.current.srcObject = null
      }
    } else {
      setIsDetecting(true)
      startCamera()
    }
  }

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }

      // 模拟手势检测
      simulateGestureDetection()
    } catch (error) {
      console.error("无法访问摄像头:", error)
      toast({
        title: "无法启用手势控制",
        description: "请确保已授予摄像头权限",
        variant: "destructive",
      })
      setIsDetecting(false)
    }
  }

  const simulateGestureDetection = () => {
    const gestures = ["向上滑动 ↑", "向下滑动 ↓", "捏合 ⊙", "展开 ⊗", "旋转 ↻"]
    const gestureActions = ["滚动到顶部", "滚动到底部", "缩小视图", "展开视图", "刷新内容"]

    // 模拟随机手势检测
    const intervalId = setInterval(() => {
      if (!isDetecting) {
        clearInterval(intervalId)
        return
      }

      const randomIndex = Math.floor(Math.random() * gestures.length)
      const gesture = gestures[randomIndex]
      const action = gestureActions[randomIndex]

      setLastGesture(gesture)

      toast({
        title: `检测到手势: ${gesture}`,
        description: `执行操作: ${action}`,
      })
    }, 8000) // 每8秒检测一次手势，仅用于演示

    return () => clearInterval(intervalId)
  }

  useEffect(() => {
    return () => {
      if (videoRef.current) {
        const stream = videoRef.current.srcObject as MediaStream
        if (stream) {
          stream.getTracks().forEach((track) => track.stop())
        }
      }
    }
  }, [])

  return (
    <div className="relative">
      {isDetecting && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="fixed bottom-24 right-6 bg-background/80 backdrop-blur-md border rounded-lg shadow-lg p-4 w-64"
        >
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">手势控制已启用</h3>
            <button onClick={() => setShowTutorial(!showTutorial)} className="text-xs text-primary hover:underline">
              {showTutorial ? "隐藏教程" : "查看教程"}
            </button>
          </div>

          {showTutorial && (
            <div className="space-y-2 mb-3 text-sm">
              <p className="flex items-center gap-2">
                <span className="bg-secondary rounded-full p-1">
                  <HandMetal className="h-3 w-3" />
                </span>
                向上滑动 - 滚动到顶部
              </p>
              <p className="flex items-center gap-2">
                <span className="bg-secondary rounded-full p-1">
                  <HandMetal className="h-3 w-3" />
                </span>
                向下滑动 - 滚动到底部
              </p>
              <p className="flex items-center gap-2">
                <span className="bg-secondary rounded-full p-1">
                  <Fingerprint className="h-3 w-3" />
                </span>
                捏合/展开 - 缩小/放大视图
              </p>
            </div>
          )}

          <div className="relative aspect-video bg-black rounded-md overflow-hidden">
            <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
            <div className="absolute inset-0 flex items-center justify-center">
              {lastGesture && (
                <div className="bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                  {lastGesture}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}

      <motion.button
        onClick={toggleDetection}
        className={`fixed bottom-6 right-24 z-50 h-14 w-14 rounded-full shadow-lg flex items-center justify-center ${
          isDetecting ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
        }`}
        whileTap={{ scale: 0.9 }}
      >
        <Hand className="h-6 w-6" />
      </motion.button>
    </div>
  )
}
