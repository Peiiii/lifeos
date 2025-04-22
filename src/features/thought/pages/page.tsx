"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Button } from "@/shared/components/ui/button"
import { PlusCircle } from "lucide-react"

export default function NotesPage() {
  return (
    <div className="container max-w-4xl py-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">笔记</h1>
        <p className="text-muted-foreground">管理您的知识库和笔记</p>
      </div>

      <div className="flex justify-between items-center">
        <Button size="sm">
          <PlusCircle className="mr-2 h-4 w-4" />
          新建笔记
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>我的笔记</CardTitle>
          <CardDescription>您还没有创建任何笔记</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">点击"新建笔记"开始记录您的想法</p>
        </CardContent>
      </Card>
    </div>
  )
} 