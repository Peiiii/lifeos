import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Ambient } from '@/features/thought/components/desktop/ambient'
import { MobileHome } from '@/features/thought/components/mobile/mobile-home'
import { AmbientSkeleton } from '@/shared/components/skeletons'
import { ThoughtCapture } from '@/features/thought/components/common/thought-capture'
import { UnifiedNotificationLayer } from '@/shared/components/unified-notification-layer'
import { useMobile } from '@/shared/hooks/use-mobile'
import { AmbientProvider } from '@/core/stores/ambient-context'
import SettingsPage from '@/features/settings/pages/page'
import NotesPage from '@/features/thought/pages/page'
import HabitsPage from '@/features/habits/pages/page'
import StatsPage from '@/features/stats/pages/page'
import Dashboard from '@/features/dashboard/components/common/dashboard'
import { CalendarView } from '@/features/calendar/components/common/calendar-view'
import { SidebarNav } from '@/core/components/navigation/desktop/sidebar-nav'
import './styles/globals.css'

const queryClient = new QueryClient()

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

function App() {
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

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <HashRouter>
        <App />
      </HashRouter>
    </QueryClientProvider>
  </React.StrictMode>
) 