"use client"

import { motion } from "framer-motion"
import { CheckCircle2 } from "lucide-react"
import type { Task } from "@/types/ambient"

interface AmbientTaskProps {
  task: Task
  delay?: number
}

export function AmbientTask({ task, delay = 0 }: AmbientTaskProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: delay, ease: "easeOut" }}
      className="flex items-center gap-3 p-2 rounded-md hover:bg-accent transition-colors"
    >
      <button className="text-muted-foreground hover:text-primary transition-colors">
        <CheckCircle2 className="h-5 w-5" />
      </button>
      <div className="flex-1">
        <p className="font-medium">{task.title}</p>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">{task.time}</span>
          {task.context && <span className="text-xs px-2 py-0.5 rounded-full bg-secondary">{task.context}</span>}
        </div>
      </div>
    </motion.div>
  )
}
