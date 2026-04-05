import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar />

            <SidebarInset>
                <header className="flex h-16 items-center border-b px-4">
                    <SidebarTrigger />
                </header>

                <div className="p-4">
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}