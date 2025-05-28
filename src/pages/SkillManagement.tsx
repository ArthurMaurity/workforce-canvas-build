
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Edit, Trash2, Star, Zap } from "lucide-react";
import SkillForm from "@/components/skills/SkillForm";

export interface Skill {
  id: number;
  name: string;
  category: string;
  level: "Básico" | "Intermediário" | "Avançado" | "Expert";
  description?: string;
  isCore?: boolean;
}

const mockSkills: Skill[] = [
  {
    id: 1,
    name: "Scrum Master",
    category: "Scrum",
    level: "Expert",
    description: "Facilitar eventos Scrum, remover impedimentos e coaching da equipe",
    isCore: true
  },
  {
    id: 2,
    name: "Product Owner",
    category: "Scrum",
    level: "Avançado",
    description: "Gerenciar backlog do produto e definir prioridades de negócio",
    isCore: true
  },
  {
    id: 3,
    name: "Sprint Planning",
    category: "Eventos Scrum",
    level: "Intermediário",
    description: "Planejar e estimar trabalho para a Sprint"
  },
  {
    id: 4,
    name: "Daily Scrum",
    category: "Eventos Scrum",
    level: "Básico",
    description: "Facilitar e participar de reuniões diárias"
  },
  {
    id: 5,
    name: "Sprint Review",
    category: "Eventos Scrum",
    level: "Intermediário",
    description: "Demonstrar incremento e coletar feedback"
  },
  {
    id: 6,
    name: "Sprint Retrospective",
    category: "Eventos Scrum",
    level: "Avançado",
    description: "Facilitar melhorias contínuas da equipe"
  },
  {
    id: 7,
    name: "Product Backlog Management",
    category: "Artefatos Scrum",
    level: "Avançado",
    description: "Criar, priorizar e refinar itens do backlog"
  },
  {
    id: 8,
    name: "User Stories",
    category: "Artefatos Scrum",
    level: "Intermediário",
    description: "Escrever e decompor histórias de usuário"
  },
  {
    id: 9,
    name: "Definition of Done",
    category: "Artefatos Scrum",
    level: "Básico",
    description: "Definir e aplicar critérios de pronto"
  },
  {
    id: 10,
    name: "Velocity Tracking",
    category: "Métricas Ágeis",
    level: "Intermediário",
    description: "Medir e acompanhar velocidade da equipe"
  },
  {
    id: 11,
    name: "Burndown Charts",
    category: "Métricas Ágeis",
    level: "Básico",
    description: "Criar e interpretar gráficos de burndown"
  },
  {
    id: 12,
    name: "Stakeholder Management",
    category: "Soft Skills Ágeis",
    level: "Avançado",
    description: "Gerenciar expectativas e comunicação com stakeholders"
  }
];

const SkillManagement: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>(mockSkills);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);

  const categories = [...new Set(skills.map(skill => skill.category))];

  const filteredSkills = skills.filter(skill => {
    const matchesSearch = skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         skill.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "" || skill.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCreateSkill = (data: Omit<Skill, 'id'>) => {
    const newSkill: Skill = {
      id: skills.length + 1,
      ...data
    };
    setSkills([...skills, newSkill]);
    setIsFormOpen(false);
  };

  const handleEditSkill = (data: Omit<Skill, 'id'>) => {
    if (editingSkill) {
      setSkills(skills.map(skill => 
        skill.id === editingSkill.id ? { ...skill, ...data } : skill
      ));
      setEditingSkill(null);
      setIsFormOpen(false);
    }
  };

  const handleDeleteSkill = (id: number) => {
    setSkills(skills.filter(skill => skill.id !== id));
  };

  const openEditForm = (skill: Skill) => {
    setEditingSkill(skill);
    setIsFormOpen(true);
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
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Competências Scrum</h1>
          <p className="text-muted-foreground">
            Gerencie competências relacionadas à metodologia Scrum e práticas ágeis.
          </p>
        </div>
        
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingSkill(null)}>
              <Plus className="mr-2 h-4 w-4" />
              Nova Competência
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingSkill ? "Editar Competência" : "Nova Competência"}
              </DialogTitle>
            </DialogHeader>
            <SkillForm
              initialData={editingSkill || undefined}
              onSubmit={editingSkill ? handleEditSkill : handleCreateSkill}
              onCancel={() => {
                setIsFormOpen(false);
                setEditingSkill(null);
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex items-center space-x-2 flex-1">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar competências Scrum..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button 
            variant={filterCategory === "" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterCategory("")}
          >
            Todas
          </Button>
          {categories.map(category => (
            <Button
              key={category}
              variant={filterCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSkills.map((skill) => (
          <Card key={skill.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <CardTitle className="text-lg">{skill.name}</CardTitle>
                  {skill.isCore && (
                    <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                  )}
                </div>
                <div className="flex space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openEditForm(skill)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteSkill(skill.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <Badge variant="outline">{skill.category}</Badge>
                <Badge variant={getLevelColor(skill.level)}>
                  {skill.level}
                </Badge>
              </div>
              
              {skill.description && (
                <p className="text-sm text-muted-foreground">{skill.description}</p>
              )}
              
              {skill.isCore && (
                <div className="flex items-center gap-1 text-amber-600">
                  <Zap className="h-3 w-3" />
                  <span className="text-xs font-medium">Competência Core</span>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SkillManagement;
