"use client"

import type React from "react"

import { useState } from "react"
import { Home, Calendar, Plus, MessageSquare, Sparkles } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { useAmbientContext } from "@/context/ambient-context"

interface MobileActionBarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export function MobileActionBar({ activeTab, setActiveTab }: MobileActionBarProps) {
  const [isQuickActionOpen, setIsQuickActionOpen] = useState(false)
  const [isCapturing, setIsCapturing] = useState(false)
  const [captureInput, setCaptureInput] = useState("")
  const { toast } = useToast()
  const { processThought } = useAmbientContext()

  const quickActions = [
    {
      icon: <MessageSquare className="h-5 w-5" />,
      label: "捕获想法",
      action: () => {
        setIsQuickActionOpen(false)
        setIsCapturing(true)
      },
    },
    {
      icon: <Calendar className="h-5 w-5" />,
      label: "添加任务",
      action: () => {
        setIsQuickActionOpen(false)
        setIsCapturing(true)
        setCaptureInput("任务：")
      },
    },
    {
      icon: <Sparkles className="h-5 w-5" />,
      label: "AI助手",
      action: () => {
        toast({
          title: "AI助手已激活",
          description: "请说出您需要的帮助",
        })
        setIsQuickActionOpen(false)
      },
    },
  ]

  const handleCapture = async () => {
    if (!captureInput.trim()) return

    try {
      await processThought(captureInput)
      toast({
        title: "已捕获",
        description: "AI已处理您的输入",
      })
      setCaptureInput("")
      setIsCapturing(false)
    } catch (error) {
      toast({
        title: "处理失败",
        description: "请稍后再试",
        variant: "destructive",
      })
    }
  }

  return (
    <>
      {/* 快速捕获界面 */}
      <AnimatePresence>
        {isCapturing && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex flex-col"
          >
            <div className="flex-1 flex flex-col p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium">快速捕获</h2>
                <Button variant="ghost" size="sm" onClick={() => setIsCapturing(false)}>
                  取消
                </Button>
              </div>

              <textarea
                value={captureInput}
                onChange={(e) => setCaptureInput(e.target.value)}
                placeholder="写下任何想法..."
                className="flex-1 p-3 rounded-md border resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                autoFocus
              />

              <Button className="mt-4 w-full" onClick={handleCapture} disabled={!captureInput.trim()}>
                处理
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 快速操作菜单 */}
      <AnimatePresence>
        {isQuickActionOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-x-0 bottom-20 z-20 px-4"
          >
            <div className="bg-background border rounded-xl shadow-lg p-4 flex flex-col gap-2">
              {quickActions.map((action, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors text-left"
                  onClick={action.action}
                >
                  <div className="bg-primary/10 rounded-full p-2">{action.icon}</div>
                  <span>{action.label}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 底部导航栏 */}
      <div className="fixed inset-x-0 bottom-0 z-10 bg-background border-t">
        <div className="flex items-center justify-around h-16">
          <TabButton
            icon={<Home className="h-5 w-5" />}
            label="专注"
            isActive={activeTab === "focus"}
            onClick={() => setActiveTab("focus")}
          />

          <TabButton
            icon={<Calendar className="h-5 w-5" />}
            label="任务"
            isActive={activeTab === "tasks"}
            onClick={() => setActiveTab("tasks")}
          />

          {/* 中间的快速操作按钮 */}
          <div className="-mt-5">
            <Button
              size="lg"
              className={cn(
                "h-14 w-14 rounded-full shadow-lg transition-all",
                isQuickActionOpen ? "bg-red-500 hover:bg-red-600 rotate-45" : "bg-primary hover:bg-primary/90",
              )}
              onClick={() => setIsQuickActionOpen(!isQuickActionOpen)}
            >
              <Plus className="h-6 w-6" />
            </Button>
          </div>

          <TabButton
            icon={<MessageSquare className="h-5 w-5" />}
            label="洞察"
            isActive={activeTab === "insights"}
            onClick={() => setActiveTab("insights")}
          />

          <TabButton
            icon={<Sparkles className="h-5 w-5" />}
            label="AI"
            isActive={activeTab === "ai"}
            onClick={() => {
              toast({
                title: "AI助手已激活",
                description: "请说出您需要的帮助",
              })
            }}
          />
        </div>
      </div>
    </>
  )
}

interface TabButtonProps {
  icon: React.ReactNode
  label: string
  isActive: boolean
  onClick: () => void
}

function TabButton({ icon, label, isActive, onClick }: TabButtonProps) {
  return (
    <button
      className={cn(
        "flex flex-col items-center justify-center w-16 py-1",
        isActive ? "text-primary" : "text-muted-foreground",
      )}
      onClick={onClick}
    >
      {icon}
      <span className="text-[10px] mt-1">{label}</span>
    </button>
  )
}
