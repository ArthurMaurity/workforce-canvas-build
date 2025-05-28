
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, User, Plus, X } from 'lucide-react';

interface Employee {
  id: number;
  name: string;
  role: string;
  skills: string[];
  level: string;
  availability: 'Disponível' | 'Ocupado' | 'Férias';
}

interface Team {
  id: number;
  name: string;
  project: string;
  members: Employee[];
  maxMembers: number;
}

const mockEmployees: Employee[] = [
  {
    id: 1,
    name: "Ana Silva",
    role: "Scrum Master",
    skills: ["Scrum Master", "Sprint Planning", "Daily Scrum"],
    level: "Sênior",
    availability: "Disponível"
  },
  {
    id: 2,
    name: "Carlos Santos",
    role: "Product Owner",
    skills: ["Product Owner", "Product Backlog Management", "User Stories"],
    level: "Pleno",
    availability: "Disponível"
  },
  {
    id: 3,
    name: "Maria Costa",
    role: "Developer",
    skills: ["Sprint Planning", "Definition of Done", "Velocity Tracking"],
    level: "Sênior",
    availability: "Disponível"
  },
  {
    id: 4,
    name: "João Oliveira",
    role: "Developer",
    skills: ["Daily Scrum", "Sprint Review", "Burndown Charts"],
    level: "Júnior",
    availability: "Ocupado"
  },
];

const initialTeams: Team[] = [
  {
    id: 1,
    name: "Team Alpha",
    project: "E-commerce Platform",
    members: [],
    maxMembers: 5
  },
  {
    id: 2,
    name: "Team Beta",
    project: "Mobile App",
    members: [],
    maxMembers: 4
  },
];

const DragDropTeamManager: React.FC = () => {
  const [employees] = useState<Employee[]>(mockEmployees);
  const [teams, setTeams] = useState<Team[]>(initialTeams);
  const [draggedEmployee, setDraggedEmployee] = useState<Employee | null>(null);
  const [dragOverTeam, setDragOverTeam] = useState<number | null>(null);

  const handleDragStart = (e: React.DragEvent, employee: Employee) => {
    setDraggedEmployee(employee);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, teamId: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverTeam(teamId);
  };

  const handleDragLeave = () => {
    setDragOverTeam(null);
  };

  const handleDrop = (e: React.DragEvent, teamId: number) => {
    e.preventDefault();
    setDragOverTeam(null);
    
    if (!draggedEmployee) return;

    const targetTeam = teams.find(team => team.id === teamId);
    if (!targetTeam) return;

    if (targetTeam.members.length >= targetTeam.maxMembers) {
      alert('Esta equipe já atingiu o número máximo de membros!');
      return;
    }

    if (targetTeam.members.find(member => member.id === draggedEmployee.id)) {
      alert('Este colaborador já está nesta equipe!');
      return;
    }

    setTeams(prevTeams => 
      prevTeams.map(team => 
        team.id === teamId 
          ? { ...team, members: [...team.members, draggedEmployee] }
          : { ...team, members: team.members.filter(member => member.id !== draggedEmployee.id) }
      )
    );

    setDraggedEmployee(null);
  };

  const handleRemoveMember = (teamId: number, employeeId: number) => {
    setTeams(prevTeams =>
      prevTeams.map(team =>
        team.id === teamId
          ? { ...team, members: team.members.filter(member => member.id !== employeeId) }
          : team
      )
    );
  };

  const availableEmployees = employees.filter(employee => 
    !teams.some(team => team.members.find(member => member.id === employee.id))
  );

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'Disponível': return 'bg-green-100 text-green-800';
      case 'Ocupado': return 'bg-red-100 text-red-800';
      case 'Férias': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">Organização de Equipes</h2>
        <p className="text-muted-foreground">
          Arraste os colaboradores para as equipes desejadas
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Colaboradores Disponíveis */}
        <div className="xl:col-span-1">
          <Card className="h-fit">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Colaboradores Disponíveis ({availableEmployees.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {availableEmployees.map((employee) => (
                <div
                  key={employee.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, employee)}
                  className="p-3 border rounded-lg cursor-move hover:bg-muted/50 transition-colors bg-white"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-medium text-sm">{employee.name}</h4>
                      <p className="text-xs text-muted-foreground">{employee.role}</p>
                    </div>
                    <Badge className={`text-xs ${getAvailabilityColor(employee.availability)}`}>
                      {employee.availability}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {employee.skills.slice(0, 2).map((skill, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {employee.skills.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{employee.skills.length - 2}
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
              {availableEmployees.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <Users className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Todos os colaboradores foram alocados</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Equipes */}
        <div className="xl:col-span-2">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {teams.map((team) => (
              <Card
                key={team.id}
                className={`transition-all duration-200 ${
                  dragOverTeam === team.id 
                    ? 'ring-2 ring-primary bg-primary/5 scale-[1.02]' 
                    : 'hover:shadow-md'
                }`}
                onDragOver={(e) => handleDragOver(e, team.id)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, team.id)}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-primary rounded-full"></div>
                      <span className="text-lg">{team.name}</span>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {team.members.length}/{team.maxMembers}
                    </Badge>
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">{team.project}</p>
                </CardHeader>
                
                <CardContent className="space-y-3">
                  {team.members.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium text-sm">{member.name}</p>
                          <p className="text-xs text-muted-foreground">{member.role}</p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveMember(team.id, member.id)}
                        className="h-8 w-8 p-0 hover:bg-destructive hover:text-destructive-foreground"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  
                  {team.members.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-8 text-muted-foreground border-2 border-dashed border-muted rounded-lg">
                      <Plus className="h-8 w-8 mb-2 opacity-50" />
                      <p className="text-sm">Arraste colaboradores aqui</p>
                    </div>
                  )}
                  
                  {dragOverTeam === team.id && (
                    <div className="absolute inset-0 bg-primary/10 border-2 border-primary border-dashed rounded-lg flex items-center justify-center pointer-events-none">
                      <div className="bg-primary text-primary-foreground px-3 py-1 rounded-md text-sm font-medium">
                        Solte aqui para adicionar à equipe
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DragDropTeamManager;
