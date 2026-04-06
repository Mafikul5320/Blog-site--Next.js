import * as React from "react"

import { SearchForm } from "@/components/search-form"
import { VersionSwitcher } from "@/components/version-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarRail,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { adminRoute } from "@/Routes/adminRoutes"
import { userRoute } from "@/Routes/userRoutes"
import { Route } from "@/types"


export function AppSidebar({ user, ...props }: { user: { role: string } & React.ComponentProps<typeof Sidebar> }) {

  let routes: Route[] = [];
  switch (user.role) {
    case "admin":
      routes = adminRoute
      break;
    case "user":
      routes = userRoute
      break;

    default:
      routes = []
      break;
  }

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SearchForm />
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {routes.map((item) => (
          <SidebarGroup key={item.title}>
            <Link href={item.url}><SidebarGroupLabel>{item.title}</SidebarGroupLabel></Link>
            <SidebarGroupContent>
              <SidebarMenu>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
