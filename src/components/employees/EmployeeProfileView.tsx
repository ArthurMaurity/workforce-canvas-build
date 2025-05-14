
import React from "react";
import { Employee } from "./EmployeeCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Phone,
  Mail,
  MapPin,
  Building,
  Calendar,
  Edit,
  Calendar as CalendarIcon,
  User,
  Star,
  Briefcase,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface EmployeeProfileViewProps {
  employee: Employee;
}

// Mockup data for history and projects
const employeeHistory = [
  { date: "12/03/2022", event: "Contratação", details: "Início das atividades como Desenvolvedor Frontend" },
  { date: "15/05/2022", event: "Treinamento", details: "Conclusão do programa de onboarding" },
  { date: "03/08/2022", event: "Promoção", details: "Promoção para Desenvolvedor Frontend Senior" },
  { date: "10/01/2023", event: "Treinamento", details: "Conclusão do curso de React Advanced" },
  { date: "22/04/2023", event: "Projeto", details: "Início do projeto Website Redesign" },
];

// We'll use this if no teams are provided in the employee data
const defaultEmployeeProjects = [
  { 
    name: "Portal de Clientes", 
    role: "Desenvolvedor Frontend",
    startDate: "05/06/2022",
    endDate: "20/12/2022",
    status: "Concluído" 
  },
  { 
    name: "Website Redesign", 
    role: "Desenvolvedor Frontend Senior",
    startDate: "22/04/2023",
    endDate: "Em andamento",
    status: "Em progresso" 
  },
];

const EmployeeProfileView: React.FC<EmployeeProfileViewProps> = ({ employee }) => {
  // Format teams for display if they exist, otherwise use mock data
  const employeeProjects = employee.teams && employee.teams.length > 0 
    ? employee.teams.map(team => ({
        name: team.projectName,
        role: team.role,
        startDate: "N/A", // We don't have this data in the current model
        endDate: "Atual",
        status: "Em progresso"
      }))
    : defaultEmployeeProjects;

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={employee.avatar || ""} alt={employee.name} />
            <AvatarFallback className="text-xl">
              {employee.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .substring(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold">{employee.name}</h2>
            <p className="text-muted-foreground">{employee.role}</p>
            <div className="mt-1 flex items-center gap-2">
              <Badge
                variant={employee.status === "Alocado" ? "default" : "outline"}
                className={
                  employee.status === "Alocado"
                    ? "bg-success-500"
                    : "text-warning-500 border-warning-500"
                }
              >
                {employee.status}
              </Badge>
              
              {employee.primarySkill && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Star className="h-3 w-3 text-amber-500" />
                  <span>{employee.primarySkill}</span>
                </Badge>
              )}
            </div>
          </div>
        </div>
        <Button variant="outline" className="shrink-0">
          <Edit className="mr-2 h-4 w-4" />
          Editar Perfil
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1 space-y-6">
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">Informações de Contato</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{employee.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{employee.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{employee.location}</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">Informações Profissionais</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Building className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{employee.department}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{employee.role}</span>
              </div>
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Contratado em {employee.startDate}</span>
              </div>
              {employee.primarySkill && (
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-amber-500" />
                  <span className="text-sm font-medium">Habilidade principal: {employee.primarySkill}</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">Habilidades</h3>
            <div className="flex flex-wrap gap-1">
              {employee.skills.map((skill, index) => (
                <Badge 
                  key={index} 
                  variant="secondary" 
                  className={`text-xs ${employee.primarySkill === skill ? 'border border-amber-500' : ''}`}
                >
                  {skill} {employee.primarySkill === skill && <Star className="h-3 w-3 inline ml-0.5 text-amber-500" />}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        
        <div className="col-span-1 md:col-span-2">
          <Tabs defaultValue="teams">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="teams">Equipes</TabsTrigger>
              <TabsTrigger value="history">Histórico</TabsTrigger>
              <TabsTrigger value="projects">Projetos</TabsTrigger>
            </TabsList>
            
            <TabsContent value="teams" className="mt-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Projeto</TableHead>
                      <TableHead>Função</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {employeeProjects.map((project, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{project.name}</TableCell>
                        <TableCell>{project.role}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              project.status === "Concluído"
                                ? "border-success-500 text-success-500"
                                : "border-primary text-primary"
                            }
                          >
                            {project.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                    {employeeProjects.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={3} className="text-center text-muted-foreground py-4">
                          Este colaborador não está em nenhuma equipe no momento
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            <TabsContent value="history" className="mt-4">
              <div className="relative">
                <div className="absolute w-0.5 bg-muted h-full left-4 top-0" />
                <div className="space-y-6 ml-10">
                  {employeeHistory.map((item, index) => (
                    <div key={index} className="relative">
                      <div className="absolute w-3 h-3 bg-primary rounded-full -left-[36px] top-1.5 z-10" />
                      <div className="mb-1">
                        <span className="text-sm font-medium">{item.event}</span>
                        <span className="text-xs text-muted-foreground ml-2">{item.date}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.details}</p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="projects" className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Projeto</TableHead>
                    <TableHead>Função</TableHead>
                    <TableHead>Período</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {employeeProjects.map((project, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{project.name}</TableCell>
                      <TableCell>{project.role}</TableCell>
                      <TableCell>
                        {project.startDate} - {project.endDate}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            project.status === "Concluído"
                              ? "border-success-500 text-success-500"
                              : "border-primary text-primary"
                          }
                        >
                          {project.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfileView;
