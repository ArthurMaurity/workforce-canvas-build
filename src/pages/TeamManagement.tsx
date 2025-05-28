
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Plus, Edit, Trash2, Users, Star, Shuffle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TeamForm from "@/components/teams/TeamForm";
import DragDropTeamManager from "@/components/teams/DragDropTeamManager";
import { Employee } from "@/components/employees/EmployeeCard";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  primarySkill?: string;
  avatar: string | null;
}

interface Team {
  id: number;
  name: string;
  project: string;
  status: "Ativo" | "Inativo" | "Planejado";
  members: TeamMember[];
  maxMembers: number;
  description?: string;
}

// Mock data for teams
const mockTeams: Team[] = [
  {
    id: 1,
    name: "Team Alpha",
    project: "Portal Cliente",
    status: "Ativo",
    maxMembers: 9,
    description: "Equipe responsável pelo desenvolvimento do portal do cliente",
    members: [
      {
        id: 1,
        name: "Ana Silva",
        role: "Desenvolvedor Front-end",
        primarySkill: "React",
        avatar: null
      },
      {
        id: 2,
        name: "Carlos Santos",
        role: "Scrum Master",
        primarySkill: "Scrum",
        avatar: null
      },
      {
        id: 3,
        name: "Marina Costa",
        role: "Designer UX/UI",
        primarySkill: "Figma",
        avatar: null
      }
    ]
  },
  {
    id: 2,
    name: "Team Beta",
    project: "App Mobile",
    status: "Ativo",
    maxMembers: 9,
    description: "Equipe focada no desenvolvimento do aplicativo mobile",
    members: [
      {
        id: 4,
        name: "Pedro Oliveira",
        role: "Desenvolvedor Back-end",
        primarySkill: "Node.js",
        avatar: null
      },
      {
        id: 5,
        name: "Julia Santos",
        role: "PO Interno",
        primarySkill: "Product Management",
        avatar: null
      }
    ]
  },
  {
    id: 3,
    name: "Team Gamma",
    project: "Sistema Interno",
    status: "Planejado",
    maxMembers: 9,
    description: "Nova equipe para o projeto do sistema interno",
    members: []
  }
];

// Mock available employees
const mockAvailableEmployees: Employee[] = [
  {
    id: 6,
    name: "Lucas Mendes",
    role: "Desenvolvedor Frontend",
    department: "Desenvolvimento",
    location: "São Paulo, SP",
    email: "lucas.mendes@empresa.com",
    phone: "(11) 99999-6666",
    startDate: "10/05/2023",
    status: "Disponível",
    avatar: null,
    skills: ["Vue.js", "JavaScript", "CSS"],
    primarySkill: "Vue.js"
  },
  {
    id: 7,
    name: "Carla Rodrigues",
    role: "QA Engineer",
    department: "Qualidade",
    location: "Rio de Janeiro, RJ",
    email: "carla.rodrigues@empresa.com",
    phone: "(21) 99999-7777",
    startDate: "15/02/2023",
    status: "Disponível",
    avatar: null,
    skills: ["Selenium", "Jest", "Cypress"],
    primarySkill: "Selenium"
  },
  {
    id: 8,
    name: "Fernando Lima",
    role: "DevOps Engineer",
    department: "Infraestrutura",
    location: "Brasília, DF",
    email: "fernando.lima@empresa.com",
    phone: "(61) 99999-8888",
    startDate: "08/09/2022",
    status: "Disponível",
    avatar: null,
    skills: ["AWS", "Docker", "Kubernetes"],
    primarySkill: "AWS"
  }
];

const TeamManagement: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>(mockTeams);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTeam, setEditingTeam] = useState<Team | null>(null);

  const filteredTeams = teams.filter(team =>
    team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.project.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateTeam = (data: any) => {
    const newTeam: Team = {
      id: teams.length + 1,
      ...data,
      members: []
    };
    setTeams([...teams, newTeam]);
    setIsFormOpen(false);
  };

  const handleEditTeam = (data: any) => {
    if (editingTeam) {
      setTeams(teams.map(team => 
        team.id === editingTeam.id ? { ...team, ...data } : team
      ));
      setEditingTeam(null);
      setIsFormOpen(false);
    }
  };

  const handleDeleteTeam = (id: number) => {
    setTeams(teams.filter(team => team.id !== id));
  };

  const openEditForm = (team: Team) => {
    setEditingTeam(team);
    setIsFormOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ativo":
        return "default";
      case "Inativo":
        return "secondary";
      case "Planejado":
        return "outline";
      default:
        return "outline";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gerenciamento de Equipes</h1>
          <p className="text-muted-foreground">
            Gerencie equipes ágeis e suas alocações por projeto.
          </p>
        </div>
        
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingTeam(null)}>
              <Plus className="mr-2 h-4 w-4" />
              Nova Equipe
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingTeam ? "Editar Equipe" : "Nova Equipe"}
              </DialogTitle>
            </DialogHeader>
            <TeamForm
              initialData={editingTeam || undefined}
              onSubmit={editingTeam ? handleEditTeam : handleCreateTeam}
              onCancel={() => {
                setIsFormOpen(false);
                setEditingTeam(null);
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="organize" className="gap-2">
            <Shuffle className="h-4 w-4" />
            Organizar Equipes
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome da equipe ou projeto..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredTeams.map((team) => (
              <Card key={team.id} className="overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{team.name}</CardTitle>
                      <p className="text-muted-foreground">{team.project}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={getStatusColor(team.status)}>
                        {team.status}
                      </Badge>
                      <div className="flex space-x-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openEditForm(team)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteTeam(team.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  {team.description && (
                    <p className="text-sm text-muted-foreground">{team.description}</p>
                  )}
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span>Membros: {team.members.length}/{team.maxMembers}</span>
                    </div>
                    <Button variant="outline" size="sm">
                      Gerenciar Membros
                    </Button>
                  </div>
                  
                  {team.members.length > 0 ? (
                    <div className="space-y-3">
                      <p className="text-sm font-medium">Membros da Equipe</p>
                      <div className="space-y-2">
                        {team.members.map((member) => (
                          <div key={member.id} className="flex items-center justify-between p-2 bg-muted/30 rounded-md">
                            <div className="flex items-center space-x-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={member.avatar || ""} alt={member.name} />
                                <AvatarFallback className="text-xs">
                                  {member.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")
                                    .substring(0, 2)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="text-sm font-medium">{member.name}</p>
                                <p className="text-xs text-muted-foreground">{member.role}</p>
                              </div>
                            </div>
                            {member.primarySkill && (
                              <div className="flex items-center gap-1">
                                <Star className="h-3 w-3 text-amber-500" />
                                <Badge variant="secondary" className="text-xs">
                                  {member.primarySkill}
                                </Badge>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <Users className="h-12 w-12 mx-auto mb-2 opacity-50" />
                      <p>Nenhum membro alocado</p>
                      <Button variant="outline" size="sm" className="mt-2">
                        Adicionar Membros
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="organize">
          <DragDropTeamManager
            teams={teams}
            availableMembers={mockAvailableEmployees}
            onTeamUpdate={setTeams}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TeamManagement;
