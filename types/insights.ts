export type InsightType = {
  id: number
  title: string
  description: string
  type: "productivity" | "habit" | "time" | "health" | "other"
  createdAt: string
}
