"use client";
import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "../../public/logo.png";
import Image from "next/image";

const data = {
  navMain: [
    {
      title: "",
      url: "#",
      items: [
        {
          title: "Add Project",
          url: "/dashboard/addproject",
        },
        {
          title: "Add Blog",
          url: "/dashboard/addblog",
        },
        {
          title: "Logout",
          url: "/dashboard/logout",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <Sidebar {...props}>
      {/* logo */}
      <SidebarHeader className="bg-[#2a0d63]">
        <Link href={"/"}>
          <Image src={logo} alt="logo" width={50} height={50}></Image>
        </Link>
      </SidebarHeader>
      <SidebarContent className="relative min-h-screen  bg-gradient-to-tr from-[#0a021f] via-[#120336] to-[#1a0449] text-white overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#6d28d9_40%,_transparent_100%)] opacity-30 animate-fade-glow-once"></div>

        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={pathname === item.url}>
                      <Link href={item.url}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
