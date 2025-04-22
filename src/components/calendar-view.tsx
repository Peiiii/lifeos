"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export function CalendarView() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  // 模拟事件数据
  const events = [
    { date: new Date(2023, 4, 15), count: 2 },
    { date: new Date(2023, 4, 16), count: 1 },
    { date: new Date(2023, 4, 18), count: 3 },
    { date: new Date(2023, 4, 21), count: 1 },
    { date: new Date(2023, 4, 22), count: 2 },
    { date: new Date(2023, 4, 25), count: 1 },
  ]

  return (
    <div className="space-y-4">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
        components={{
          DayContent: (props) => {
            const event = events.find(
              (e) =>
                e.date.getDate() === props.date.getDate() &&
                e.date.getMonth() === props.date.getMonth() &&
                e.date.getFullYear() === props.date.getFullYear(),
            )

            return (
              <div className="relative h-9 w-9 p-0 flex items-center justify-center">
                <div>{props.date.getDate()}</div>
                {event && (
                  <div className="absolute bottom-1 flex gap-0.5">
                    {Array.from({ length: Math.min(event.count, 3) }).map((_, i) => (
                      <div
                        key={i}
                        className={cn(
                          "h-1 w-1 rounded-full",
                          i === 0 ? "bg-blue-500" : i === 1 ? "bg-green-500" : "bg-orange-500",
                        )}
                      />
                    ))}
                  </div>
                )}
              </div>
            )
          },
        }}
      />

      {date && (
        <Card>
          <CardContent className="p-4">
            <div className="space-y-2">
              <h3 className="font-medium">
                {date.toLocaleDateString("zh-CN", { month: "long", day: "numeric" })}的日程
              </h3>
              <div className="space-y-2">
                {date.getDate() === 15 ? (
                  <>
                    <div className="rounded-md bg-blue-100 dark:bg-blue-900/20 p-2 text-sm">
                      <div className="font-medium">团队周会</div>
                      <div className="text-xs text-muted-foreground">10:00 - 11:00</div>
                    </div>
                    <div className="rounded-md bg-green-100 dark:bg-green-900/20 p-2 text-sm">
                      <div className="font-medium">项目截止日期</div>
                      <div className="text-xs text-muted-foreground">全天</div>
                    </div>
                  </>
                ) : date.getDate() === 16 ? (
                  <div className="rounded-md bg-orange-100 dark:bg-orange-900/20 p-2 text-sm">
                    <div className="font-medium">与客户会面</div>
                    <div className="text-xs text-muted-foreground">14:30 - 15:30</div>
                  </div>
                ) : (
                  <div className="text-sm text-muted-foreground">没有安排的事件</div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
