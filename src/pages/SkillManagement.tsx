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
  // Scrum Master - Soft Skills
  {
    id: 1,
    name: "Comunicação clara",
    category: "Scrum Master - Soft Skills",
    level: "Expert",
    description: "Para facilitar entendimento do framework pela equipe",
    isCore: true
  },
  {
    id: 2,
    name: "Facilitação",
    category: "Scrum Master - Soft Skills",
    level: "Avançado",
    description: "Garantir que eventos Scrum ocorram de forma produtiva e dentro do timebox"
  },
  {
    id: 3,
    name: "Remoção de impedimentos",
    category: "Scrum Master - Soft Skills",
    level: "Avançado",
    description: "Identificar e resolver obstáculos que afetam a equipe"
  },
  {
    id: 4,
    name: "Autoconfiança",
    category: "Scrum Master - Soft Skills",
    level: "Intermediário",
    description: "Liderar sem autoridade hierárquica, inspirando colaboração"
  },
  {
    id: 5,
    name: "Gestão de tempo",
    category: "Scrum Master - Soft Skills",
    level: "Avançado",
    description: "Aplicar timeboxing (fixo ou flexível) em cerimônias"
  },
  {
    id: 6,
    name: "Promoção da auto-organização",
    category: "Scrum Master - Soft Skills",
    level: "Expert",
    description: "Incentivar a autonomia da equipe"
  },
  {
    id: 7,
    name: "Resiliência",
    category: "Scrum Master - Soft Skills",
    level: "Intermediário",
    description: "Lidar com mudanças e feedbacks constantes"
  },
  {
    id: 8,
    name: "Pensamento Ágil",
    category: "Scrum Master - Soft Skills",
    level: "Avançado",
    description: "Foco em entregas incrementais e aprendizado"
  },
  {
    id: 9,
    name: "Negociação",
    category: "Scrum Master - Soft Skills",
    level: "Intermediário",
    description: "Alinhar expectativas entre equipe e stakeholders"
  },
  // Scrum Master - Hard Skills
  {
    id: 10,
    name: "Conhecimento avançado do framework Scrum",
    category: "Scrum Master - Hard Skills",
    level: "Expert",
    description: "Eventos, artefatos, papéis",
    isCore: true
  },
  {
    id: 11,
    name: "Domínio de ferramentas ágeis",
    category: "Scrum Master - Hard Skills",
    level: "Avançado",
    description: "Jira, Trello, Azure DevOps"
  },
  {
    id: 12,
    name: "Métricas ágeis",
    category: "Scrum Master - Hard Skills",
    level: "Intermediário",
    description: "Velocidade da equipe, burndown charts"
  },
  // Product Owner - Soft Skills
  {
    id: 13,
    name: "Visão estratégica do negócio",
    category: "Product Owner - Soft Skills",
    level: "Expert",
    description: "Alinhar o produto às necessidades do cliente",
    isCore: true
  },
  {
    id: 14,
    name: "Priorização",
    category: "Product Owner - Soft Skills",
    level: "Avançado",
    description: "Ordenar o Product Backlog com base em valor e metas"
  },
  {
    id: 15,
    name: "Comunicação eficaz",
    category: "Product Owner - Soft Skills",
    level: "Avançado",
    description: "Atuar como ponte entre stakeholders e equipe"
  },
  {
    id: 16,
    name: "Autonomia",
    category: "Product Owner - Soft Skills",
    level: "Intermediário",
    description: "Tomar decisões rápidas sobre escopo e direção do produto"
  },
  {
    id: 17,
    name: "Disponibilidade",
    category: "Product Owner - Soft Skills",
    level: "Básico",
    description: "Estar acessível para esclarecer dúvidas da equipe"
  },
  {
    id: 18,
    name: "Análise de métricas",
    category: "Product Owner - Soft Skills",
    level: "Avançado",
    description: "Avaliar resultados e maximizar valor das entregas"
  },
  // Product Owner - Hard Skills
  {
    id: 19,
    name: "Gestão de backlog",
    category: "Product Owner - Hard Skills",
    level: "Expert",
    description: "User stories, épicos, refinamento",
    isCore: true
  },
  {
    id: 20,
    name: "Técnicas de priorização",
    category: "Product Owner - Hard Skills",
    level: "Avançado",
    description: "MoSCoW, Value vs. Effort"
  },
  {
    id: 21,
    name: "Conhecimento em UX/UI",
    category: "Product Owner - Hard Skills",
    level: "Intermediário",
    description: "Para alinhar expectativas do cliente"
  },
  // Desenvolvedores - Soft Skills
  {
    id: 22,
    name: "Multidisciplinaridade",
    category: "Desenvolvedores - Soft Skills",
    level: "Avançado",
    description: "Habilidades técnicas diversas para entregar incrementos"
  },
  {
    id: 23,
    name: "Auto-organização",
    category: "Desenvolvedores - Soft Skills",
    level: "Intermediário",
    description: "Planejar e executar tarefas sem microgerenciamento"
  },
  {
    id: 24,
    name: "Colaboração",
    category: "Desenvolvedores - Soft Skills",
    level: "Avançado",
    description: "Trabalhar em conjunto para atingir a meta da Sprint"
  },
  {
    id: 25,
    name: "Comprometimento",
    category: "Desenvolvedores - Soft Skills",
    level: "Intermediário",
    description: "Cumprir prazos e definições de pronto (DoD)"
  },
  {
    id: 26,
    name: "Melhoria contínua",
    category: "Desenvolvedores - Soft Skills",
    level: "Intermediário",
    description: "Aplicar feedbacks da Retrospective"
  },
  {
    id: 27,
    name: "Adaptabilidade",
    category: "Desenvolvedores - Soft Skills",
    level: "Avançado",
    description: "Ajustar-se a mudanças no Backlog ou requisitos"
  },
  // Desenvolvedores - Hard Skills
  {
    id: 28,
    name: "Stack técnico relevante",
    category: "Desenvolvedores - Hard Skills",
    level: "Expert",
    description: "Java, Python, React, SQL",
    isCore: true
  },
  {
    id: 29,
    name: "Versionamento de código",
    category: "Desenvolvedores - Hard Skills",
    level: "Avançado",
    description: "Git, GitFlow"
  },
  {
    id: 30,
    name: "Testes automatizados",
    category: "Desenvolvedores - Hard Skills",
    level: "Intermediário",
    description: "TDD, BDD, ferramentas como Selenium/JUnit"
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
