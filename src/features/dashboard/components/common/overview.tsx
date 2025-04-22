"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "周一",
    任务: 13,
    专注: 18,
  },
  {
    name: "周二",
    任务: 8,
    专注: 12,
  },
  {
    name: "周三",
    任务: 15,
    专注: 14,
  },
  {
    name: "周四",
    任务: 10,
    专注: 15,
  },
  {
    name: "周五",
    任务: 12,
    专注: 10,
  },
  {
    name: "周六",
    任务: 5,
    专注: 8,
  },
  {
    name: "周日",
    任务: 3,
    专注: 5,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
        <Bar dataKey="任务" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
        <Bar dataKey="专注" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary/50" />
      </BarChart>
    </ResponsiveContainer>
  )
}
