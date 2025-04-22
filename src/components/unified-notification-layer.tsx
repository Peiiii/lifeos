"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useAmbientContext } from "@/context/ambient-context"
import { Bell, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useMobile } from "@/hooks/use-mobile"

interface Notification {
  id: string
  title: string
  message: string
  type: "info" | "alert" | "prediction" | "spatial" | "gesture"
  priority: number // 1-5, 5 being highest
  timestamp: Date
  read: boolean
  actionable: boolean
  action?: () => void
  actionLabel?: string
}

export function UnifiedNotificationLayer() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const [lastNotificationTime, setLastNotificationTime] = useState<Date | null>(null)
  const { ambientState } = useAmbientContext()
  const isMobile = useMobile()

  // 计算未读通知数量
  useEffect(() => {
    setUnreadCount(notifications.filter((n) => !n.read).length)
  }, [notifications])

  // 模拟接收通知
  useEffect(() => {
    // 这里在实际应用中会连接到通知系统
    const possibleNotifications: Omit<Notification, "id" | "timestamp" | "read">[] = [
      {
        title: "环境变化",
        message: "检测到您已进入办公室环境，已切换到工作模式",
        type: "spatial",
        priority: 2,
        actionable: false,
      },
      {
        title: "会议提醒",
        message: "15分钟后有团队周会",
        type: "alert",
        priority: 4,
        actionable: true,
        actionLabel: "准备会议",
        action: () => console.log("准备会议"),
      },
      {
        title: "任务建议",
        message: "现在是处理邮件的最佳时间",
        type: "prediction",
        priority: 2,
        actionable: true,
        actionLabel: "开始处理",
        action: () => console.log("开始处理邮件"),
      },
      {
        title: "手势检测",
        message: "已识别向下滑动手势",
        type: "gesture",
        priority: 1,
        actionable: false,
      },
    ]

    // 智能批处理通知 - 不会频繁打断用户
    const intervalId = setInterval(() => {
      // 检查是否应该发送通知
      // 1. 如果最近5分钟内有通知，则降低发送概率
      // 2. 如果用户正在专注工作，则只发送高优先级通知
      const now = new Date()
      const shouldSendNotification = Math.random() > 0.7
      const isFocusing = ambientState.currentFocus !== null

      if (shouldSendNotification) {
        // 随机选择一个通知
        const randomNotification = possibleNotifications[Math.floor(Math.random() * possibleNotifications.length)]

        // 如果用户在专注，只发送高优先级通知
        if (isFocusing && randomNotification.priority < 4) {
          return
        }

        // 如果最近有通知，检查时间间隔和优先级
        if (lastNotificationTime) {
          const timeSinceLastNotification = now.getTime() - lastNotificationTime.getTime()
          const minInterval = randomNotification.priority >= 4 ? 30000 : 300000 // 高优先级30秒，低优先级5分钟

          if (timeSinceLastNotification < minInterval) {
            return
          }
        }

        const newNotification: Notification = {
          ...randomNotification,
          id: Date.now().toString(),
          timestamp: new Date(),
          read: false,
        }

        setNotifications((prev) => [newNotification, ...prev].slice(0, 20)) // 保留最近20条
        setLastNotificationTime(now)
      }
    }, 20000) // 每20秒检查一次，但实际发送频率会更低

    return () => clearInterval(intervalId)
  }, [ambientState.currentFocus, lastNotificationTime])

  // 标记所有通知为已读
  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  // 清除所有通知
  const clearAllNotifications = () => {
    setNotifications([])
  }

  // 处理单个通知
  const handleNotification = (notification: Notification) => {
    // 标记为已读
    setNotifications((prev) => prev.map((n) => (n.id === notification.id ? { ...n, read: true } : n)))

    // 执行操作（如果有）
    if (notification.actionable && notification.action) {
      notification.action()
    }
  }

  // 获取通知类型图标
  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "alert":
        return <Bell className="h-4 w-4 text-orange-500" />
      case "prediction":
        return <div className="h-4 w-4 rounded-full bg-blue-500" />
      case "spatial":
        return <div className="h-4 w-4 rounded-full bg-green-500" />
      case "gesture":
        return <div className="h-4 w-4 rounded-full bg-purple-500" />
      default:
        return <div className="h-4 w-4 rounded-full bg-gray-500" />
    }
  }

  // 渲染通知指示器（移动端底部，桌面端右上角）
  const renderIndicator = () => (
    <motion.button
      onClick={() => setIsOpen(true)}
      className={`flex items-center justify-center rounded-full bg-background border shadow-md ${
        isMobile ? "fixed bottom-6 left-6 z-50 h-14 w-14" : "fixed top-4 right-4 z-50 h-10 w-10"
      }`}
      whileTap={{ scale: 0.95 }}
    >
      <Bell className="h-5 w-5" />
      {unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
          {unreadCount}
        </span>
      )}
    </motion.button>
  )

  return (
    <>
      {renderIndicator()}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: isMobile ? 100 : -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: isMobile ? 100 : -100 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={`fixed z-50 bg-background border shadow-lg ${
              isMobile ? "inset-x-0 bottom-0 rounded-t-xl" : "top-16 right-4 w-80 rounded-xl"
            }`}
          >
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="font-medium">通知中心</h3>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <ScrollArea className={isMobile ? "h-[60vh]" : "h-[400px]"}>
              <div className="p-2">
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`mb-2 rounded-lg p-3 ${notification.read ? "bg-muted/50" : "bg-muted"}`}
                      onClick={() => handleNotification(notification)}
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5">{getNotificationIcon(notification.type)}</div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4
                              className={`text-sm font-medium ${!notification.read ? "text-foreground" : "text-muted-foreground"}`}
                            >
                              {notification.title}
                            </h4>
                            <span className="text-xs text-muted-foreground">
                              {new Date(notification.timestamp).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">{notification.message}</p>
                          {notification.actionable && notification.actionLabel && (
                            <Button
                              variant="link"
                              className="h-auto p-0 text-xs text-primary mt-1"
                              onClick={(e) => {
                                e.stopPropagation()
                                notification.action?.()
                              }}
                            >
                              {notification.actionLabel}
                            </Button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
                    <Bell className="h-8 w-8 mb-2 opacity-20" />
                    <p className="text-sm">暂无通知</p>
                  </div>
                )}
              </div>
            </ScrollArea>

            {notifications.length > 0 && (
              <div className="flex items-center justify-between p-3 border-t">
                <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                  标记全部已读
                </Button>
                <Button variant="ghost" size="sm" onClick={clearAllNotifications}>
                  清除全部
                </Button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
