
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
import { useToast } from "@/components/ui/use-toast";
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

const SkillsSection: React.FC = () => {
  const { toast } = useToast();
  const [userSkills, setUserSkills] = useState<UserSkill[]>([
    { skill: "Comunicação clara", level: "Avançado", type: "soft" },
    { skill: "Gestão de backlog (user stories, épicos, refinamento)", level: "Intermediário", type: "hard" }
  ]);
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
    
    setUserSkills([...userSkills, newSkill]);
    form.reset();
    
    toast({
      title: "Competência adicionada",
      description: `${data.skill} foi adicionada ao seu perfil.`,
    });
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setUserSkills(userSkills.filter(skill => skill.skill !== skillToRemove));
    
    toast({
      title: "Competência removida",
      description: "A competência foi removida do seu perfil.",
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
    <Card>
      <CardHeader>
        <CardTitle>Competências Scrum</CardTitle>
        <CardDescription>
          Adicione suas competências relacionadas à metodologia Scrum
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Formulário para adicionar competências */}
        <div className="space-y-4">
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
                              <SelectValue placeholder="Selecione a competência" />
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
                              <SelectValue placeholder="Selecione o nível" />
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
        </div>

        {/* Lista de competências do usuário */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Suas Competências</h3>
          
          {/* Soft Skills */}
          <div>
            <h4 className="text-md font-medium mb-2 text-blue-600">Soft Skills</h4>
            <div className="flex flex-wrap gap-2">
              {userSkills
                .filter(skill => skill.type === "soft")
                .map((skill, index) => (
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
              {userSkills.filter(skill => skill.type === "soft").length === 0 && (
                <p className="text-sm text-muted-foreground">Nenhuma soft skill adicionada</p>
              )}
            </div>
          </div>

          {/* Hard Skills */}
          <div>
            <h4 className="text-md font-medium mb-2 text-green-600">Hard Skills</h4>
            <div className="flex flex-wrap gap-2">
              {userSkills
                .filter(skill => skill.type === "hard")
                .map((skill, index) => (
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
              {userSkills.filter(skill => skill.type === "hard").length === 0 && (
                <p className="text-sm text-muted-foreground">Nenhuma hard skill adicionada</p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SkillsSection;
