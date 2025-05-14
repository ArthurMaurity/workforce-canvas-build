
import React from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import { 
  Users, 
  LayoutDashboard, 
  LogOut, 
  Settings, 
  User,
  BellRing
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useIsMobile } from "@/hooks/use-mobile";

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label, active }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <NavLink
            to={to}
            className={({ isActive }) => `
              flex items-center gap-3 px-3 py-2 rounded-md transition-colors
              ${isActive || active ? "bg-primary text-primary-foreground" : "hover:bg-muted"}
            `}
          >
            {icon}
            <span>{label}</span>
          </NavLink>
        </TooltipTrigger>
        <TooltipContent side="right">{label}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const DashboardLayout: React.FC = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = React.useState(!isMobile);

  React.useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }
  }, [isMobile]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-0 z-40 h-full bg-white shadow-md transition-all duration-300 ease-in-out dark:bg-gray-900
          ${sidebarOpen ? "w-64" : "w-0 -translate-x-full"}
          ${isMobile ? "lg:relative" : ""}
        `}
      >
        <div className="h-full flex flex-col py-4">
          <div className="px-4 pb-4 mb-6 border-b">
            <h1 className="text-xl font-bold text-primary">StaffSync</h1>
          </div>

          <nav className="flex flex-col gap-1 px-2 flex-1">
            <NavItem
              to="/dashboard"
              icon={<LayoutDashboard size={20} />}
              label="Dashboard"
              active={location.pathname === "/dashboard"}
            />
            <NavItem
              to="/collaborators"
              icon={<Users size={20} />}
              label="Colaboradores"
              active={location.pathname.includes("/collaborators")}
            />
            <NavItem
              to="/profile"
              icon={<User size={20} />}
              label="Meu perfil"
              active={location.pathname === "/profile"}
            />
            <NavItem
              to="/settings"
              icon={<Settings size={20} />}
              label="Configurações"
              active={location.pathname === "/settings"}
            />
          </nav>

          <div className="px-4 mt-auto pt-4 border-t">
            <Button variant="outline" className="w-full justify-start gap-2">
              <LogOut size={18} /> Sair
            </Button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top header */}
        <header className="h-16 border-b bg-white dark:bg-gray-900 flex items-center px-4 justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={toggleSidebar}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
              <span className="sr-only">Menu</span>
            </Button>
            <div className="lg:hidden text-lg font-bold">StaffSync</div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <BellRing size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
            </Button>
            
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="hidden lg:block">
                <div className="font-medium">Carolina Neves</div>
                <div className="text-xs text-muted-foreground">Gerente de RH</div>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
