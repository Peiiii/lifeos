"use client"

import { useState, useEffect } from "react"

interface TestResult {
  success: boolean
  error?: string
}

export function useAISettings() {
  const [apiKey, setApiKey] = useState<string | null>(null)
  const [apiUrl, setApiUrl] = useState<string | null>(
    "https://dashscope-intl.aliyuncs.com/compatible-mode/v1/chat/completions",
  )
  const [provider, setProvider] = useState<string>("qwen") // 默认使用阿里云Qwen
  const [model, setModel] = useState<string>("qwen-max-latest")
  const [isSaving, setIsSaving] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  // 从本地存储加载设置
  useEffect(() => {
    const loadSettings = () => {
      try {
        const savedSettings = localStorage.getItem("ai_settings")
        if (savedSettings) {
          const settings = JSON.parse(savedSettings)
          setApiKey(settings.apiKey || null)
          setApiUrl(settings.apiUrl || "https://dashscope-intl.aliyuncs.com/compatible-mode/v1/chat/completions")
          setProvider(settings.provider || "qwen")
          setModel(settings.model || "qwen-max-latest")
        }
      } catch (error) {
        console.error("Failed to load AI settings:", error)
      } finally {
        setIsLoaded(true)
      }
    }

    if (typeof window !== "undefined") {
      loadSettings()
    }
  }, [])

  // 保存设置到本地存储
  const saveSettings = async () => {
    if (!apiKey || apiKey.trim() === "") {
      return false
    }

    // 如果是阿里云Qwen，需要验证API URL
    if (provider === "qwen" && (!apiUrl || apiUrl.trim() === "")) {
      return false
    }

    setIsSaving(true)
    try {
      const settings = {
        apiKey,
        apiUrl,
        provider,
        model,
        updatedAt: new Date().toISOString(),
      }
      localStorage.setItem("ai_settings", JSON.stringify(settings))
      return true
    } catch (error) {
      console.error("Failed to save AI settings:", error)
      return false
    } finally {
      setIsSaving(false)
    }
  }

  // 清除设置
  const clearSettings = async () => {
    setIsSaving(true)
    try {
      localStorage.removeItem("ai_settings")
      setApiKey(null)
      setApiUrl("https://dashscope-intl.aliyuncs.com/compatible-mode/v1/chat/completions")
      setProvider("qwen")
      setModel("qwen-max-latest")
      return true
    } catch (error) {
      console.error("Failed to clear AI settings:", error)
      return false
    } finally {
      setIsSaving(false)
    }
  }

  // 测试连接
  const testConnection = async (): Promise<TestResult> => {
    if (!apiKey || apiKey.trim() === "") {
      return { success: false, error: "API密钥不能为空" }
    }

    // 如果是阿里云Qwen，需要验证API URL
    if (provider === "qwen" && (!apiUrl || apiUrl.trim() === "")) {
      return { success: false, error: "阿里云API URL不能为空" }
    }

    try {
      const response = await fetch("/api/ai/test-connection", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          apiKey,
          apiUrl,
          provider,
          model,
        }),
      })

      // 解析响应
      const data = await response.json()

      if (!response.ok || !data.success) {
        return {
          success: false,
          error: data.error || data.message || "连接测试失败",
        }
      }

      return { success: true }
    } catch (error: any) {
      console.error("Connection test failed:", error)
      return {
        success: false,
        error: error.message || "连接测试失败，请检查网络连接",
      }
    }
  }

  return {
    apiKey,
    setApiKey,
    apiUrl,
    setApiUrl,
    provider,
    setProvider,
    model,
    setModel,
    isSaving,
    isLoaded,
    saveSettings,
    clearSettings,
    testConnection,
  }
}
