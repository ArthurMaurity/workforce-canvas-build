
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Users, Plus, Sparkles, ArrowRight } from "lucide-react";
import { TeamOptimizer } from "@/utils/teamOptimizer";
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

interface DragDropTeamManagerProps {
  teams: Team[];
  availableMembers: Employee[];
  onTeamUpdate: (teams: Team[]) => void;
}

const DragDropTeamManager: React.FC<DragDropTeamManagerProps> = ({
  teams,
  availableMembers,
  onTeamUpdate,
}) => {
  const [draggedMember, setDraggedMember] = useState<TeamMember | Employee | null>(null);
  const [dragOverTeam, setDragOverTeam] = useState<number | null>(null);
  const [optimizationResults, setOptimizationResults] = useState<any[]>([]);

  const handleDragStart = (e: React.DragEvent, member: TeamMember | Employee) => {
    setDraggedMember(member);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent, teamId: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverTeam(teamId);
  };

  const handleDragLeave = () => {
    setDragOverTeam(null);
  };

  const handleDrop = (e: React.DragEvent, targetTeamId: number) => {
    e.preventDefault();
    setDragOverTeam(null);

    if (!draggedMember) return;

    const updatedTeams = teams.map(team => {
      // Remove member from current team if they're already in one
      const memberInTeam = team.members.find(m => m.id === draggedMember.id);
      if (memberInTeam) {
        return {
          ...team,
          members: team.members.filter(m => m.id !== draggedMember.id)
        };
      }
      return team;
    });

    // Add member to target team
    const finalTeams = updatedTeams.map(team => {
      if (team.id === targetTeamId && team.members.length < team.maxMembers) {
        const newMember: TeamMember = {
          id: draggedMember.id,
          name: draggedMember.name,
          role: draggedMember.role,
          primarySkill: 'primarySkill' in draggedMember ? draggedMember.primarySkill : undefined,
          avatar: draggedMember.avatar
        };
        return {
          ...team,
          members: [...team.members, newMember]
        };
      }
      return team;
    });

    onTeamUpdate(finalTeams);
    setDraggedMember(null);
  };

  const handleRemoveFromTeam = (teamId: number, memberId: number) => {
    const updatedTeams = teams.map(team => {
      if (team.id === teamId) {
        return {
          ...team,
          members: team.members.filter(m => m.id !== memberId)
        };
      }
      return team;
    });
    onTeamUpdate(updatedTeams);
  };

  const handleOptimizeTeams = () => {
    const results = TeamOptimizer.suggestOptimalDistribution(teams, availableMembers);
    setOptimizationResults(results);
  };

  const applyOptimization = (teamId: number, suggestions: TeamMember[]) => {
    const updatedTeams = teams.map(team => {
      if (team.id === teamId) {
        return {
          ...team,
          members: [...team.members, ...suggestions]
        };
      }
      return team;
    });
    onTeamUpdate(updatedTeams);
    setOptimizationResults([]);
  };

  const allocatedMemberIds = new Set(teams.flatMap(team => team.members.map(m => m.id)));
  const unallocatedMembers = availableMembers.filter(member => 
    !allocatedMemberIds.has(member.id) && member.status === "Disponível"
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Organização de Equipes</h2>
        <Button onClick={handleOptimizeTeams} className="gap-2">
          <Sparkles className="h-4 w-4" />
          Otimizar Automaticamente
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Available Members Pool */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Membros Disponíveis ({unallocatedMembers.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 max-h-96 overflow-y-auto">
              {unallocatedMembers.map((member) => (
                <div
                  key={member.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, member)}
                  className="p-3 bg-muted/30 rounded-md cursor-move hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={member.avatar || ""} alt={member.name} />
                      <AvatarFallback className="text-xs">
                        {member.name.split(" ").map(n => n[0]).join("").substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{member.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{member.role}</p>
                      {member.primarySkill && (
                        <Badge variant="secondary" className="text-xs mt-1">
                          {member.primarySkill}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {unallocatedMembers.length === 0 && (
                <p className="text-center text-muted-foreground py-8">
                  Todos os membros estão alocados
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Teams */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {teams.map((team) => {
              const optimizationResult = optimizationResults.find(r => r.team.id === team.id);
              
              return (
                <Card
                  key={team.id}
                  className={`transition-all ${
                    dragOverTeam === team.id 
                      ? "border-primary border-2 bg-primary/5" 
                      : "border"
                  }`}
                  onDragOver={(e) => handleDragOver(e, team.id)}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, team.id)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{team.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{team.project}</p>
                      </div>
                      <Badge variant={team.status === "Ativo" ? "default" : "outline"}>
                        {team.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {team.members.length}/{team.maxMembers} membros
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-3">
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {team.members.map((member) => (
                        <div
                          key={member.id}
                          draggable
                          onDragStart={(e) => handleDragStart(e, member)}
                          className="p-2 bg-background rounded-md cursor-move hover:bg-muted/30 transition-colors group"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Avatar className="h-6 w-6">
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
                              onClick={() => handleRemoveFromTeam(team.id, member.id)}
                              className="opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0"
                            >
                              ×
                            </Button>
                          </div>
                        </div>
                      ))}
                      
                      {team.members.length === 0 && (
                        <div className="text-center py-6 text-muted-foreground border-2 border-dashed rounded-md">
                          <Users className="h-8 w-8 mx-auto mb-2 opacity-50" />
                          <p className="text-sm">Arraste membros aqui</p>
                        </div>
                      )}
                    </div>

                    {/* Optimization Suggestions */}
                    {optimizationResult && optimizationResult.suggestions.length > 0 && (
                      <div className="border-t pt-3 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-primary">
                            Sugestões IA
                          </span>
                          <span className="text-xs text-muted-foreground">
                            Score: {Math.round(optimizationResult.score * 100)}%
                          </span>
                        </div>
                        {optimizationResult.suggestions.slice(0, 2).map((suggestion: TeamMember) => (
                          <div key={suggestion.id} className="text-xs p-2 bg-primary/10 rounded flex items-center justify-between">
                            <span>{suggestion.name}</span>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => applyOptimization(team.id, [suggestion])}
                              className="h-6 px-2"
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                        {optimizationResult.reasoning.length > 0 && (
                          <p className="text-xs text-muted-foreground">
                            {optimizationResult.reasoning[0]}
                          </p>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DragDropTeamManager;
