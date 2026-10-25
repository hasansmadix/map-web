import RouteGuard from '@/components/guard/RouteGuard';
import { AppSidebar } from '@/components/layout/sidebar/app-sidebar';
import { DashboardBreadcrumb } from '@/components/shared/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: {
    template: '%s | MAP Media Art Production',
    default: 'MAP Media Art Production',
  },
};

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <RouteGuard>
      <SidebarProvider>
        <AppSidebar side="left" />
        <SidebarInset className="m-0! h-full max-w-full min-w-0 overflow-x-clip rounded-none! border-none! p-0! shadow-none">
          <header className="bg-background/85 sticky top-0 z-30 flex h-(--app-header-height) w-full shrink-0 items-center justify-between gap-2 border-b px-4 backdrop-blur-md md:px-8">
            <div className="flex min-w-0 flex-1 items-center gap-2">
              <SidebarTrigger className="-me-1" />
              <Separator orientation="vertical" className="me-2 data-[orientation=vertical]:h-4" />
              <DashboardBreadcrumb />
            </div>
          </header>
          <div className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col gap-4 px-4 pt-6 pb-4 md:px-8 md:pt-8">
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </RouteGuard>
  );
}
