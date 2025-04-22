"use client"

import { motion } from "framer-motion"
import { MapPin, Clock } from "lucide-react"

interface MobileContextBannerProps {
  context: {
    location: string
    time: string
    environment: string
  }
}

export function MobileContextBanner({ context }: MobileContextBannerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="bg-secondary/30 px-4 py-1.5"
    >
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <MapPin className="h-3 w-3" />
          <span>{context.location}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          <span>{context.time}</span>
        </div>
      </div>
    </motion.div>
  )
}
