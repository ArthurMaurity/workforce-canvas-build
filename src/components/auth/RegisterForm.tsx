
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
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { GoogleLogo } from "@/components/ui/icons";

const registerSchema = z.object({
  name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  email: z
    .string()
    .email("Digite um email válido")
    .refine((email) => {
      // Email corporativo geralmente termina com @empresa.com ou similar
      return email.includes("@") && !email.endsWith("@gmail.com") && 
             !email.endsWith("@hotmail.com") && !email.endsWith("@outlook.com");
    }, "Por favor, use seu email corporativo"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  confirmPassword: z.string(),
  captcha: z.boolean().refine(val => val === true, {
    message: "Por favor, confirme que você não é um robô"
  }),
  terms: z.boolean().refine(val => val === true, {
    message: "Você precisa aceitar os termos de uso"
  })
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

const RegisterForm: React.FC = () => {
  const { toast } = useToast();
  
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      captcha: false,
      terms: false
    },
  });

  function onSubmit(data: RegisterFormValues) {
    // Simulando uma chamada de API
    console.log("Registration data:", data);
    
    // Exemplo de tratamento de registro - em produção, isso seria substituído pela integração real com a API
    setTimeout(() => {
      toast({
        title: "Conta criada com sucesso!",
        description: "Você já pode fazer login no sistema.",
      });
      
      // Em uma implementação real, redirecionaria para o login após registro bem-sucedido
      window.location.href = "/login";
    }, 1000);
  }

  const handleGoogleSignup = () => {
    toast({
      title: "Cadastro com Google iniciado",
      description: "Redirecionando para autenticação do Google...",
    });
    
    // Em uma implementação real, iniciaria o fluxo de autenticação OAuth com Google
    console.log("Google signup initiated");
    
    // Simulando redirecionamento para o dashboard após cadastro com Google
    setTimeout(() => {
      window.location.href = "/dashboard";
    }, 1500);
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Criar uma conta no Aginerator</CardTitle>
        <CardDescription>
          Cadastre-se para encontrar o time ágil ideal para seus projetos
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <Button 
            variant="outline" 
            type="button" 
            className="w-full"
            onClick={handleGoogleSignup}
          >
            <GoogleLogo className="mr-2 h-4 w-4" />
            Cadastrar com Google
          </Button>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Ou cadastre-se com email
              </span>
            </div>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome completo</FormLabel>
                    <FormControl>
                      <Input placeholder="Seu nome completo" {...field} />
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
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input 
                        type="password"
                        placeholder="******" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmar senha</FormLabel>
                    <FormControl>
                      <Input 
                        type="password"
                        placeholder="******" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="captcha"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        Não sou um robô
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="terms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        Aceito os <Link to="#" className="text-primary hover:underline">termos de uso</Link> e <Link to="#" className="text-primary hover:underline">política de privacidade</Link>
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full">
                Cadastrar
              </Button>
            </form>
          </Form>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <div className="text-sm text-center">
          Já tem uma conta?{" "}
          <Link to="/login" className="text-primary hover:underline">
            Entrar
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default RegisterForm;
