import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Users, Target } from "lucide-react";
import DragDropTeamManager from "@/components/teams/DragDropTeamManager";
import TeamForm from "@/components/teams/TeamForm";

export interface Team {
  id: number;
  name: string;
  description: string;
  members: string[];
  skills: string[];
}

const mockTeams: Team[] = [
  {
    id: 1,
    name: "Time Ágil Alpha",
    description: "Focado em desenvolvimento de novos produtos",
    members: ["João", "Maria", "Carlos"],
    skills: ["React", "Node.js", "Scrum"]
  },
  {
    id: 2,
    name: "Time Inovação Beta",
    description: "Especializado em soluções de IA",
    members: ["Ana", "Pedro", "Lucas"],
    skills: ["Python", "TensorFlow", "Agile"]
  },
  {
    id: 3,
    name: "Time de Dados Gama",
    description: "Análise e visualização de dados",
    members: ["Sofia", "Miguel", "Juliana"],
    skills: ["SQL", "Tableau", "Data Mining"]
  }
];

const TeamManagement: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>(mockTeams);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTeam, setEditingTeam] = useState<Team | null>(null);

  const filteredTeams = teams.filter(team =>
    team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.members.some(member => member.toLowerCase().includes(searchTerm.toLowerCase())) ||
    team.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleCreateTeam = (data: Omit<Team, 'id'>) => {
    const newTeam: Team = {
      id: teams.length + 1,
      ...data,
      members: [],
      skills: []
    };
    setTeams([...teams, newTeam]);
    setIsFormOpen(false);
  };

  const handleEditTeam = (data: Omit<Team, 'id'>) => {
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

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gerenciamento de Times</h1>
          <p className="text-muted-foreground">
            Crie, edite e gerencie seus times de projeto.
          </p>
        </div>

        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingTeam(null)}>
              <Plus className="mr-2 h-4 w-4" />
              Novo Time
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingTeam ? "Editar Time" : "Novo Time"}
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
      
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex items-center space-x-2 flex-1">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar times..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredTeams.map((team) => (
          <Card key={team.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <CardHeader className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                <CardTitle className="text-lg">{team.name}</CardTitle>
              </div>
              <div className="flex space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => openEditForm(team)}
                >
                  Editar
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteTeam(team.id)}
                >
                  Excluir
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-1">
              <p className="text-sm text-muted-foreground">{team.description}</p>
              <div className="flex flex-wrap gap-1 mt-2">
                {team.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary">{skill}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Otimização de Times
            </CardTitle>
          </CardHeader>
          <CardContent>
            <DragDropTeamManager />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TeamManagement;
