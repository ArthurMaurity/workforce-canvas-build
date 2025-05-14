
import React from "react";
import DashboardStats from "@/components/dashboard/DashboardStats";
import EmployeeAllocationChart from "@/components/dashboard/EmployeeAllocationChart";
import RecentEmployees from "@/components/dashboard/RecentEmployees";

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Última atualização: {new Date().toLocaleString()}
        </p>
      </div>
      
      <DashboardStats />
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <EmployeeAllocationChart />
        <RecentEmployees />
      </div>
    </div>
  );
};

export default Dashboard;
