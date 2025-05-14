
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
  FormDescription,
} from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { GoogleLogo } from "@/components/ui/icons";

const loginSchema = z.object({
  email: z
    .string()
    .email("Digite um email válido")
    .refine((email) => {
      // Email corporativo geralmente termina com @empresa.com ou similar
      // Essa validação pode ser ajustada conforme as regras específicas da empresa
      return email.includes("@") && !email.endsWith("@gmail.com") && 
             !email.endsWith("@hotmail.com") && !email.endsWith("@outlook.com");
    }, "Por favor, use seu email corporativo"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  captcha: z.boolean().refine(val => val === true, {
    message: "Por favor, confirme que você não é um robô"
  })
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginForm: React.FC = () => {
  const { toast } = useToast();
  
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      captcha: false
    },
  });

  function onSubmit(data: LoginFormValues) {
    // Simulando uma chamada de API
    console.log("Login data:", data);
    
    // Exemplo de tratamento de login - em produção, isso seria substituído pela integração real com a API
    setTimeout(() => {
      toast({
        title: "Login efetuado com sucesso!",
        description: "Redirecionando para o dashboard...",
      });
      
      // Em uma implementação real, redirecionaria para o dashboard após login bem-sucedido
      window.location.href = "/dashboard";
    }, 1000);
  }

  const handleGoogleLogin = () => {
    toast({
      title: "Login com Google iniciado",
      description: "Redirecionando para autenticação do Google...",
    });
    
    // Em uma implementação real, iniciaria o fluxo de autenticação OAuth com Google
    console.log("Google login initiated");
    
    // Simulando redirecionamento para o dashboard após login com Google
    setTimeout(() => {
      window.location.href = "/dashboard";
    }, 1500);
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Entrar no Aginerator</CardTitle>
        <CardDescription>
          Entre com seu email corporativo e senha para acessar a plataforma de times ágeis
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <Button 
            variant="outline" 
            type="button"
            className="w-full"
            onClick={handleGoogleLogin}
          >
            <GoogleLogo className="mr-2 h-4 w-4" />
            Continuar com Google
          </Button>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Ou continue com email
              </span>
            </div>
          </div>
          
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
                      <FormDescription>
                        Confirme que você é um usuário humano
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full">
                Entrar
              </Button>
            </form>
          </Form>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <div className="text-sm text-center">
          <Link to="/reset-password" className="text-primary hover:underline">
            Esqueceu sua senha?
          </Link>
        </div>
        <div className="text-sm text-center">
          Não tem uma conta?{" "}
          <Link to="/register" className="text-primary hover:underline">
            Cadastre-se
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
