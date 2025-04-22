"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/shared/components/ui/card"
import { Lightbulb, TrendingUp, Heart, Brain } from "lucide-react"
import type { Insight } from "@/core/types/ambient"

interface AmbientInsightProps {
  insight: Insight
  delay?: number
}

export function AmbientInsight({ insight, delay = 0 }: AmbientInsightProps) {
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay, ease: "easeOut" }}
    >
      <Card className={`border-none shadow-md bg-gradient-to-br ${getGradient()}`}>
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="bg-background rounded-full p-2 shadow-sm">{getIcon()}</div>
            <div className="space-y-1">
              <h3 className="font-medium">{insight.title}</h3>
              <p className="text-sm text-muted-foreground">{insight.description}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
