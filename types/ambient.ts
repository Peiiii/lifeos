export interface Insight {
  id: string
  title: string
  description: string
  type: "productivity" | "health" | "learning" | "other"
}

export interface Task {
  id: string
  title: string
  time: string
  context?: string
}

export interface Reminder {
  id: string
  content: string
  time: string
}
