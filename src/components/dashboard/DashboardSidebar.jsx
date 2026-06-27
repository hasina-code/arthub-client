import SidebarContent from "./SidebarContent";

export default function DashboardSidebar({ navItems }) {
  return (
    <aside className="w-[260px] min-h-screen border-r border-gray-800">
      <SidebarContent navItems={navItems} />
    </aside>
  );
}