"use client"

import { Link } from "react-router-dom"
import { useLocation } from "react-router-dom"
import { cn } from "@/shared/lib/utils"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
} from "@/shared/components/ui/sidebar"
import { Home, Calendar, FileText, Star, BarChart2, Settings } from "lucide-react"

const navigationItems = [
  { name: "仪表盘", icon: Home, href: "/dashboard" },
  { name: "日历", icon: Calendar, href: "/calendar" },
  { name: "笔记", icon: FileText, href: "/notes" },
  { name: "习惯", icon: Star, href: "/habits" },
  { name: "统计", icon: BarChart2, href: "/stats" },
  { name: "设置", icon: Settings, href: "/settings" },
]

export function SidebarNav() {
  const location = useLocation()

  return (
    <SidebarProvider defaultOpen>
      <Sidebar>
        <SidebarHeader className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">个人管理</h2>
          <SidebarTrigger />
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navigationItems.map((item) => (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton
                  asChild
                  isActive={location.pathname === item.href}
                >
                  <Link to={item.href}>
                    <item.icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  )
} 