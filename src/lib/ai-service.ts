// 生成文本
export async function generateAIText(prompt: string, systemPrompt?: string) {
  // 从本地存储获取AI设置
  const settings = getAISettings()

  if (!settings.apiKey) {
    return {
      success: false,
      error: "API密钥未设置，请在设置中配置您的AI提供商API密钥",
    }
  }

  try {
    if (settings.provider === "qwen") {
      // 确保API URL存在
      if (!settings.apiUrl) {
        return {
          success: false,
          error: "阿里云API URL未设置，请在设置中配置",
        }
      }

      // 使用阿里云Qwen API
      const response = await fetch(settings.apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${settings.apiKey}`,
        },
        body: JSON.stringify({
          model: settings.model || "qwen-max-latest",
          messages: [
            ...(systemPrompt ? [{ role: "system", content: systemPrompt }] : []),
            { role: "user", content: prompt },
          ],
          max_tokens: 2000,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || data.error || "API返回错误")
      }

      // 根据阿里云Qwen API的响应格式提取文本
      const text = data.choices?.[0]?.message?.content || ""
      return { success: true, text }
    } else if (settings.provider === "openai") {
      // 使用OpenAI API
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${settings.apiKey}`,
        },
        body: JSON.stringify({
          model: settings.model || "gpt-3.5-turbo",
          messages: [
            ...(systemPrompt ? [{ role: "system", content: systemPrompt }] : []),
            { role: "user", content: prompt },
          ],
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error?.message || "API返回错误")
      }

      const text = data.choices[0]?.message?.content || ""
      return { success: true, text }
    }

    return {
      success: false,
      error: "不支持的AI提供商",
    }
  } catch (error: any) {
    console.error("AI text generation failed:", error)
    return {
      success: false,
      error: error.message || "AI生成失败",
    }
  }
}

// 从本地存储获取AI设置
function getAISettings() {
  if (typeof window === "undefined") {
    return {
      apiKey: null,
      apiUrl: "https://dashscope-intl.aliyuncs.com/compatible-mode/v1/chat/completions",
      provider: "qwen",
      model: "qwen-max-latest",
    }
  }

  try {
    const savedSettings = localStorage.getItem("ai_settings")
    if (savedSettings) {
      return JSON.parse(savedSettings)
    }
  } catch (error) {
    console.error("Failed to load AI settings:", error)
  }

  return {
    apiKey: null,
    apiUrl: "https://dashscope-intl.aliyuncs.com/compatible-mode/v1/chat/completions",
    provider: "qwen",
    model: "qwen-max-latest",
  }
}
