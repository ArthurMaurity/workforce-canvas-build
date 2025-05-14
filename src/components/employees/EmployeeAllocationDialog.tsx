
import React, { useState } from "react";
import { Employee } from "./EmployeeCard";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock projects for allocation
const availableProjects = [
  { id: 1, name: "Portal de Clientes", department: "Desenvolvimento" },
  { id: 2, name: "Aplicativo Mobile", department: "Desenvolvimento" },
  { id: 3, name: "Redesign Website", department: "Design" },
  { id: 4, name: "Campanha Q4", department: "Marketing" },
  { id: 5, name: "Análise de Dados", department: "Produto" },
];

interface EmployeeAllocationDialogProps {
  employee: Employee;
  onAllocate: () => void;
}

const EmployeeAllocationDialog: React.FC<EmployeeAllocationDialogProps> = ({
  employee,
  onAllocate,
}) => {
  const [selectedProject, setSelectedProject] = useState<string>("");
  const [selectedRole, setSelectedRole] = useState<string>(employee.role);
  const { toast } = useToast();

  // Filter projects by employee's department
  const relevantProjects = availableProjects.filter(
    (project) => project.department === employee.department
  );

  const handleAllocate = () => {
    if (!selectedProject) {
      toast({
        title: "Erro",
        description: "Selecione um projeto para alocação",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Sucesso!",
      description: `${employee.name} alocado(a) para ${selectedProject}`,
    });
    
    onAllocate();
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>Alocar Colaborador</DialogTitle>
      </DialogHeader>

      <div className="mt-4 space-y-4">
        <div className="flex items-center gap-3 p-3 bg-muted/40 rounded-md">
          <Avatar>
            <AvatarImage src={employee.avatar || ""} alt={employee.name} />
            <AvatarFallback>
              {employee.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .substring(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{employee.name}</p>
            <p className="text-sm text-muted-foreground">{employee.role}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Projeto</label>
            <Select value={selectedProject} onValueChange={setSelectedProject}>
              <SelectTrigger>
                <SelectValue placeholder="Selecionar projeto" />
              </SelectTrigger>
              <SelectContent>
                {relevantProjects.map((project) => (
                  <SelectItem key={project.id} value={project.name}>
                    {project.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Função no projeto</label>
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger>
                <SelectValue placeholder="Selecionar função" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={employee.role}>{employee.role}</SelectItem>
                <SelectItem value="Líder Técnico">Líder Técnico</SelectItem>
                <SelectItem value="Gerente de Projeto">Gerente de Projeto</SelectItem>
                <SelectItem value="Analista">Analista</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="border p-3 rounded-md bg-muted/30">
            <h4 className="text-sm font-medium mb-2">Habilidades relevantes</h4>
            <div className="text-sm space-y-1">
              {employee.skills.map((skill, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={onAllocate}>
            Cancelar
          </Button>
          <Button onClick={handleAllocate}>
            Confirmar Alocação
          </Button>
        </div>
      </div>
    </>
  );
};

export default EmployeeAllocationDialog;
