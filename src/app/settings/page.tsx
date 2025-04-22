"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AISettings } from "@/components/settings/ai-settings"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Settings, Bot, Bell, Shield } from "lucide-react"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("ai")

  return (
    <div className="container max-w-4xl py-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">设置</h1>
        <p className="text-muted-foreground">管理您的应用设置和偏好</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-4 h-auto">
          <TabsTrigger value="ai" className="flex flex-col py-2 h-auto">
            <Bot className="h-5 w-5 mb-1" />
            <span>AI设置</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex flex-col py-2 h-auto">
            <Bell className="h-5 w-5 mb-1" />
            <span>通知</span>
          </TabsTrigger>
          <TabsTrigger value="privacy" className="flex flex-col py-2 h-auto">
            <Shield className="h-5 w-5 mb-1" />
            <span>隐私</span>
          </TabsTrigger>
          <TabsTrigger value="general" className="flex flex-col py-2 h-auto">
            <Settings className="h-5 w-5 mb-1" />
            <span>常规</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="ai" className="space-y-4">
          <AISettings />

          <Card>
            <CardHeader>
              <CardTitle>AI使用指南</CardTitle>
              <CardDescription>了解如何在应用中使用AI功能</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium">支持的AI提供商</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  目前支持OpenAI和Anthropic的API。您需要从这些提供商获取API密钥才能使用相应的模型。
                </p>
              </div>

              <div>
                <h3 className="font-medium">API密钥安全</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  您的API密钥仅存储在本地设备上，不会发送到我们的服务器。所有AI请求都直接从您的设备发送到AI提供商。
                </p>
              </div>

              <div>
                <h3 className="font-medium">使用限制</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  请注意，使用AI功能将消耗您在AI提供商账户中的配额。请参考相应提供商的定价页面了解详情。
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>通知设置</CardTitle>
              <CardDescription>配置应用通知方式</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">通知设置内容将在此显示</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy">
          <Card>
            <CardHeader>
              <CardTitle>隐私设置</CardTitle>
              <CardDescription>管理您的隐私偏好</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">隐私设置内容将在此显示</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>常规设置</CardTitle>
              <CardDescription>管理应用的基本设置</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">常规设置内容将在此显示</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
