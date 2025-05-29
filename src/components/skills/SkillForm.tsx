import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
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
  FormDescription,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { Skill } from "@/pages/SkillManagement";

const skillSchema = z.object({
  name: z.string().min(2, "Nome da competência deve ter pelo menos 2 caracteres"),
  category: z.string().min(1, "Categoria é obrigatória"),
  level: z.enum(["Básico", "Intermediário", "Avançado", "Expert"]),
  description: z.string().optional(),
  isCore: z.boolean().default(false),
});

type SkillFormValues = z.infer<typeof skillSchema>;

interface SkillFormProps {
  initialData?: Skill;
  onSubmit: (data: SkillFormValues) => void;
  onCancel: () => void;
}

const scrumCategories = [
  "Scrum Master - Soft Skills",
  "Scrum Master - Hard Skills", 
  "Product Owner - Soft Skills",
  "Product Owner - Hard Skills",
  "Desenvolvedores - Soft Skills",
  "Desenvolvedores - Hard Skills"
];

const SkillForm: React.FC<SkillFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
}) => {
  const { toast } = useToast();
  const isEditing = !!initialData;

  const form = useForm<SkillFormValues>({
    resolver: zodResolver(skillSchema),
    defaultValues: initialData || {
      name: "",
      category: "",
      level: "Básico",
      description: "",
      isCore: false,
    },
  });

  const handleSubmit = (data: SkillFormValues) => {
    onSubmit(data);
    
    toast({
      title: isEditing 
        ? "Competência atualizada com sucesso!" 
        : "Competência criada com sucesso!",
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome da Competência</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: Comunicação clara, Facilitação..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categoria</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a categoria" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {scrumCategories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
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
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
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
          
          <FormField
            control={form.control}
            name="isCore"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Competência Core</FormLabel>
                  <FormDescription>
                    Competências essenciais para metodologia ágil
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Descreva a competência e sua aplicação no Scrum..."
                  className="resize-none min-h-[80px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit">
            {isEditing ? "Atualizar" : "Criar"} Competência
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SkillForm;
