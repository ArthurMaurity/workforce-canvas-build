
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Plus, Edit, Trash2, Star } from "lucide-react";
import EmployeeForm from "@/components/employees/EmployeeForm";
import EmployeeProfileView from "@/components/employees/EmployeeProfileView";
import { Employee } from "@/components/employees/EmployeeCard";

// Mock data for employees
const mockEmployees: Employee[] = [
  {
    id: 1,
    name: "Ana Silva",
    role: "Desenvolvedor Front-end",
    department: "Desenvolvimento",
    location: "São Paulo, SP",
    email: "ana.silva@empresa.com",
    phone: "(11) 99999-1111",
    startDate: "15/03/2022",
    status: "Disponível",
    avatar: null,
    skills: ["React", "TypeScript", "CSS", "HTML"],
    primarySkill: "React",
    teams: [{ projectName: "Portal Cliente", role: "Desenvolvedor Frontend" }]
  },
  {
    id: 2,
    name: "Carlos Santos",
    role: "Scrum Master",
    department: "Produto",
    location: "Rio de Janeiro, RJ",
    email: "carlos.santos@empresa.com",
    phone: "(21) 99999-2222",
    startDate: "10/01/2021",
    status: "Alocado",
    avatar: null,
    skills: ["Scrum", "Kanban", "Gestão de Projetos"],
    primarySkill: "Scrum",
    teams: [{ projectName: "App Mobile", role: "Scrum Master" }]
  },
  {
    id: 3,
    name: "Marina Costa",
    role: "Designer UX/UI",
    department: "Design",
    location: "Belo Horizonte, MG",
    email: "marina.costa@empresa.com",
    phone: "(31) 99999-3333",
    startDate: "22/08/2022",
    status: "Disponível",
    avatar: null,
    skills: ["Figma", "Adobe XD", "Design System", "Prototipagem"],
    primarySkill: "Figma"
  }
];

const ProfileManagement: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateEmployee = (data: any) => {
    const newEmployee: Employee = {
      id: employees.length + 1,
      ...data,
      avatar: null,
      teams: []
    };
    setEmployees([...employees, newEmployee]);
    setIsFormOpen(false);
  };

  const handleEditEmployee = (data: any) => {
    if (editingEmployee) {
      setEmployees(employees.map(emp => 
        emp.id === editingEmployee.id ? { ...emp, ...data } : emp
      ));
      setEditingEmployee(null);
      setIsFormOpen(false);
    }
  };

  const handleDeleteEmployee = (id: number) => {
    setEmployees(employees.filter(emp => emp.id !== id));
  };

  const openEditForm = (employee: Employee) => {
    setEditingEmployee(employee);
    setIsFormOpen(true);
  };

  const openViewProfile = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsViewOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gerenciamento de Perfis</h1>
          <p className="text-muted-foreground">
            Gerencie todos os perfis de colaboradores e suas competências principais.
          </p>
        </div>
        
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingEmployee(null)}>
              <Plus className="mr-2 h-4 w-4" />
              Novo Colaborador
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingEmployee ? "Editar Colaborador" : "Novo Colaborador"}
              </DialogTitle>
            </DialogHeader>
            <EmployeeForm
              initialData={editingEmployee || undefined}
              onSubmit={editingEmployee ? handleEditEmployee : handleCreateEmployee}
              onCancel={() => {
                setIsFormOpen(false);
                setEditingEmployee(null);
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center space-x-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar por nome, cargo ou departamento..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEmployees.map((employee) => (
          <Card key={employee.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={employee.avatar || ""} alt={employee.name} />
                  <AvatarFallback>
                    {employee.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-semibold">{employee.name}</h3>
                  <p className="text-sm text-muted-foreground">{employee.role}</p>
                  <Badge
                    variant={employee.status === "Alocado" ? "default" : "outline"}
                    className="mt-1"
                  >
                    {employee.status}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm font-medium">Departamento</p>
                <p className="text-sm text-muted-foreground">{employee.department}</p>
              </div>
              
              {employee.primarySkill && (
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-amber-500" />
                  <span className="text-sm font-medium">{employee.primarySkill}</span>
                </div>
              )}
              
              <div>
                <p className="text-sm font-medium mb-2">Habilidades</p>
                <div className="flex flex-wrap gap-1">
                  {employee.skills.slice(0, 3).map((skill, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {employee.skills.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{employee.skills.length - 3}
                    </Badge>
                  )}
                </div>
              </div>
              
              <div className="flex justify-between pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openViewProfile(employee)}
                >
                  Ver Perfil
                </Button>
                <div className="space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openEditForm(employee)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteEmployee(employee.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Profile View Dialog */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Perfil do Colaborador</DialogTitle>
          </DialogHeader>
          {selectedEmployee && (
            <EmployeeProfileView employee={selectedEmployee} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProfileManagement;
