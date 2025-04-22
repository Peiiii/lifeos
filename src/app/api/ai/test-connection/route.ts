import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    // 解析请求体
    const body = await request.json()

    // 获取API参数
    const { provider, apiKey, apiUrl } = body

    if (!apiKey) {
      return NextResponse.json({ success: false, message: "API密钥不能为空" }, { status: 400 })
    }

    if (provider === "qwen") {
      // 确保API URL存在
      if (!apiUrl) {
        return NextResponse.json({ success: false, message: "阿里云API URL不能为空" }, { status: 400 })
      }

      try {
        // 使用阿里云Qwen API
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: "qwen-max-latest",
            messages: [{ role: "user", content: "Hello, this is a test." }],
            max_tokens: 5,
          }),
        })

        const data = await response.json()

        // 检查响应是否成功
        if (response.ok) {
          return NextResponse.json({ success: true, message: "连接成功" })
        } else {
          return NextResponse.json(
            {
              success: false,
              message: "阿里云Qwen API连接失败",
              error: data.error?.message || data.error || "API返回错误",
            },
            { status: response.status },
          )
        }
      } catch (error) {
        console.error("Qwen API connection test failed:", error)
        return NextResponse.json(
          {
            success: false,
            message: "阿里云Qwen API连接失败",
            error: error instanceof Error ? error.message : "未知错误",
          },
          { status: 500 },
        )
      }
    } else if (provider === "openai") {
      // 保留原有的OpenAI API测试逻辑
      try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: "Hello, this is a test." }],
            max_tokens: 5,
          }),
        })

        const data = await response.json()

        if (response.ok) {
          return NextResponse.json({ success: true, message: "连接成功" })
        } else {
          return NextResponse.json(
            {
              success: false,
              message: "OpenAI连接失败",
              error: data.error?.message || "API返回错误",
            },
            { status: response.status },
          )
        }
      } catch (error) {
        console.error("OpenAI connection test failed:", error)
        return NextResponse.json(
          {
            success: false,
            message: "OpenAI连接失败",
            error: error instanceof Error ? error.message : "未知错误",
          },
          { status: 500 },
        )
      }
    } else {
      return NextResponse.json({ success: false, message: "不支持的AI提供商" }, { status: 400 })
    }
  } catch (error) {
    console.error("Error in test-connection route:", error)
    return NextResponse.json(
      {
        success: false,
        message: "服务器错误",
        error: error instanceof Error ? error.message : "未知错误",
      },
      { status: 500 },
    )
  }
}
