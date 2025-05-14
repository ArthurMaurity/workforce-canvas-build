
import React from "react";
import EmployeeList from "@/components/employees/EmployeeList";

const Collaborators: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Colaboradores</h1>
        <p className="text-muted-foreground">
          Gerencie e visualize todos os colaboradores da empresa.
        </p>
      </div>
      
      <EmployeeList />
    </div>
  );
};

export default Collaborators;
