"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { Insight, Task, Reminder } from "@/types/ambient"

interface SpatialContext {
  location: string
  time: string
  environment: string
}

interface AmbientState {
  insights: Insight[]
  currentFocus: string | null
  upcomingTasks: Task[]
  reminders: Reminder[]
  spatialContext: SpatialContext | null
}

interface AmbientContextType {
  ambientState: AmbientState
  processThought: (thought: string) => Promise<void>
  updateSpatialContext: (context: SpatialContext) => void
}

const initialState: AmbientState = {
  insights: [],
  currentFocus: null,
  upcomingTasks: [],
  reminders: [],
  spatialContext: null,
}

const AmbientContext = createContext<AmbientContextType | undefined>(undefined)

export function AmbientProvider({ children }: { children: ReactNode }) {
  const [ambientState, setAmbientState] = useState<AmbientState>(initialState)

  useEffect(() => {
    // 模拟从API加载数据
    const loadAmbientData = async () => {
      // 模拟网络延迟
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setAmbientState({
        insights: [
          {
            id: "1",
            title: "最佳工作时段",
            description: "根据您的历史数据，上午10点至12点是您的高效工作时段",
            type: "productivity",
          },
          {
            id: "2",
            title: "健康提醒",
            description: "您已经连续工作2小时，建议起身活动5分钟",
            type: "health",
          },
          {
            id: "3",
            title: "学习进度",
            description: "您的AI课程已完成75%，预计3天内可以完成",
            type: "learning",
          },
        ],
        currentFocus: "完成项目提案初稿",
        upcomingTasks: [
          {
            id: "1",
            title: "与设计团队会议",
            time: "14:00",
            context: "工作",
          },
          {
            id: "2",
            title: "回复客户邮件",
            time: "今天",
            context: "工作",
          },
          {
            id: "3",
            title: "准备周报",
            time: "明天",
            context: "工作",
          },
        ],
        reminders: [
          {
            id: "1",
            content: "给妈妈打电话",
            time: "今天晚上",
          },
          {
            id: "2",
            content: "预约牙医",
            time: "本周",
          },
        ],
        spatialContext: null,
      })
    }

    loadAmbientData()
  }, [])

  const processThought = async (thought: string): Promise<void> => {
    // 模拟AI处理
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // 简单的模拟逻辑
    if (thought.includes("会议") || thought.includes("meeting")) {
      setAmbientState((prev) => ({
        ...prev,
        upcomingTasks: [
          ...prev.upcomingTasks,
          {
            id: Date.now().toString(),
            title: thought,
            time: "已添加到日程",
            context: "工作",
          },
        ],
      }))
    } else if (thought.includes("提醒") || thought.includes("记得")) {
      setAmbientState((prev) => ({
        ...prev,
        reminders: [
          ...prev.reminders,
          {
            id: Date.now().toString(),
            content: thought,
            time: "已设置提醒",
          },
        ],
      }))
    } else {
      // 默认作为当前焦点
      setAmbientState((prev) => ({
        ...prev,
        currentFocus: thought,
      }))
    }
  }

  const updateSpatialContext = (context: SpatialContext) => {
    setAmbientState((prev) => ({
      ...prev,
      spatialContext: context,
      // 根据空间上下文更新洞察
      insights: [
        ...prev.insights.filter((insight) => insight.id !== "spatial"),
        {
          id: "spatial",
          title: "环境适应",
          description: `检测到您在${context.location}，已优化系统以适应${context.environment}`,
          type: "other",
        },
      ],
    }))
  }

  return (
    <AmbientContext.Provider value={{ ambientState, processThought, updateSpatialContext }}>
      {children}
    </AmbientContext.Provider>
  )
}

export function useAmbientContext() {
  const context = useContext(AmbientContext)
  if (context === undefined) {
    throw new Error("useAmbientContext must be used within an AmbientProvider")
  }
  return context
}
