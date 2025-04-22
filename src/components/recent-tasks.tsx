"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Clock } from "lucide-react"

export function RecentTasks() {
  const tasks = [
    {
      id: 1,
      title: "完成项目提案",
      completed: false,
      dueDate: "今天 14:00",
      priority: "high",
      project: "工作",
    },
    {
      id: 2,
      title: "预约医生",
      completed: false,
      dueDate: "明天",
      priority: "medium",
      project: "健康",
    },
    {
      id: 3,
      title: "购买生日礼物",
      completed: false,
      dueDate: "周五",
      priority: "medium",
      project: "个人",
    },
    {
      id: 4,
      title: "回复邮件",
      completed: true,
      dueDate: "已完成",
      priority: "low",
      project: "工作",
    },
    {
      id: 5,
      title: "准备周会演示",
      completed: false,
      dueDate: "周四 10:00",
      priority: "high",
      project: "工作",
    },
  ]

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div
          key={task.id}
          className={`flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-accent ${
            task.completed ? "opacity-60" : ""
          }`}
        >
          <Checkbox id={`task-${task.id}`} checked={task.completed} />
          <div className="flex-1 space-y-1">
            <label
              htmlFor={`task-${task.id}`}
              className={`font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
                task.completed ? "line-through" : ""
              }`}
            >
              {task.title}
            </label>
            <div className="flex items-center text-xs text-muted-foreground gap-2">
              <div className="flex items-center">
                <Clock className="mr-1 h-3 w-3" />
                {task.dueDate}
              </div>
              <Badge
                variant={task.priority === "high" ? "destructive" : task.priority === "medium" ? "default" : "outline"}
                className="text-[10px] px-1 py-0"
              >
                {task.priority === "high" ? "高" : task.priority === "medium" ? "中" : "低"}
              </Badge>
              <Badge variant="outline" className="text-[10px] px-1 py-0">
                {task.project}
              </Badge>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
