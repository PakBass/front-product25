"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useRole } from "@/hooks/useRole";
import { RoleGuard } from "@/components/RoleGuard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { IconUsers, IconSettings, IconChartBar, IconReportAnalytics, IconUserCircle, IconAlertCircle, IconDashboard, IconLogout } from "@tabler/icons-react";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { SiteHeader } from "@/components/site-header";

export default function DashboardPage() {
  const router = useRouter();
  const { user, isAdmin, isManager, isUser, roles, loading } = useRole();

  useEffect(() => {
    const token = localStorage.getItem("token");
    // kalau tidak ada token → redirect ke login
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="flex flex-col gap-6 p-6">
            {/* User Info Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground">Welcome back, {user?.name}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-sm text-muted-foreground">Roles:</span>
                  {roles.map((role) => (
                    <Badge key={role} variant={role === "admin" ? "destructive" : role === "manager" ? "default" : "secondary"}>
                      {role}
                    </Badge>
                  ))}
                </div>
              </div>
              <Button onClick={handleLogout} variant="outline" size="sm">
                <IconLogout className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>

            {/* Admin Section */}
            <RoleGuard roles={["admin"]}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <IconSettings className="h-5 w-5" />
                    Admin Panel
                  </CardTitle>
                  <CardDescription>Manage users and system settings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Link href="/admin/users">
                      <Button className="w-full justify-start" variant="outline">
                        <IconUsers className="mr-2 h-4 w-4" />
                        Manage Users
                      </Button>
                    </Link>
                    <Link href="/admin/settings">
                      <Button className="w-full justify-start" variant="outline">
                        <IconSettings className="mr-2 h-4 w-4" />
                        System Settings
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </RoleGuard>

            {/* Manager Section */}
            <RoleGuard roles={["manager"]}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <IconChartBar className="h-5 w-5" />
                    Manager Panel
                  </CardTitle>
                  <CardDescription>View reports and analytics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Link href="/manager/reports">
                      <Button className="w-full justify-start" variant="outline">
                        <IconReportAnalytics className="mr-2 h-4 w-4" />
                        View Reports
                      </Button>
                    </Link>
                    <Link href="/manager/analytics">
                      <Button className="w-full justify-start" variant="outline">
                        <IconChartBar className="mr-2 h-4 w-4" />
                        Analytics
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </RoleGuard>

            {/* User Section */}
            <RoleGuard roles={["user"]}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <IconUserCircle className="h-5 w-5" />
                    User Panel
                  </CardTitle>
                  <CardDescription>Manage your profile and account</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Link href="/profile">
                      <Button className="w-full justify-start" variant="outline">
                        <IconUserCircle className="mr-2 h-4 w-4" />
                        My Profile
                      </Button>
                    </Link>
                    <Link href="/settings">
                      <Button className="w-full justify-start" variant="outline">
                        <IconSettings className="mr-2 h-4 w-4" />
                        Account Settings
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </RoleGuard>

            {/* Fallback for users without specific roles */}
            <RoleGuard
              roles={["admin", "manager", "user"]}
              fallback={
                <Card className="border-yellow-200 bg-yellow-50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-yellow-800">
                      <IconAlertCircle className="h-5 w-5" />
                      Limited Access
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-yellow-700">You don't have any assigned roles. Please contact administrator to get access to specific features.</p>
                  </CardContent>
                </Card>
              }
            >
              {/* Default Dashboard Content */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <IconDashboard className="h-5 w-5" />
                    Dashboard Overview
                  </CardTitle>
                  <CardDescription>Welcome to your dashboard. Here you can access various features based on your role.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {isAdmin && (
                      <Card className="border-l-4 border-l-red-500">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">Admin Access</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <p className="text-xs text-muted-foreground">You have full administrative privileges.</p>
                        </CardContent>
                      </Card>
                    )}
                    {isManager && (
                      <Card className="border-l-4 border-l-blue-500">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">Manager Access</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <p className="text-xs text-muted-foreground">You can manage reports and analytics.</p>
                        </CardContent>
                      </Card>
                    )}
                    {isUser && (
                      <Card className="border-l-4 border-l-green-500">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">User Access</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <p className="text-xs text-muted-foreground">You can manage your profile and settings.</p>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </CardContent>
              </Card>
            </RoleGuard>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
