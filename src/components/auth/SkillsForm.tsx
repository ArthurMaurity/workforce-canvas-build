
import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Plus, X } from "lucide-react";

const skillSchema = z.object({
  skill: z.string().min(1, "Selecione uma competência"),
  level: z.enum(["Básico", "Intermediário", "Avançado", "Expert"]),
});

type SkillFormValues = z.infer<typeof skillSchema>;

interface UserSkill {
  skill: string;
  level: "Básico" | "Intermediário" | "Avançado" | "Expert";
  type: "soft" | "hard";
}

const scrumSkills = {
  soft: {
    "Scrum Master": [
      "Comunicação clara",
      "Facilitação",
      "Remoção de impedimentos",
      "Autoconfiança",
      "Gestão de tempo",
      "Promoção da auto-organização",
      "Resiliência",
      "Pensamento Ágil",
      "Negociação"
    ],
    "Product Owner": [
      "Visão estratégica do negócio",
      "Priorização",
      "Comunicação eficaz",
      "Autonomia",
      "Disponibilidade",
      "Análise de métricas",
      "Resiliência",
      "Pensamento Ágil",
      "Negociação"
    ],
    "Desenvolvedor": [
      "Multidisciplinaridade",
      "Auto-organização",
      "Colaboração",
      "Comprometimento",
      "Melhoria contínua",
      "Adaptabilidade",
      "Resiliência",
      "Pensamento Ágil"
    ]
  },
  hard: {
    "Scrum Master": [
      "Conhecimento avançado do framework Scrum",
      "Domínio de ferramentas ágeis (Jira, Trello, Azure DevOps)",
      "Métricas ágeis (velocidade da equipe, burndown charts)"
    ],
    "Product Owner": [
      "Gestão de backlog (user stories, épicos, refinamento)",
      "Técnicas de priorização (MoSCoW, Value vs. Effort)",
      "Conhecimento em UX/UI"
    ],
    "Desenvolvedor": [
      "Stack técnico relevante (Java, Python, React, SQL)",
      "Versionamento de código (Git, GitFlow)",
      "Testes automatizados (TDD, BDD, Selenium/JUnit)"
    ]
  }
};

interface SkillsFormProps {
  onSkillsChange: (skills: UserSkill[]) => void;
}

const SkillsForm: React.FC<SkillsFormProps> = ({ onSkillsChange }) => {
  const [userSkills, setUserSkills] = useState<UserSkill[]>([]);
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [selectedType, setSelectedType] = useState<"soft" | "hard">("soft");

  const form = useForm<SkillFormValues>({
    resolver: zodResolver(skillSchema),
    defaultValues: {
      skill: "",
      level: "Básico",
    },
  });

  const availableSkills = selectedRole && selectedType 
    ? scrumSkills[selectedType][selectedRole as keyof typeof scrumSkills.soft] || []
    : [];

  const filteredSkills = availableSkills.filter(skill => 
    !userSkills.some(userSkill => userSkill.skill === skill)
  );

  const handleAddSkill = (data: SkillFormValues) => {
    const newSkill: UserSkill = {
      skill: data.skill,
      level: data.level,
      type: selectedType
    };
    
    const updatedSkills = [...userSkills, newSkill];
    setUserSkills(updatedSkills);
    onSkillsChange(updatedSkills);
    form.reset();
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    const updatedSkills = userSkills.filter(skill => skill.skill !== skillToRemove);
    setUserSkills(updatedSkills);
    onSkillsChange(updatedSkills);
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
    <Card>
      <CardHeader>
        <CardTitle>Competências Scrum</CardTitle>
        <CardDescription>
          Adicione suas competências relacionadas à metodologia Scrum
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Papel Scrum</label>
            <Select onValueChange={setSelectedRole} value={selectedRole}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o papel" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Scrum Master">Scrum Master</SelectItem>
                <SelectItem value="Product Owner">Product Owner</SelectItem>
                <SelectItem value="Desenvolvedor">Desenvolvedor</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Tipo de Competência</label>
            <Select onValueChange={(value: "soft" | "hard") => setSelectedType(value)} value={selectedType}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="soft">Soft Skills</SelectItem>
                <SelectItem value="hard">Hard Skills</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {selectedRole && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleAddSkill)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="skill"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Competência</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {filteredSkills.map((skill) => (
                            <SelectItem key={skill} value={skill}>
                              {skill}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="level"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nível</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Nível" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Básico">Básico</SelectItem>
                          <SelectItem value="Intermediário">Intermediário</SelectItem>
                          <SelectItem value="Avançado">Avançado</SelectItem>
                          <SelectItem value="Expert">Expert</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex items-end">
                  <Button type="submit" className="w-full" disabled={!form.watch("skill")}>
                    <Plus className="mr-2 h-4 w-4" />
                    Adicionar
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        )}

        <div className="space-y-3">
          <h4 className="text-sm font-medium">Competências Adicionadas ({userSkills.length})</h4>
          <div className="flex flex-wrap gap-2">
            {userSkills.map((skill, index) => (
              <Badge
                key={index}
                variant={getLevelColor(skill.level)}
                className="flex items-center gap-1 px-3 py-1"
              >
                {skill.skill} ({skill.level})
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 hover:bg-transparent"
                  onClick={() => handleRemoveSkill(skill.skill)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
            {userSkills.length === 0 && (
              <p className="text-sm text-muted-foreground">Nenhuma competência adicionada</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SkillsForm;
