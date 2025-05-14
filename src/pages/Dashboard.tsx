
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
