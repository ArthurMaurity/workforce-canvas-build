
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Wand2, Users, Target } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface UserProfile {
  id: string;
  name: string;
  skills: {
    skill: string;
    level: "Básico" | "Intermediário" | "Avançado" | "Expert";
    type: "soft" | "hard";
    role: "Scrum Master" | "Product Owner" | "Desenvolvedor";
  }[];
}

interface GeneratedTeam {
  id: string;
  name: string;
  members: UserProfile[];
  scrumMaster?: UserProfile;
  productOwner?: UserProfile;
  developers: UserProfile[];
  skillCoverage: number;
}

// Mock data para demonstração
const mockUsers: UserProfile[] = [
  {
    id: "1",
    name: "João Silva",
    skills: [
      { skill: "Comunicação clara", level: "Expert", type: "soft", role: "Scrum Master" },
      { skill: "Facilitação", level: "Avançado", type: "soft", role: "Scrum Master" },
      { skill: "Conhecimento avançado do framework Scrum", level: "Expert", type: "hard", role: "Scrum Master" }
    ]
  },
  {
    id: "2", 
    name: "Maria Santos",
    skills: [
      { skill: "Visão estratégica do negócio", level: "Expert", type: "soft", role: "Product Owner" },
      { skill: "Priorização", level: "Avançado", type: "soft", role: "Product Owner" },
      { skill: "Gestão de backlog", level: "Expert", type: "hard", role: "Product Owner" }
    ]
  },
  {
    id: "3",
    name: "Carlos Oliveira", 
    skills: [
      { skill: "Stack técnico relevante", level: "Expert", type: "hard", role: "Desenvolvedor" },
      { skill: "Colaboração", level: "Avançado", type: "soft", role: "Desenvolvedor" },
      { skill: "Versionamento de código", level: "Avançado", type: "hard", role: "Desenvolvedor" }
    ]
  },
  {
    id: "4",
    name: "Ana Costa",
    skills: [
      { skill: "Auto-organização", level: "Avançado", type: "soft", role: "Desenvolvedor" },
      { skill: "Testes automatizados", level: "Intermediário", type: "hard", role: "Desenvolvedor" },
      { skill: "Adaptabilidade", level: "Expert", type: "soft", role: "Desenvolvedor" }
    ]
  },
  {
    id: "5",
    name: "Pedro Lima",
    skills: [
      { skill: "Multidisciplinaridade", level: "Avançado", type: "soft", role: "Desenvolvedor" },
      { skill: "Stack técnico relevante", level: "Intermediário", type: "hard", role: "Desenvolvedor" },
      { skill: "Melhoria contínua", level: "Avançado", type: "soft", role: "Desenvolvedor" }
    ]
  }
];

const AutoTeamGenerator: React.FC = () => {
  const [teamSize, setTeamSize] = useState<number>(5);
  const [numberOfTeams, setNumberOfTeams] = useState<number>(1);
  const [generatedTeams, setGeneratedTeams] = useState<GeneratedTeam[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const calculateSkillLevel = (level: string): number => {
    switch (level) {
      case "Expert": return 4;
      case "Avançado": return 3;
      case "Intermediário": return 2;
      case "Básico": return 1;
      default: return 0;
    }
  };

  const generateTeams = () => {
    setIsGenerating(true);
    
    // Algoritmo simplificado de geração de equipes
    const teams: GeneratedTeam[] = [];
    const availableUsers = [...mockUsers];
    
    for (let i = 0; i < numberOfTeams; i++) {
      if (availableUsers.length === 0) break;
      
      const team: GeneratedTeam = {
        id: `team-${i + 1}`,
        name: `Equipe ${i + 1}`,
        members: [],
        developers: [],
        skillCoverage: 0
      };
      
      // Tentar encontrar Scrum Master
      const scrumMasters = availableUsers.filter(user => 
        user.skills.some(skill => skill.role === "Scrum Master")
      );
      if (scrumMasters.length > 0) {
        const bestSM = scrumMasters.reduce((best, current) => {
          const bestScore = best.skills
            .filter(s => s.role === "Scrum Master")
            .reduce((sum, s) => sum + calculateSkillLevel(s.level), 0);
          const currentScore = current.skills
            .filter(s => s.role === "Scrum Master")
            .reduce((sum, s) => sum + calculateSkillLevel(s.level), 0);
          return currentScore > bestScore ? current : best;
        });
        team.scrumMaster = bestSM;
        team.members.push(bestSM);
        availableUsers.splice(availableUsers.indexOf(bestSM), 1);
      }
      
      // Tentar encontrar Product Owner
      const productOwners = availableUsers.filter(user =>
        user.skills.some(skill => skill.role === "Product Owner")
      );
      if (productOwners.length > 0) {
        const bestPO = productOwners.reduce((best, current) => {
          const bestScore = best.skills
            .filter(s => s.role === "Product Owner")
            .reduce((sum, s) => sum + calculateSkillLevel(s.level), 0);
          const currentScore = current.skills
            .filter(s => s.role === "Product Owner")
            .reduce((sum, s) => sum + calculateSkillLevel(s.level), 0);
          return currentScore > bestScore ? current : best;
        });
        team.productOwner = bestPO;
        team.members.push(bestPO);
        availableUsers.splice(availableUsers.indexOf(bestPO), 1);
      }
      
      // Adicionar desenvolvedores
      const remainingSlots = teamSize - team.members.length;
      const developers = availableUsers
        .filter(user => user.skills.some(skill => skill.role === "Desenvolvedor"))
        .slice(0, remainingSlots);
      
      developers.forEach(dev => {
        team.developers.push(dev);
        team.members.push(dev);
        availableUsers.splice(availableUsers.indexOf(dev), 1);
      });
      
      // Calcular cobertura de skills
      const totalSkills = team.members.reduce((sum, member) => sum + member.skills.length, 0);
      team.skillCoverage = Math.min(100, (totalSkills / (teamSize * 3)) * 100);
      
      teams.push(team);
    }
    
    setGeneratedTeams(teams);
    setIsGenerating(false);
    
    toast({
      title: "Equipes geradas com sucesso!",
      description: `${teams.length} equipe(s) foram criadas automaticamente.`,
    });
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Básico": return "secondary";
      case "Intermediário": return "outline";
      case "Avançado": return "default";
      case "Expert": return "destructive";
      default: return "outline";
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wand2 className="h-5 w-5" />
            Gerador Automático de Equipes
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="teamSize">Tamanho da Equipe</Label>
              <Input
                id="teamSize"
                type="number"
                min="3"
                max="10"
                value={teamSize}
                onChange={(e) => setTeamSize(Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="numberOfTeams">Número de Equipes</Label>
              <Input
                id="numberOfTeams"
                type="number"
                min="1"
                max="5"
                value={numberOfTeams}
                onChange={(e) => setNumberOfTeams(Number(e.target.value))}
              />
            </div>
          </div>
          
          <Button 
            onClick={generateTeams} 
            disabled={isGenerating}
            className="w-full"
          >
            <Wand2 className="mr-2 h-4 w-4" />
            {isGenerating ? "Gerando..." : "Gerar Equipes Automaticamente"}
          </Button>
        </CardContent>
      </Card>

      {generatedTeams.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Equipes Geradas</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {generatedTeams.map((team) => (
              <Card key={team.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      {team.name}
                    </CardTitle>
                    <div className="flex items-center gap-1">
                      <Target className="h-4 w-4" />
                      <span className="text-sm">{Math.round(team.skillCoverage)}%</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Membros:</h4>
                    {team.scrumMaster && (
                      <div className="flex items-center gap-2">
                        <Badge variant="default">SM</Badge>
                        <span className="text-sm">{team.scrumMaster.name}</span>
                      </div>
                    )}
                    {team.productOwner && (
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">PO</Badge>
                        <span className="text-sm">{team.productOwner.name}</span>
                      </div>
                    )}
                    {team.developers.map((dev) => (
                      <div key={dev.id} className="flex items-center gap-2">
                        <Badge variant="outline">DEV</Badge>
                        <span className="text-sm">{dev.name}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Principais Competências:</h4>
                    <div className="flex flex-wrap gap-1">
                      {team.members
                        .flatMap(member => member.skills)
                        .slice(0, 6)
                        .map((skill, index) => (
                          <Badge key={index} variant={getLevelColor(skill.level)} className="text-xs">
                            {skill.skill}
                          </Badge>
                        ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AutoTeamGenerator;
