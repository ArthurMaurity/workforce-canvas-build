
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus, Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import EmployeeCard, { Employee } from "./EmployeeCard";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import EmployeeForm from "./EmployeeForm";
import EmployeeProfileView from "./EmployeeProfileView";
import EmployeeAllocationDialog from "./EmployeeAllocationDialog";

// Simulated employee data
const employeeData: Employee[] = [
  {
    id: 1,
    name: "Ana Carolina Silva",
    role: "Desenvolvedora Frontend",
    department: "Desenvolvimento",
    location: "São Paulo, SP",
    email: "ana.silva@empresa.com",
    phone: "(11) 98765-4321",
    startDate: "12/03/2022",
    status: "Alocado",
    avatar: null,
    skills: ["React", "TypeScript", "Tailwind CSS"],
  },
  {
    id: 2,
    name: "Rafael Mendes",
    role: "UX/UI Designer",
    department: "Design",
    location: "Rio de Janeiro, RJ",
    email: "rafael.mendes@empresa.com",
    phone: "(21) 98765-1234",
    startDate: "05/01/2023",
    status: "Disponível",
    avatar: null,
    skills: ["Figma", "Adobe XD", "User Research"],
  },
  {
    id: 3,
    name: "Juliana Costa",
    role: "Product Manager",
    department: "Produto",
    location: "Belo Horizonte, MG",
    email: "juliana.costa@empresa.com",
    phone: "(31) 91234-5678",
    startDate: "18/05/2022",
    status: "Alocado",
    avatar: null,
    skills: ["Scrum", "Product Strategy", "Data Analysis"],
  },
  {
    id: 4,
    name: "Lucas Oliveira",
    role: "Desenvolvedor Backend",
    department: "Desenvolvimento",
    location: "Curitiba, PR",
    email: "lucas.oliveira@empresa.com",
    phone: "(41) 99876-5432",
    startDate: "22/07/2023",
    status: "Disponível",
    avatar: null,
    skills: ["Node.js", "Python", "AWS"],
  },
  {
    id: 5,
    name: "Mariana Santos",
    role: "Analista de Marketing",
    department: "Marketing",
    location: "Brasília, DF",
    email: "mariana.santos@empresa.com",
    phone: "(61) 98765-4321",
    startDate: "10/02/2023",
    status: "Alocado",
    avatar: null,
    skills: ["SEO", "Social Media", "Content Strategy"],
  },
  {
    id: 6,
    name: "Pedro Almeida",
    role: "DevOps Engineer",
    department: "Desenvolvimento",
    location: "Porto Alegre, RS",
    email: "pedro.almeida@empresa.com",
    phone: "(51) 98123-4567",
    startDate: "03/04/2022",
    status: "Alocado",
    avatar: null,
    skills: ["Docker", "Kubernetes", "CI/CD"],
  },
];

const EmployeeList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [employees] = useState<Employee[]>(employeeData);

  // Dialog states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isAllocationOpen, setIsAllocationOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  const handleEdit = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsFormOpen(true);
  };

  const handleView = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsViewOpen(true);
  };

  const handleAllocate = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsAllocationOpen(true);
  };

  const handleFormSubmit = (data: any) => {
    console.log("Form submitted:", data);
    setIsFormOpen(false);
  };

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.role.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = filterDepartment === "" || 
                             employee.department === filterDepartment;
    
    const matchesStatus = filterStatus === "" || 
                         employee.status === filterStatus;
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  return (
    <>
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2 flex-1">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar colaboradores..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex flex-col md:flex-row gap-2">
          <Select value={filterDepartment} onValueChange={setFilterDepartment}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Departamento" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos os departamentos</SelectItem>
              <SelectItem value="Desenvolvimento">Desenvolvimento</SelectItem>
              <SelectItem value="Design">Design</SelectItem>
              <SelectItem value="Produto">Produto</SelectItem>
              <SelectItem value="Marketing">Marketing</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="Alocado">Alocados</SelectItem>
              <SelectItem value="Disponível">Disponíveis</SelectItem>
            </SelectContent>
          </Select>
          
          <Button onClick={() => setIsFormOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Novo Colaborador
          </Button>
        </div>
      </div>
      
      {filteredEmployees.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredEmployees.map((employee) => (
            <EmployeeCard
              key={employee.id}
              employee={employee}
              onEdit={handleEdit}
              onView={handleView}
              onAllocate={handleAllocate}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="rounded-full bg-muted p-3 mb-4">
            <Search className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="font-medium text-lg mb-1">Nenhum colaborador encontrado</h3>
          <p className="text-muted-foreground text-sm max-w-md mb-4">
            Tente ajustar os filtros ou criar um novo colaborador para começar.
          </p>
          <Button onClick={() => setIsFormOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Novo Colaborador
          </Button>
        </div>
      )}
      
      {/* Employee form dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>
              {selectedEmployee ? "Editar Colaborador" : "Novo Colaborador"}
            </DialogTitle>
            <DialogDescription>
              {selectedEmployee
                ? "Atualize as informações do colaborador no formulário abaixo."
                : "Preencha as informações do novo colaborador no formulário abaixo."}
            </DialogDescription>
          </DialogHeader>
          <EmployeeForm
            initialData={selectedEmployee || undefined}
            onSubmit={handleFormSubmit}
            onCancel={() => setIsFormOpen(false)}
          />
        </DialogContent>
      </Dialog>
      
      {/* Employee profile view dialog */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="max-w-3xl">
          {selectedEmployee && <EmployeeProfileView employee={selectedEmployee} />}
        </DialogContent>
      </Dialog>
      
      {/* Employee allocation dialog */}
      <Dialog open={isAllocationOpen} onOpenChange={setIsAllocationOpen}>
        <DialogContent className="max-w-xl">
          {selectedEmployee && (
            <EmployeeAllocationDialog 
              employee={selectedEmployee} 
              onAllocate={() => setIsAllocationOpen(false)} 
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EmployeeList;
