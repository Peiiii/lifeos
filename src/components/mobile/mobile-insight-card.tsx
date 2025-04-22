"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Lightbulb, TrendingUp, Heart, Brain, ChevronRight } from "lucide-react"
import { useState } from "react"
import type { Insight } from "@/types/ambient"

interface MobileInsightCardProps {
  insight: Insight
}

export function MobileInsightCard({ insight }: MobileInsightCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const getIcon = () => {
    switch (insight.type) {
      case "productivity":
        return <TrendingUp className="h-5 w-5" />
      case "health":
        return <Heart className="h-5 w-5" />
      case "learning":
        return <Brain className="h-5 w-5" />
      default:
        return <Lightbulb className="h-5 w-5" />
    }
  }

  const getGradient = () => {
    switch (insight.type) {
      case "productivity":
        return "from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/10"
      case "health":
        return "from-rose-50 to-red-50 dark:from-rose-950/20 dark:to-red-950/10"
      case "learning":
        return "from-violet-50 to-purple-50 dark:from-violet-950/20 dark:to-purple-950/10"
      default:
        return "from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/10"
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} layout>
      <Card
        className={`border-none shadow-sm bg-gradient-to-br ${getGradient()} overflow-hidden`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <motion.div className="p-4" layout>
          <div className="flex items-start gap-3">
            <div className="bg-background rounded-full p-2 shadow-sm flex-shrink-0">{getIcon()}</div>
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <h3 className="font-medium">{insight.title}</h3>
                <ChevronRight
                  className={`h-4 w-4 text-muted-foreground transition-transform ${isExpanded ? "rotate-90" : ""}`}
                />
              </div>
              <motion.p
                className="text-sm text-muted-foreground mt-1"
                animate={{ height: isExpanded ? "auto" : "1.5rem" }}
              >
                {insight.description}
              </motion.p>

              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-3 pt-3 border-t border-background/20"
                >
                  <button className="text-xs font-medium text-primary">查看详情</button>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </Card>
    </motion.div>
  )
}
