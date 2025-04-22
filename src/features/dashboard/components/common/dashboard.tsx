"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs"
import { Overview } from "@/features/dashboard/components/common/overview"
import { RecentTasks } from "@/features/tasks/components/recent-tasks"
import { CalendarView } from "@/features/calendar/components/common/calendar-view"
import { Button } from "@/shared/components/ui/button"
import { PlusCircle } from "lucide-react"
import { useToast } from "@/shared/hooks/use-toast"
import { fetchInsights } from "@/shared/lib/insights"
import type { InsightType } from "@/core/types/insights"
import { QuickCapture } from "@/features/thought/components/common/quick-capture"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [insights, setInsights] = useState<InsightType[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const loadInsights = async () => {
      try {
        const data = await fetchInsights()
        setInsights(data)
      } catch (error) {
        toast({
          title: "无法加载见解",
          description: "请稍后再试",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadInsights()
  }, [toast])

  return (
    <div className="space-y-4">
      <QuickCapture />

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="overview">总览</TabsTrigger>
            <TabsTrigger value="tasks">任务</TabsTrigger>
            <TabsTrigger value="calendar">日历</TabsTrigger>
            <TabsTrigger value="notes">笔记</TabsTrigger>
            <TabsTrigger value="habits">习惯</TabsTrigger>
          </TabsList>
          <Button size="sm">
            <PlusCircle className="mr-2 h-4 w-4" />
            新建
          </Button>
        </div>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">今日任务</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4/7</div>
                <p className="text-xs text-muted-foreground">较昨天 +2 任务</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">专注时间</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3.5小时</div>
                <p className="text-xs text-muted-foreground">较昨天 +45分钟</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">习惯坚持</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">85%</div>
                <p className="text-xs text-muted-foreground">较上周 +10%</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">能量水平</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">良好</div>
                <p className="text-xs text-muted-foreground">基于您的活动和休息</p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>概览</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <Overview />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>近期任务</CardTitle>
                <CardDescription>您有5个任务即将到期</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentTasks />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tasks" className="space-y-4">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>任务管理</CardTitle>
              <CardDescription>管理您的所有任务和项目</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">任务视图将在这里显示</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calendar" className="space-y-4">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>日历</CardTitle>
              <CardDescription>查看和管理您的日程安排</CardDescription>
            </CardHeader>
            <CardContent>
              <CalendarView />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notes" className="space-y-4">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>笔记</CardTitle>
              <CardDescription>您的知识库和笔记</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">笔记视图将在这里显示</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="habits" className="space-y-4">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>习惯追踪</CardTitle>
              <CardDescription>培养和追踪您的日常习惯</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">习惯追踪视图将在这里显示</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
