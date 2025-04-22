"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Button } from "@/shared/components/ui/button"
import { PlusCircle } from "lucide-react"

export default function HabitsPage() {
  return (
    <div className="container max-w-4xl py-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">习惯追踪</h1>
        <p className="text-muted-foreground">培养和追踪您的日常习惯</p>
      </div>

      <div className="flex justify-between items-center">
        <Button size="sm">
          <PlusCircle className="mr-2 h-4 w-4" />
          新建习惯
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>我的习惯</CardTitle>
          <CardDescription>您还没有创建任何习惯</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">点击"新建习惯"开始培养您的日常习惯</p>
        </CardContent>
      </Card>
    </div>
  )
} 