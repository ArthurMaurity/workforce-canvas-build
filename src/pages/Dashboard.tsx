
import React from "react";
import DashboardStats from "@/components/dashboard/DashboardStats";
import EmployeeAllocationChart from "@/components/dashboard/EmployeeAllocationChart";
import RecentEmployees from "@/components/dashboard/RecentEmployees";

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Última atualização: {new Date().toLocaleString()}
        </p>
      </div>
      
      <div className="bg-muted/40 p-4 rounded-lg border border-muted mb-4">
        <h2 className="font-medium text-lg mb-2">Aginerator - Formação de Times Ágeis</h2>
        <p className="text-sm mb-3">
          Visualize as competências principais de cada colaborador para montar times mais eficientes.
          Lembre-se que cada colaborador só pode ser alocado em uma equipe por projeto.
        </p>
      </div>
      
      <DashboardStats />
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 md:gap-4">
        <div className="lg:col-span-2 xl:col-span-3">
          <EmployeeAllocationChart />
        </div>
        <div className="lg:col-span-2 xl:col-span-1">
          <RecentEmployees />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
