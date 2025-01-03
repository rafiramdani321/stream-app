import { create } from "zustand";

interface SidebarDashboardProps {
  collapsed: boolean;
  onExpand: () => void;
  onCollapse: () => void;
}

export const useSidebarDashboard = create<SidebarDashboardProps>((set) =>  ({
  collapsed: false,
  onExpand: () => set(() => ({  collapsed: false })),
  onCollapse: () => set(() => ({ collapsed: true })),
}))