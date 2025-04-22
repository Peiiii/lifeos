"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Save, Key, Trash, Info, AlertTriangle, Globe } from "lucide-react"
import { useAISettings } from "@/hooks/use-ai-settings"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function AISettings() {
  const { toast } = useToast()
  const {
    apiKey,
    setApiKey,
    apiUrl,
    setApiUrl,
    provider,
    setProvider,
    model,
    setModel,
    isSaving,
    saveSettings,
    clearSettings,
    testConnection,
  } = useAISettings()

  const [isVisible, setIsVisible] = useState(false)
  const [isTesting, setIsTesting] = useState(false)
  const [testError, setTestError] = useState<string | null>(null)
  const [testSuccess, setTestSuccess] = useState<boolean>(false)
  const [debugInfo, setDebugInfo] = useState<string | null>(null)

  const handleSave = async () => {
    if (!apiKey || apiKey.trim() === "") {
      toast({
        title: "错误",
        description: "API密钥不能为空",
        variant: "destructive",
      })
      return
    }

    // 如果是阿里云Qwen，需要验证API URL
    if (provider === "qwen" && (!apiUrl || apiUrl.trim() === "")) {
      toast({
        title: "错误",
        description: "阿里云API URL不能为空",
        variant: "destructive",
      })
      return
    }

    const success = await saveSettings()
    if (success) {
      setTestSuccess(false)
      setTestError(null)
      toast({
        title: "设置已保存",
        description: "您的AI设置已成功保存",
      })
    } else {
      toast({
        title: "保存失败",
        description: "无法保存设置，请重试",
        variant: "destructive",
      })
    }
  }

  const handleClear = async () => {
    await clearSettings()
    setTestError(null)
    setTestSuccess(false)
    setDebugInfo(null)
    toast({
      title: "设置已清除",
      description: "您的AI设置已被移除",
    })
  }

  const handleTest = async () => {
    if (!apiKey || apiKey.trim() === "") {
      toast({
        title: "错误",
        description: "API密钥不能为空",
        variant: "destructive",
      })
      return
    }

    // 如果是阿里云Qwen，需要验证API URL
    if (provider === "qwen" && (!apiUrl || apiUrl.trim() === "")) {
      toast({
        title: "错误",
        description: "阿里云API URL不能为空",
        variant: "destructive",
      })
      return
    }

    setIsTesting(true)
    setTestError(null)
    setTestSuccess(false)
    setDebugInfo(null)

    try {
      // 显示调试信息
      setDebugInfo(
        `正在测试连接... 提供商: ${provider}, 模型: ${model}, API密钥: ${apiKey.substring(0, 3)}...${apiKey.substring(apiKey.length - 3)}`,
      )

      const result = await testConnection()

      if (result.success) {
        setTestSuccess(true)
        toast({
          title: "连接成功",
          description: "AI模型连接测试成功",
        })
      } else {
        const errorMsg = result.error || "无法连接到AI模型，请检查您的API密钥和URL"
        setTestError(errorMsg)
        setDebugInfo((prev) => `${prev || ""}\n错误详情: ${errorMsg}`)

        toast({
          title: "连接失败",
          description: errorMsg,
          variant: "destructive",
        })
      }
    } catch (error: any) {
      const errorMessage = error.message || "无法连接到AI模型，请检查您的API密钥和URL"
      setTestError(errorMessage)
      setDebugInfo((prev) => `${prev || ""}\n捕获到异常: ${errorMessage}`)

      toast({
        title: "连接失败",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsTesting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI模型设置</CardTitle>
        <CardDescription>配置您的AI模型接入参数</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* 安全提示 */}
        <Alert variant="warning" className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900">
          <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
          <AlertTitle className="text-amber-600 dark:text-amber-400">安全提示</AlertTitle>
          <AlertDescription className="text-xs text-amber-600 dark:text-amber-400">
            当前实现仅用于演示目的。在生产环境中，应始终从服务器端发起API请求以保护您的API密钥安全。
          </AlertDescription>
        </Alert>

        <div className="space-y-2">
          <Label htmlFor="provider">AI提供商</Label>
          <Select
            value={provider}
            onValueChange={(value) => {
              setProvider(value)
              // 根据提供商设置默认模型
              if (value === "openai") {
                setModel("gpt-4o")
              } else if (value === "qwen") {
                setModel("qwen-max-latest")
              }

              // 清除之前的测试结果
              setTestError(null)
              setTestSuccess(false)
              setDebugInfo(null)
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="选择AI提供商" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="qwen">阿里云Qwen</SelectItem>
              <SelectItem value="openai">OpenAI</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="model">模型</Label>
          <Select
            value={model}
            onValueChange={(value) => {
              setModel(value)
              // 清除之前的测试结果
              setTestError(null)
              setTestSuccess(false)
              setDebugInfo(null)
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="选择模型" />
            </SelectTrigger>
            <SelectContent>
              {provider === "qwen" && (
                <>
                  <SelectItem value="qwen-max-latest">Qwen Max Latest</SelectItem>
                  <SelectItem value="qwen-max">Qwen Max</SelectItem>
                  <SelectItem value="qwen-plus">Qwen Plus</SelectItem>
                </>
              )}
              {provider === "openai" && (
                <>
                  <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                  <SelectItem value="gpt-4">GPT-4</SelectItem>
                  <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                </>
              )}
            </SelectContent>
          </Select>
        </div>

        {provider === "qwen" && (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="api-url">API URL</Label>
            </div>
            <div className="relative flex-1">
              <Globe className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="api-url"
                type="text"
                placeholder="输入阿里云Qwen API URL"
                value={apiUrl || ""}
                onChange={(e) => {
                  setApiUrl(e.target.value)
                  // 清除之前的测试结果
                  setTestError(null)
                  setTestSuccess(false)
                  setDebugInfo(null)
                }}
                className="pl-8"
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              默认: https://dashscope-intl.aliyuncs.com/compatible-mode/v1/chat/completions
            </p>
          </div>
        )}

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="api-key">API密钥</Label>
            <Button variant="ghost" size="sm" onClick={() => setIsVisible(!isVisible)} className="h-6 px-2 text-xs">
              {isVisible ? "隐藏" : "显示"}
            </Button>
          </div>
          <div className="flex space-x-2">
            <div className="relative flex-1">
              <Key className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="api-key"
                type={isVisible ? "text" : "password"}
                placeholder={provider === "qwen" ? "输入阿里云API密钥" : "输入您的API密钥"}
                value={apiKey || ""}
                onChange={(e) => {
                  setApiKey(e.target.value)
                  // 清除之前的测试结果
                  setTestError(null)
                  setTestSuccess(false)
                  setDebugInfo(null)
                }}
                className="pl-8"
              />
            </div>
            <Button variant="outline" onClick={handleTest} disabled={!apiKey || isTesting}>
              {isTesting ? <Loader2 className="h-4 w-4 animate-spin" /> : "测试"}
            </Button>
          </div>

          {testSuccess && (
            <Alert className="mt-2 bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-900">
              <Info className="h-4 w-4 text-green-600 dark:text-green-400" />
              <AlertTitle className="text-green-600 dark:text-green-400">连接成功</AlertTitle>
              <AlertDescription className="text-xs text-green-600 dark:text-green-400">
                API密钥验证成功，您可以使用AI功能了
              </AlertDescription>
            </Alert>
          )}

          {testError && (
            <Alert variant="destructive" className="mt-2">
              <AlertTitle>连接失败</AlertTitle>
              <AlertDescription className="text-xs">{testError}</AlertDescription>
            </Alert>
          )}

          {debugInfo && (
            <Alert className="mt-2 bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900">
              <Info className="h-4 w-4" />
              <AlertDescription className="text-xs whitespace-pre-line">{debugInfo}</AlertDescription>
            </Alert>
          )}

          <p className="text-xs text-muted-foreground mt-1">您的API密钥仅存储在本地设备上，不会发送到我们的服务器。</p>
        </div>

        <div className="flex items-center space-x-2">
          <Switch id="cache" />
          <Label htmlFor="cache">缓存AI响应以提高性能</Label>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={handleClear} disabled={isSaving || !apiKey}>
          <Trash className="mr-2 h-4 w-4" />
          清除设置
        </Button>
        <Button onClick={handleSave} disabled={isSaving || !apiKey || (provider === "qwen" && !apiUrl)}>
          {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
          保存设置
        </Button>
      </CardFooter>
    </Card>
  )
}
