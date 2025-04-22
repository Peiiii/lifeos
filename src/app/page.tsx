"use client"

import { Suspense } from "react"
import { Routes, Route } from "react-router-dom"
import { Ambient } from "@/components/ambient"
import { MobileHome } from "@/components/mobile/mobile-home"
import { AmbientSkeleton } from "@/components/skeletons"
import { ThoughtCapture } from "@/components/thought-capture"
import { UnifiedNotificationLayer } from "@/components/unified-notification-layer"
import { useMobile } from "@/hooks/use-mobile"
import { AmbientProvider } from "@/context/ambient-context"
import SettingsPage from "@/app/settings/page"
import NotesPage from "@/app/notes/page"
import HabitsPage from "@/app/habits/page"
import StatsPage from "@/app/stats/page"
import Dashboard from "@/components/dashboard"
import { CalendarView } from "@/components/calendar-view"
import { SidebarNav } from "@/components/desktop/sidebar-nav"

// 客户端渲染器组件
function ClientSideRenderer() {
  const isMobile = useMobile()

  return (
    <>
      {isMobile ? <MobileHome /> : <Ambient />}
      {!isMobile && <ThoughtCapture />}
      {!isMobile && <UnifiedNotificationLayer />}
    </>
  )
}

export default function App() {
  const isMobile = useMobile()

  return (
    <main className="flex min-h-screen flex-col">
      <Suspense fallback={<AmbientSkeleton />}>
        <AmbientProvider>
          <div className="flex h-screen">
            {!isMobile && <SidebarNav />}
            <div className="flex-1 overflow-auto">
              <Routes>
                <Route path="/" element={<ClientSideRenderer />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/notes" element={<NotesPage />} />
                <Route path="/habits" element={<HabitsPage />} />
                <Route path="/stats" element={<StatsPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/calendar" element={<CalendarView />} />
              </Routes>
            </div>
          </div>
        </AmbientProvider>
      </Suspense>
    </main>
  )
}
