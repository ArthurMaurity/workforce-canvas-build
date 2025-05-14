
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";

const resetPasswordSchema = z.object({
  email: z
    .string()
    .email("Digite um email válido")
    .refine((email) => {
      // Email corporativo geralmente termina com @empresa.com ou similar
      return email.includes("@") && !email.endsWith("@gmail.com") && 
             !email.endsWith("@hotmail.com") && !email.endsWith("@outlook.com");
    }, "Por favor, use seu email corporativo"),
});

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

const ResetPasswordForm: React.FC = () => {
  const { toast } = useToast();
  
  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(data: ResetPasswordFormValues) {
    // Simulando uma chamada de API
    console.log("Reset password request:", data);
    
    // Exemplo de tratamento de recuperação de senha - em produção, isso seria substituído pela integração real com a API
    setTimeout(() => {
      toast({
        title: "Email enviado!",
        description: "Verifique sua caixa de entrada para instruções de recuperação de senha.",
      });
      
      // Em uma implementação real, redirecionaria para o login ou uma página de confirmação
      window.location.href = "/login";
    }, 1000);
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Recuperar senha</CardTitle>
        <CardDescription>
          Digite seu email corporativo para receber as instruções de recuperação de senha
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email corporativo</FormLabel>
                  <FormControl>
                    <Input 
                      type="email" 
                      placeholder="seu.nome@empresa.com" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Enviar instruções
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <div className="text-sm text-center">
          <Link to="/login" className="text-primary hover:underline">
            Voltar ao login
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ResetPasswordForm;
