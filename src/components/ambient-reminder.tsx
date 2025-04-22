"use client"

import { motion } from "framer-motion"
import { Bell } from "lucide-react"
import type { Reminder } from "@/types/ambient"

interface AmbientReminderProps {
  reminder: Reminder
  delay?: number
}

export function AmbientReminder({ reminder, delay = 0 }: AmbientReminderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: delay, ease: "easeOut" }}
      className="flex items-center gap-3 p-2 rounded-md hover:bg-accent transition-colors"
    >
      <div className="text-muted-foreground">
        <Bell className="h-5 w-5" />
      </div>
      <div className="flex-1">
        <p className="font-medium">{reminder.content}</p>
        <span className="text-xs text-muted-foreground">{reminder.time}</span>
      </div>
    </motion.div>
  )
}
