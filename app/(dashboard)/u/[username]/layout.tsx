import React from "react";
import NavbarDashboard from "./_components/navbar";
import SidebarDashboard from "./_components/sidebar";
import { Container } from "./_components/container";
import { getSelfByUsername } from "@/lib/auth-service";
import { redirect } from "next/navigation";

interface DashboardLayoutProps {
  params: { username: string },
  children: React.ReactNode;
}

const DashboardLayout = async ({
  params, children
}: DashboardLayoutProps) => {
  const self = await getSelfByUsername(params.username);

  if(!self) {
    redirect("/");
  }

  return (
    <>
      <NavbarDashboard />
      <div className="flex h-full mt-20">
        <SidebarDashboard />
        <Container>
          {children}
        </Container>
      </div>
    </>
  )
}

export default DashboardLayout;