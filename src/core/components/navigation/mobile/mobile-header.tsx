"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/shared/lib/utils"
import { Menu, Bell, Moon, Sun, Settings } from "lucide-react"
import { Button } from "@/shared/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/shared/components/ui/sheet"
import { useTheme } from "@/shared/hooks/use-theme"
import { Link } from "react-router-dom"

interface MobileHeaderProps {
  greeting: string
  timeOfDay: string
}

export function MobileHeader({ greeting, timeOfDay }: MobileHeaderProps) {
  const { theme, setTheme } = useTheme()
  const [notificationCount, setNotificationCount] = useState(3)

  return (
    <header
      className={cn(
        "sticky top-0 z-10 w-full py-3 px-4 flex items-center justify-between bg-gradient-to-b",
        timeOfDay === "morning" && "from-amber-50 to-blue-50 dark:from-amber-950/30 dark:to-blue-950/10",
        timeOfDay === "afternoon" && "from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/10",
        timeOfDay === "evening" && "from-indigo-50 to-violet-50 dark:from-indigo-950/30 dark:to-violet-950/10",
      )}
    >
      {/* 左侧菜单按钮 */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[80%] sm:w-[350px] p-0">
          <div className="h-full flex flex-col">
            <div
              className={cn(
                "p-6 bg-gradient-to-b",
                timeOfDay === "morning" && "from-amber-50 to-blue-50 dark:from-amber-950/30 dark:to-blue-950/10",
                timeOfDay === "afternoon" && "from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/10",
                timeOfDay === "evening" && "from-indigo-50 to-violet-50 dark:from-indigo-950/30 dark:to-violet-950/10",
              )}
            >
              <h2 className="text-2xl font-light">{greeting}</h2>
              <p className="text-sm text-muted-foreground mt-1">今天是美好的一天</p>
            </div>

            <nav className="flex-1 p-4 space-y-1">
              {[
                { name: "仪表盘", icon: "🏠", href: "/dashboard" },
                { name: "日历", icon: "📅", href: "/calendar" },
                { name: "笔记", icon: "📝", href: "/notes" },
                { name: "习惯", icon: "⭐", href: "/habits" },
                { name: "统计", icon: "📊", href: "/stats" },
              ].map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="flex items-center py-3 px-4 rounded-md hover:bg-accent transition-colors"
                >
                  <span className="mr-3 text-lg">{item.icon}</span>
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="p-4 border-t">
              <Link
                to="/settings"
                className="flex items-center py-3 px-4 rounded-md hover:bg-accent transition-colors"
              >
                <span className="mr-3 text-lg">⚙️</span>
                设置
              </Link>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* 中间问候语 - 移动到侧边栏，这里保留日期 */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-base font-medium">
          {new Date().toLocaleDateString("zh-CN", { month: "long", day: "numeric", weekday: "long" })}
        </h1>
      </motion.div>

      {/* 右侧功能按钮 */}
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>

        <Link to="/settings">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Settings className="h-5 w-5" />
          </Button>
        </Link>

        <Button variant="ghost" size="icon" className="rounded-full relative">
          <Bell className="h-5 w-5" />
          {notificationCount > 0 && (
            <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-red-500 text-[10px] text-white flex items-center justify-center">
              {notificationCount}
            </span>
          )}
        </Button>
      </div>
    </header>
  )
}
