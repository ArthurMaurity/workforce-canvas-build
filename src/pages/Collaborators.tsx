
import React from "react";
import EmployeeList from "@/components/employees/EmployeeList";

const Collaborators: React.FC = () => {
  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">Colaboradores</h1>
        <p className="text-sm text-muted-foreground">
          Gerencie e visualize todos os colaboradores da empresa.
        </p>
      </div>
      
      <div className="bg-muted/40 p-4 rounded-lg border border-muted mb-4">
        <h2 className="font-medium text-lg mb-2">Formação de Times Ágeis</h2>
        <p className="text-sm mb-3">
          O Aginerator suporta times de até 9 pessoas, com os seguintes papéis:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          <div className="bg-white dark:bg-black p-3 rounded-md">
            <h3 className="font-medium">Papéis de Gestão</h3>
            <ul className="list-disc list-inside text-sm space-y-1 mt-1">
              <li>Scrum Master</li>
              <li>PO Interno</li>
              <li>PO Externo</li>
            </ul>
          </div>
          <div className="bg-white dark:bg-black p-3 rounded-md">
            <h3 className="font-medium">Papéis Técnicos</h3>
            <ul className="list-disc list-inside text-sm space-y-1 mt-1">
              <li>Desenvolvedores (Front/Back)</li>
              <li>Designer UX/UI</li>
              <li>Testador (QA)</li>
            </ul>
          </div>
          <div className="bg-white dark:bg-black p-3 rounded-md">
            <h3 className="font-medium">Recomendações</h3>
            <ul className="list-disc list-inside text-sm space-y-1 mt-1">
              <li>Times multidisciplinares</li>
              <li>Balanceamento de experiências</li>
              <li>Complementaridade de skills</li>
            </ul>
          </div>
        </div>
      </div>
      
      <EmployeeList />
    </div>
  );
};

export default Collaborators;
