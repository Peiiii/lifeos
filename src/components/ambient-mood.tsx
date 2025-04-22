"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

export function AmbientMood() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null)
  const { toast } = useToast()

  const moods = [
    { emoji: "😊", label: "愉快" },
    { emoji: "😌", label: "平静" },
    { emoji: "🤔", label: "思考" },
    { emoji: "😓", label: "疲惫" },
    { emoji: "😤", label: "压力" },
  ]

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood)

    toast({
      title: "心情已记录",
      description: `AI将根据您的心情调整今天的建议`,
    })
  }

  return (
    <Card className="p-6">
      <h2 className="text-xl font-medium mb-4">今天感觉如何？</h2>
      <CardContent className="p-0">
        <div className="flex flex-wrap gap-3">
          {moods.map((mood) => (
            <Button
              key={mood.label}
              variant={selectedMood === mood.label ? "default" : "outline"}
              className="flex flex-col h-auto py-3 px-4 gap-1"
              onClick={() => handleMoodSelect(mood.label)}
            >
              <span className="text-2xl">{mood.emoji}</span>
              <span className="text-xs">{mood.label}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
