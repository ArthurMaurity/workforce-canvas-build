
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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

const teamSchema = z.object({
  name: z.string().min(3, "Nome da equipe deve ter pelo menos 3 caracteres"),
  project: z.string().min(2, "Nome do projeto obrigatório"),
  status: z.enum(["Ativo", "Inativo", "Planejado"]),
  maxMembers: z.number().min(1).max(9),
  description: z.string().optional(),
});

type TeamFormValues = z.infer<typeof teamSchema>;

interface TeamFormProps {
  initialData?: any;
  onSubmit: (data: TeamFormValues) => void;
  onCancel: () => void;
}

const TeamForm: React.FC<TeamFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
}) => {
  const { toast } = useToast();
  const isEditing = !!initialData;

  const form = useForm<TeamFormValues>({
    resolver: zodResolver(teamSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          maxMembers: initialData.maxMembers || 9,
        }
      : {
          name: "",
          project: "",
          status: "Planejado",
          maxMembers: 9,
          description: "",
        },
  });

  const handleSubmit = (data: TeamFormValues) => {
    onSubmit(data);
    
    toast({
      title: isEditing 
        ? "Equipe atualizada com sucesso!" 
        : "Equipe criada com sucesso!",
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
                <FormLabel>Nome da Equipe</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: Team Alpha" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="project"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Projeto</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o projeto" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Portal Cliente">Portal Cliente</SelectItem>
                    <SelectItem value="App Mobile">App Mobile</SelectItem>
                    <SelectItem value="Sistema Interno">Sistema Interno</SelectItem>
                    <SelectItem value="Website Institucional">Website Institucional</SelectItem>
                    <SelectItem value="API Gateway">API Gateway</SelectItem>
                    <SelectItem value="Dashboard Analytics">Dashboard Analytics</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Planejado">Planejado</SelectItem>
                    <SelectItem value="Ativo">Ativo</SelectItem>
                    <SelectItem value="Inativo">Inativo</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="maxMembers"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Máximo de Membros</FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(parseInt(value))}
                  defaultValue={field.value?.toString()}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o máximo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} {num === 1 ? "membro" : "membros"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Máximo de 9 membros por equipe ágil
                </FormDescription>
                <FormMessage />
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
                  placeholder="Descreva os objetivos e escopo da equipe..."
                  className="resize-none min-h-[100px]"
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
            {isEditing ? "Atualizar" : "Criar"} Equipe
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default TeamForm;
