"use client"

import { motion } from "framer-motion"
import { CheckCircle, Clock, ChevronRight } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import type { Task } from "@/types/ambient"

interface MobileTaskListProps {
  tasks: Task[]
  emptyMessage?: string
}

export function MobileTaskList({ tasks, emptyMessage = "暂无任务" }: MobileTaskListProps) {
  const { toast } = useToast()
  const [completedTasks, setCompletedTasks] = useState<string[]>([])
  const [swipedTask, setSwipedTask] = useState<string | null>(null)

  const handleTaskComplete = (taskId: string, taskTitle: string) => {
    if (completedTasks.includes(taskId)) {
      setCompletedTasks(completedTasks.filter((id) => id !== taskId))
    } else {
      setCompletedTasks([...completedTasks, taskId])
      toast({
        title: "任务完成",
        description: `您已完成"${taskTitle}"`,
      })
    }
  }

  // 处理滑动手势
  const handleSwipeStart = (taskId: string) => {
    setSwipedTask(taskId)
  }

  const handleSwipeEnd = () => {
    setSwipedTask(null)
  }

  if (tasks.length === 0) {
    return <div className="text-center py-6 text-muted-foreground">{emptyMessage}</div>
  }

  return (
    <div className="space-y-3">
      {tasks.map((task, index) => {
        const isCompleted = completedTasks.includes(task.id)
        const isTaskSwiped = swipedTask === task.id

        return (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="relative overflow-hidden"
            onPanStart={() => handleSwipeStart(task.id)}
            onPanEnd={handleSwipeEnd}
            drag="x"
            dragConstraints={{ left: 0, right: 80 }}
            dragElastic={0.1}
          >
            {/* 滑动后显示的完成按钮 */}
            <div className="absolute inset-y-0 right-0 bg-green-500 flex items-center justify-center w-20">
              <CheckCircle className="h-6 w-6 text-white" />
            </div>

            <div
              className={`flex items-center gap-3 p-3 rounded-lg border ${
                isCompleted ? "bg-muted/50 border-dashed" : "bg-background"
              } relative z-10`}
              style={{
                transform: isTaskSwiped ? "translateX(-80px)" : "translateX(0)",
                transition: "transform 0.3s ease",
              }}
              onClick={() => {
                if (isTaskSwiped) {
                  handleTaskComplete(task.id, task.title)
                  handleSwipeEnd()
                }
              }}
            >
              <button
                className={`flex-shrink-0 ${isCompleted ? "text-green-500" : "text-muted-foreground"}`}
                onClick={(e) => {
                  e.stopPropagation()
                  handleTaskComplete(task.id, task.title)
                }}
              >
                <CheckCircle className={`h-5 w-5 ${isCompleted ? "fill-current" : ""}`} />
              </button>

              <div className="flex-1 min-w-0">
                <p className={`font-medium truncate ${isCompleted ? "line-through text-muted-foreground" : ""}`}>
                  {task.title}
                </p>

                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="h-3 w-3 mr-1" />
                    {task.time}
                  </div>

                  {task.context && (
                    <span className="text-xs px-1.5 py-0.5 rounded-full bg-secondary text-secondary-foreground">
                      {task.context}
                    </span>
                  )}
                </div>
              </div>

              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
