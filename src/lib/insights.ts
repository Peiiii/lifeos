import type { InsightType } from "@/types/insights"

export async function fetchInsights(): Promise<InsightType[]> {
  // 模拟API调用
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          title: "工作效率提升",
          description: "您在上午10点至12点的工作效率最高。考虑在这段时间安排重要任务。",
          type: "productivity",
          createdAt: new Date().toISOString(),
        },
        {
          id: 2,
          title: "习惯养成进度",
          description: '您的"每日阅读"习惯已经连续坚持15天，再坚持15天将形成稳定习惯。',
          type: "habit",
          createdAt: new Date().toISOString(),
        },
        {
          id: 3,
          title: "时间分配建议",
          description: "您在社交媒体上花费的时间比上周增加了30%。考虑设置使用限制。",
          type: "time",
          createdAt: new Date().toISOString(),
        },
      ])
    }, 1500)
  })
}
