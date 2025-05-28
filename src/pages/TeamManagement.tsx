
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, UserPlus, Sparkles, Shuffle } from "lucide-react";
import DragDropTeamManager from "@/components/teams/DragDropTeamManager";
import { optimizeTeams } from "@/utils/teamOptimizer";

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
    skills: ["Facilitação", "Comunicação clara", "Conhecimento avançado do framework Scrum"],
    level: "Sênior",
    availability: "Disponível"
  },
  {
    id: 2,
    name: "Carlos Santos",
    role: "Product Owner",
    skills: ["Visão estratégica do negócio", "Gestão de backlog", "Priorização"],
    level: "Pleno",
    availability: "Disponível"
  },
  {
    id: 3,
    name: "Maria Costa",
    role: "Desenvolvedor",
    skills: ["Stack técnico relevante", "Auto-organização", "Versionamento de código"],
    level: "Sênior",
    availability: "Disponível"
  },
  {
    id: 4,
    name: "João Oliveira",
    role: "Desenvolvedor",
    skills: ["Testes automatizados", "Colaboração", "Multidisciplinaridade"],
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

const TeamManagement: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>(initialTeams);
  const [employees] = useState<Employee[]>(mockEmployees);

  const availableMembers = employees.filter(employee => 
    !teams.some(team => team.members.find(member => member.id === employee.id))
  );

  const handleOptimizeTeams = () => {
    const optimizedTeams = optimizeTeams(teams, availableMembers);
    setTeams(optimizedTeams);
  };

  const teamStats = {
    totalTeams: teams.length,
    totalMembers: teams.reduce((acc, team) => acc + team.members.length, 0),
    availableMembers: availableMembers.length,
    averageTeamSize: teams.length > 0 ? Math.round(teams.reduce((acc, team) => acc + team.members.length, 0) / teams.length) : 0
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestão de Equipes</h1>
          <p className="text-muted-foreground">
            Organize equipes ágeis com base nas competências Scrum dos colaboradores.
          </p>
        </div>
        
        <Button onClick={handleOptimizeTeams} className="flex items-center gap-2">
          <Sparkles className="h-4 w-4" />
          Otimizar Equipes
        </Button>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Equipes</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teamStats.totalTeams}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Membros Alocados</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teamStats.totalMembers}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Disponíveis</CardTitle>
            <Shuffle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teamStats.availableMembers}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tamanho Médio</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teamStats.averageTeamSize}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="organize" className="space-y-6">
        <TabsList>
          <TabsTrigger value="organize">Organizar Equipes</TabsTrigger>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
        </TabsList>
        
        <TabsContent value="organize">
          <DragDropTeamManager />
        </TabsContent>
        
        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {teams.map((team) => (
              <Card key={team.id}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {team.name}
                    <Badge variant="secondary">
                      {team.members.length}/{team.maxMembers}
                    </Badge>
                  </CardTitle>
                  <CardDescription>{team.project}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {team.members.length > 0 ? (
                      team.members.map((member) => (
                        <div key={member.id} className="flex items-center justify-between p-2 bg-muted rounded">
                          <div>
                            <p className="font-medium">{member.name}</p>
                            <p className="text-sm text-muted-foreground">{member.role}</p>
                          </div>
                          <Badge variant="outline">{member.level}</Badge>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground text-center py-4">
                        Nenhum membro alocado
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TeamManagement;
