"use client"

import { useState, useEffect } from "react"
import { useAmbientContext } from "@/context/ambient-context"
import { MobileHeader } from "@/components/mobile/mobile-header"
import { MobileActionBar } from "@/components/mobile/mobile-action-bar"
import { MobileFocusCard } from "@/components/mobile/mobile-focus-card"
import { MobileTaskList } from "@/components/mobile/mobile-task-list"
import { MobileInsightCard } from "@/components/mobile/mobile-insight-card"
import { MobileContextBanner } from "@/components/mobile/mobile-context-banner"
import { AnimatePresence, motion } from "framer-motion"

export function MobileHome() {
  const { ambientState } = useAmbientContext()
  const [timeOfDay, setTimeOfDay] = useState<string>("")
  const [greeting, setGreeting] = useState<string>("")
  const [activeTab, setActiveTab] = useState<string>("focus")
  const [showWelcome, setShowWelcome] = useState(true)

  useEffect(() => {
    const hour = new Date().getHours()

    if (hour >= 5 && hour < 12) {
      setTimeOfDay("morning")
      setGreeting("早上好")
    } else if (hour >= 12 && hour < 18) {
      setTimeOfDay("afternoon")
      setGreeting("下午好")
    } else {
      setTimeOfDay("evening")
      setGreeting("晚上好")
    }

    // 欢迎屏幕自动消失
    const timer = setTimeout(() => {
      setShowWelcome(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  // 根据当前时间和用户习惯智能推荐最相关的标签
  useEffect(() => {
    const hour = new Date().getHours()
    // 早上优先显示今日计划，中午和下午优先显示任务，晚上优先显示回顾
    if (hour >= 5 && hour < 10) {
      setActiveTab("focus")
    } else if (hour >= 10 && hour < 18) {
      setActiveTab("tasks")
    } else {
      setActiveTab("insights")
    }
  }, [])

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-background"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.1, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <h1 className="text-3xl font-light">{greeting}</h1>
              <p className="text-muted-foreground mt-2">准备好开始美好的一天</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 顶部区域 - 固定高度，不随滚动变化 */}
      <MobileHeader greeting={greeting} timeOfDay={timeOfDay} />

      {/* 情境感知横幅 - 只在有相关信息时显示 */}
      {ambientState.spatialContext && <MobileContextBanner context={ambientState.spatialContext} />}

      {/* 主内容区 - 可滚动 */}
      <main className="flex-1 overflow-y-auto pb-20">
        <div className="px-4 py-2">
          {/* 标签切换 - 简化为3个主要标签 */}
          <div className="flex border-b mb-4">
            <button
              className={`flex-1 py-3 text-center text-sm font-medium ${
                activeTab === "focus" ? "text-primary border-b-2 border-primary" : "text-muted-foreground"
              }`}
              onClick={() => setActiveTab("focus")}
            >
              专注
            </button>
            <button
              className={`flex-1 py-3 text-center text-sm font-medium ${
                activeTab === "tasks" ? "text-primary border-b-2 border-primary" : "text-muted-foreground"
              }`}
              onClick={() => setActiveTab("tasks")}
            >
              任务
            </button>
            <button
              className={`flex-1 py-3 text-center text-sm font-medium ${
                activeTab === "insights" ? "text-primary border-b-2 border-primary" : "text-muted-foreground"
              }`}
              onClick={() => setActiveTab("insights")}
            >
              洞察
            </button>
          </div>

          {/* 专注模式内容 */}
          {activeTab === "focus" && (
            <div className="space-y-4">
              {ambientState.currentFocus && <MobileFocusCard focus={ambientState.currentFocus} />}

              <div className="mt-6">
                <h2 className="text-lg font-medium mb-3">今日优先事项</h2>
                <MobileTaskList
                  tasks={ambientState.upcomingTasks.slice(0, 3)}
                  emptyMessage="今天没有优先事项，享受轻松的一天吧！"
                />
              </div>
            </div>
          )}

          {/* 任务列表内容 */}
          {activeTab === "tasks" && (
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-medium mb-3">今日任务</h2>
                <MobileTaskList
                  tasks={ambientState.upcomingTasks.filter(
                    (task) => task.time.includes("今天") || task.time.includes(":"),
                  )}
                  emptyMessage="今天没有待办任务"
                />
              </div>

              <div className="mt-6">
                <h2 className="text-lg font-medium mb-3">即将到来</h2>
                <MobileTaskList
                  tasks={ambientState.upcomingTasks.filter(
                    (task) => task.time.includes("明天") || task.time.includes("周"),
                  )}
                  emptyMessage="近期没有计划任务"
                />
              </div>

              <div className="mt-6">
                <h2 className="text-lg font-medium mb-3">提醒事项</h2>
                <MobileTaskList
                  tasks={ambientState.reminders.map((r) => ({
                    id: r.id,
                    title: r.content,
                    time: r.time,
                    context: "提醒",
                  }))}
                  emptyMessage="没有提醒事项"
                />
              </div>
            </div>
          )}

          {/* 洞察内容 */}
          {activeTab === "insights" && (
            <div className="space-y-4">
              {ambientState.insights.map((insight) => (
                <MobileInsightCard key={insight.id} insight={insight} />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* 底部操作栏 - 固定在底部 */}
      <MobileActionBar activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  )
}
