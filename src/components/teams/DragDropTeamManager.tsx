
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Lightbulb, Target, AlertCircle, Star } from "lucide-react";
import { TeamOptimizer } from "@/utils/teamOptimizer";
import { Employee } from "@/components/employees/EmployeeCard";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  primarySkill?: string;
  avatar: string | null;
  skills: string[];
}

interface Team {
  id: number;
  name: string;
  project: string;
  status: "Ativo" | "Inativo" | "Planejado";
  members: TeamMember[];
  maxMembers: number;
  description?: string;
  requiredSkills?: string[];
}

interface DragDropTeamManagerProps {
  teams: any[];
  availableMembers: Employee[];
  onTeamUpdate: (teams: any[]) => void;
}

const DragDropTeamManager: React.FC<DragDropTeamManagerProps> = ({
  teams,
  availableMembers,
  onTeamUpdate,
}) => {
  const [draggedMember, setDraggedMember] = useState<Employee | null>(null);
  const [optimizationResults, setOptimizationResults] = useState<any[]>([]);

  const handleDragStart = (member: Employee) => {
    setDraggedMember(member);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, teamId: number) => {
    e.preventDefault();
    if (!draggedMember) return;

    const updatedTeams = teams.map(team => {
      if (team.id === teamId && team.members.length < team.maxMembers) {
        const newMember: TeamMember = {
          id: draggedMember.id,
          name: draggedMember.name,
          role: draggedMember.role,
          primarySkill: draggedMember.primarySkill,
          avatar: draggedMember.avatar,
          skills: draggedMember.skills || []
        };
        return {
          ...team,
          members: [...team.members, newMember]
        };
      }
      return team;
    });

    onTeamUpdate(updatedTeams);
    setDraggedMember(null);
  };

  const handleRemoveMember = (teamId: number, memberId: number) => {
    const updatedTeams = teams.map(team => {
      if (team.id === teamId) {
        return {
          ...team,
          members: team.members.filter((member: TeamMember) => member.id !== memberId)
        };
      }
      return team;
    });

    onTeamUpdate(updatedTeams);
  };

  const handleOptimizeTeams = () => {
    const convertedTeams: Team[] = teams.map(team => ({
      ...team,
      members: team.members.map((member: any) => ({
        ...member,
        skills: member.skills || []
      }))
    }));

    const results = TeamOptimizer.suggestOptimalDistribution(
      convertedTeams,
      availableMembers
    );
    setOptimizationResults(results);
  };

  const applySuggestion = (teamId: number, suggestion: Employee) => {
    const updatedTeams = teams.map(team => {
      if (team.id === teamId && team.members.length < team.maxMembers) {
        const newMember: TeamMember = {
          id: suggestion.id,
          name: suggestion.name,
          role: suggestion.role,
          primarySkill: suggestion.primarySkill,
          avatar: suggestion.avatar,
          skills: suggestion.skills || []
        };
        return {
          ...team,
          members: [...team.members, newMember]
        };
      }
      return team;
    });

    onTeamUpdate(updatedTeams);
  };

  const availableMembersFiltered = availableMembers.filter(member => 
    !teams.some(team => 
      team.members.some((teamMember: TeamMember) => teamMember.id === member.id)
    )
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Organização de Equipes</h2>
          <p className="text-muted-foreground">
            Arraste colaboradores para as equipes ou use a otimização automática
          </p>
        </div>
        <Button onClick={handleOptimizeTeams} className="gap-2">
          <Lightbulb className="h-4 w-4" />
          Otimizar Equipes
        </Button>
      </div>

      <Tabs defaultValue="organize" className="space-y-6">
        <TabsList>
          <TabsTrigger value="organize">Organizar</TabsTrigger>
          <TabsTrigger value="suggestions">Sugestões de Otimização</TabsTrigger>
        </TabsList>

        <TabsContent value="organize" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Available Members */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Colaboradores Disponíveis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {availableMembersFiltered.map(member => (
                    <div
                      key={member.id}
                      draggable
                      onDragStart={() => handleDragStart(member)}
                      className="flex items-center space-x-3 p-3 bg-muted/30 rounded-md cursor-move hover:bg-muted/50 transition-colors"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={member.avatar || ""} alt={member.name} />
                        <AvatarFallback className="text-xs">
                          {member.name.split(" ").map(n => n[0]).join("").substring(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{member.name}</p>
                        <p className="text-xs text-muted-foreground">{member.role}</p>
                        {member.primarySkill && (
                          <Badge variant="secondary" className="text-xs mt-1">
                            {member.primarySkill}
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Teams */}
            <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {teams.map(team => (
                <Card
                  key={team.id}
                  className="min-h-[400px]"
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, team.id)}
                >
                  <CardHeader>
                    <CardTitle className="text-lg">{team.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{team.project}</p>
                    <div className="flex justify-between items-center">
                      <Badge variant={team.status === "Ativo" ? "default" : "outline"}>
                        {team.status}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {team.members.length}/{team.maxMembers}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {team.members.map((member: TeamMember) => (
                      <div
                        key={member.id}
                        className="flex items-center justify-between p-2 bg-muted/30 rounded-md"
                      >
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={member.avatar || ""} alt={member.name} />
                            <AvatarFallback className="text-xs">
                              {member.name.split(" ").map(n => n[0]).join("").substring(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{member.name}</p>
                            <p className="text-xs text-muted-foreground">{member.role}</p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveMember(team.id, member.id)}
                        >
                          ×
                        </Button>
                      </div>
                    ))}
                    
                    {team.members.length === 0 && (
                      <div className="text-center py-8 text-muted-foreground border-2 border-dashed border-muted rounded-lg">
                        <Users className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">Arraste colaboradores aqui</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="suggestions" className="space-y-6">
          {optimizationResults.length > 0 ? (
            <div className="grid gap-6">
              {optimizationResults.map((result, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <Target className="h-5 w-5" />
                          {result.team.name}
                        </CardTitle>
                        <p className="text-muted-foreground">{result.team.project}</p>
                      </div>
                      <Badge variant="outline">
                        Score: {(result.score * 100).toFixed(0)}%
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {result.suggestions.length > 0 ? (
                      <>
                        <div>
                          <h4 className="font-medium mb-2">Membros Sugeridos:</h4>
                          <div className="space-y-2">
                            {result.suggestions.map((suggestion: Employee) => (
                              <div
                                key={suggestion.id}
                                className="flex items-center justify-between p-3 bg-muted/30 rounded-md"
                              >
                                <div className="flex items-center space-x-3">
                                  <Avatar className="h-8 w-8">
                                    <AvatarImage src={suggestion.avatar || ""} alt={suggestion.name} />
                                    <AvatarFallback className="text-xs">
                                      {suggestion.name.split(" ").map(n => n[0]).join("").substring(0, 2)}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <p className="text-sm font-medium">{suggestion.name}</p>
                                    <p className="text-xs text-muted-foreground">{suggestion.role}</p>
                                  </div>
                                  {suggestion.primarySkill && (
                                    <div className="flex items-center gap-1">
                                      <Star className="h-3 w-3 text-amber-500" />
                                      <Badge variant="secondary" className="text-xs">
                                        {suggestion.primarySkill}
                                      </Badge>
                                    </div>
                                  )}
                                </div>
                                <Button
                                  size="sm"
                                  onClick={() => applySuggestion(result.team.id, suggestion)}
                                >
                                  Adicionar
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-2">Justificativa:</h4>
                          <ul className="space-y-1 text-sm text-muted-foreground">
                            {result.reasoning.map((reason: string, idx: number) => (
                              <li key={idx} className="flex items-start gap-2">
                                <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                                {reason}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </>
                    ) : (
                      <p className="text-muted-foreground text-center py-4">
                        Equipe já está otimizada ou não há membros disponíveis
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <Lightbulb className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">
                  Clique em "Otimizar Equipes" para ver sugestões de alocação
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DragDropTeamManager;
