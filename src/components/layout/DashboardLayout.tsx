
import React from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import { 
  Users, 
  LayoutDashboard, 
  LogOut, 
  Settings, 
  User,
  BellRing,
  UserCog,
  UsersIcon,
  Menu,
  X
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
            <span className="line-clamp-1">{label}</span>
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
    setSidebarOpen(!isMobile);
  }, [isMobile]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Overlay para fechar sidebar */}
      {sidebarOpen && (
        <div 
          className={`
            fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ease-in-out
            ${isMobile ? "lg:hidden" : ""}
            ${sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
          `}
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-0 z-50 h-full bg-white shadow-lg transition-all duration-300 ease-in-out dark:bg-gray-900
          ${sidebarOpen ? "w-64 translate-x-0" : "w-64 -translate-x-full"}
          lg:relative lg:z-auto
          ${!isMobile && sidebarOpen ? "lg:translate-x-0" : ""}
          ${!isMobile && !sidebarOpen ? "lg:-translate-x-full lg:w-0" : ""}
        `}
      >
        <div className="h-full flex flex-col py-4">
          {/* Header com botão de fechar */}
          <div className="px-4 pb-4 mb-6 border-b flex items-center justify-between">
            <h1 className="text-xl font-bold text-primary">Aginerator</h1>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={closeSidebar}
              className="h-8 w-8 lg:hidden"
            >
              <X size={18} />
            </Button>
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
              to="/profile-management"
              icon={<UserCog size={20} />}
              label="Gerenciar Perfis"
              active={location.pathname === "/profile-management"}
            />
            <NavItem
              to="/team-management"
              icon={<UsersIcon size={20} />}
              label="Gerenciar Equipes"
              active={location.pathname === "/team-management"}
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
      <div 
        className={`
          flex flex-col min-h-screen transition-all duration-300 ease-in-out
          ${!isMobile && sidebarOpen ? "lg:ml-64" : "lg:ml-0"}
        `}
      >
        {/* Top header */}
        <header className="h-16 border-b bg-white dark:bg-gray-900 flex items-center px-4 justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleSidebar} 
              className="shrink-0 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <Menu size={24} />
              <span className="sr-only">Menu</span>
            </Button>
            <div className="lg:hidden text-lg font-bold truncate">Aginerator</div>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <BellRing size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
            </Button>
            
            <div className="flex items-center gap-2 md:gap-3">
              <Avatar className="h-8 w-8 md:h-9 md:w-9">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="hidden md:block">
                <div className="font-medium text-sm md:text-base">Carolina Neves</div>
                <div className="text-xs text-muted-foreground">Gerente de RH</div>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-3 md:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
