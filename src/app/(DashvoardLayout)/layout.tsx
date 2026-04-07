import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function layout({
    children,
    admin,
    user

}: {
    children: React.ReactNode
    admin: React.ReactNode
    user: React.ReactNode

}) {
    const userInfo = {
        role: "ADMIN"
    }
    return (
        <SidebarProvider>
            <AppSidebar user={userInfo} />

            <SidebarInset>
                <header className="flex h-16 items-center border-b px-4">
                    <SidebarTrigger />
                </header>

                <div className="p-4">
                    {userInfo.role === "admin" ? admin : user}
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}