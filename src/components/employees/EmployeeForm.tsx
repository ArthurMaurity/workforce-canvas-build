
import React, { useEffect, useState } from "react";
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
import { Employee } from "./EmployeeCard";

const employeeSchema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("Email inválido"),
  role: z.string().min(2, "Cargo obrigatório"),
  department: z.string().min(2, "Departamento obrigatório"),
  location: z.string().min(2, "Localização obrigatória"),
  phone: z.string().min(8, "Telefone inválido"),
  skills: z.string(),
  primarySkill: z.string().optional(),
  bio: z.string().optional(),
  status: z.enum(["Alocado", "Disponível"]),
});

type EmployeeFormValues = z.infer<typeof employeeSchema>;

interface EmployeeFormProps {
  initialData?: Employee;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
}) => {
  const { toast } = useToast();
  const isEditing = !!initialData;
  const [availableSkills, setAvailableSkills] = useState<string[]>([]);

  const form = useForm<EmployeeFormValues>({
    resolver: zodResolver(employeeSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          skills: initialData.skills.join(", "),
          primarySkill: initialData.primarySkill || "",
        }
      : {
          name: "",
          email: "",
          role: "",
          department: "",
          location: "",
          phone: "",
          skills: "",
          primarySkill: "",
          bio: "",
          status: "Disponível",
        },
  });

  // Extract skills from the skills input to populate primarySkill dropdown
  useEffect(() => {
    const skillsString = form.watch("skills");
    if (skillsString) {
      const skillsList = skillsString.split(",").map(skill => skill.trim()).filter(skill => skill !== "");
      setAvailableSkills(skillsList);
    } else {
      setAvailableSkills([]);
    }
  }, [form.watch("skills")]);

  const handleSubmit = (data: EmployeeFormValues) => {
    // Convert skills string to array
    const formattedData = {
      ...data,
      skills: data.skills.split(",").map((skill) => skill.trim()).filter(skill => skill !== ""),
      // Make sure primarySkill is in the skills array
      primarySkill: data.primarySkill && data.primarySkill.trim() !== "" ? data.primarySkill : undefined
    };
    
    onSubmit(formattedData);
    
    toast({
      title: isEditing 
        ? "Colaborador atualizado com sucesso!" 
        : "Colaborador cadastrado com sucesso!",
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
                <FormLabel>Nome completo</FormLabel>
                <FormControl>
                  <Input placeholder="Nome do colaborador" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="email@empresa.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cargo</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o cargo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Scrum Master">Scrum Master</SelectItem>
                    <SelectItem value="PO Interno">PO Interno</SelectItem>
                    <SelectItem value="PO Externo">PO Externo</SelectItem>
                    <SelectItem value="Desenvolvedor Front-end">Desenvolvedor Front-end</SelectItem>
                    <SelectItem value="Desenvolvedor Back-end">Desenvolvedor Back-end</SelectItem>
                    <SelectItem value="Designer UX/UI">Designer UX/UI</SelectItem>
                    <SelectItem value="Testador (QA)">Testador (QA)</SelectItem>
                    <SelectItem value="Analista de Dados">Analista de Dados</SelectItem>
                    <SelectItem value="Outro">Outro</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Selecione o cargo principal do colaborador no time ágil
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="department"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Departamento</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o departamento" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Desenvolvimento">Desenvolvimento</SelectItem>
                    <SelectItem value="Design">Design</SelectItem>
                    <SelectItem value="Produto">Produto</SelectItem>
                    <SelectItem value="QA & Testes">QA & Testes</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Vendas">Vendas</SelectItem>
                    <SelectItem value="Cliente">Cliente</SelectItem>
                    <SelectItem value="Administrativo">Administrativo</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Localização</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: São Paulo, SP" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefone</FormLabel>
                <FormControl>
                  <Input placeholder="(00) 00000-0000" {...field} />
                </FormControl>
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
                    <SelectItem value="Disponível">Disponível</SelectItem>
                    <SelectItem value="Alocado">Alocado</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="skills"
            render={({ field }) => (
              <FormItem className="col-span-1 md:col-span-2">
                <FormLabel>Habilidades</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Ex: JavaScript, React, Node.js (separado por vírgulas)" 
                    {...field} 
                  />
                </FormControl>
                <FormDescription>
                  Liste todas as habilidades técnicas separadas por vírgulas
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="primarySkill"
            render={({ field }) => (
              <FormItem className="col-span-1 md:col-span-2">
                <FormLabel>Habilidade Principal</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value || ""}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a habilidade principal" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="">Nenhuma</SelectItem>
                    {availableSkills.map((skill) => (
                      <SelectItem key={skill} value={skill}>
                        {skill}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Selecione a competência principal desta pessoa colaboradora
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem className="col-span-1 md:col-span-2">
                <FormLabel>Biografia</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Informações adicionais sobre o colaborador..."
                    className="resize-none min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit">
            {isEditing ? "Atualizar" : "Cadastrar"} Colaborador
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EmployeeForm;
