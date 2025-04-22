"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useAmbientContext } from "@/context/ambient-context"
import { AmbientInsight } from "@/components/ambient-insight"
import { AmbientTask } from "@/components/ambient-task"
import { AmbientReminder } from "@/components/ambient-reminder"
import { AmbientMood } from "@/components/ambient-mood"
import { useMobile } from "@/hooks/use-mobile"
import { ChevronRight, ChevronDown } from "lucide-react"

export function MobileOptimizedAmbient() {
  const { ambientState } = useAmbientContext()
  const isMobile = useMobile()
  const [timeOfDay, setTimeOfDay] = useState<string>("")
  const [greeting, setGreeting] = useState<string>("")
  const [expandedSection, setExpandedSection] = useState<string | null>("insights")

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
  }, [])

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  // 移动端优化的卡片组件
  const MobileCard = ({
    title,
    section,
    children,
  }: {
    title: string
    section: string
    children: React.ReactNode
  }) => (
    <Card className="mb-4 overflow-hidden">
      <div className="flex items-center justify-between p-4 cursor-pointer" onClick={() => toggleSection(section)}>
        <h2 className="text-lg font-medium">{title}</h2>
        {expandedSection === section ? (
          <ChevronDown className="h-5 w-5 text-muted-foreground" />
        ) : (
          <ChevronRight className="h-5 w-5 text-muted-foreground" />
        )}
      </div>

      {expandedSection === section && <div className="px-4 pb-4">{children}</div>}
    </Card>
  )

  return (
    <div className="relative w-full">
      <div
        className={cn(
          "w-full min-h-[30vh] flex items-center justify-center bg-gradient-to-b",
          timeOfDay === "morning" && "from-amber-50 to-blue-50 dark:from-amber-950/30 dark:to-blue-950/10",
          timeOfDay === "afternoon" && "from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/10",
          timeOfDay === "evening" && "from-indigo-50 to-violet-50 dark:from-indigo-950/30 dark:to-violet-950/10",
        )}
      >
        <div className="text-center space-y-2 p-4">
          <motion.h1
            className="text-3xl font-light tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {greeting}
          </motion.h1>
          <motion.p
            className="text-base text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            今天是美好的一天
          </motion.p>
        </div>
      </div>

      <div className="px-4 -mt-6 space-y-4 mb-24">
        {ambientState.currentFocus && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.7, ease: "easeOut" }}
          >
            <Card className="p-4 bg-gradient-to-r from-violet-50 to-indigo-50 dark:from-violet-950/20 dark:to-indigo-950/20 border-none shadow-md">
              <h2 className="text-base font-medium mb-1">现在专注于</h2>
              <p className="text-xl font-light">{ambientState.currentFocus}</p>
              <div className="mt-3 flex justify-end">
                <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">完成</button>
              </div>
            </Card>
          </motion.div>
        )}

        <MobileCard title="洞察" section="insights">
          <div className="space-y-3">
            {ambientState.insights.map((insight, index) => (
              <AmbientInsight key={insight.id} insight={insight} delay={0.1 * index} />
            ))}
          </div>
        </MobileCard>

        {ambientState.upcomingTasks.length > 0 && (
          <MobileCard title="接下来" section="tasks">
            <div className="space-y-3">
              {ambientState.upcomingTasks.map((task, index) => (
                <AmbientTask key={task.id} task={task} delay={0.1 * index} />
              ))}
            </div>
          </MobileCard>
        )}

        {ambientState.reminders.length > 0 && (
          <MobileCard title="提醒" section="reminders">
            <div className="space-y-3">
              {ambientState.reminders.map((reminder, index) => (
                <AmbientReminder key={reminder.id} reminder={reminder} delay={0.1 * index} />
              ))}
            </div>
          </MobileCard>
        )}

        <MobileCard title="今日心情" section="mood">
          <AmbientMood />
        </MobileCard>
      </div>
    </div>
  )
}
