import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen">
      <DashboardSidebar />

      <div className="flex-1 overflow-hidden">
        <DashboardNavbar />

        <main className="h-[calc(100vh-64px)] overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}