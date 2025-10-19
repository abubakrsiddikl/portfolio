import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="min-w-0">
        {/* Header */}
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-gradient-to-r from-[#1e084c]  to-[#310f70] text-white overflow-hidden">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <h1 className="text-lg font-semibold">Dashboard</h1>
        </header>

        {/* Main content children */}

        <section className=" relative min-h-screen  bg-gradient-to-tr from-[#0a021f] via-[#120336] to-[#1a0449] text-white overflow-hidden">
          {/* Background glow */}
          <div className=" inset-0 bg-[radial-gradient(circle_at_top_right,_#6d28d9_40%,_transparent_100%)] opacity-30 animate-fade-glow-once"></div>

          <main className="flex flex-1 flex-col gap-4 p-4">{children}</main>
        </section>
      </SidebarInset>
    </SidebarProvider>
  );
}
