
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { LogOut, User, Palette, Bell } from "lucide-react";
import ProfileForm from "@/components/profile/ProfileForm";
import SecuritySettings from "@/components/profile/SecuritySettings";

const Settings: React.FC = () => {
  const { toast } = useToast();

  const handleLogout = () => {
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso.",
    });
    
    // Simular logout
    setTimeout(() => {
      window.location.href = "/login";
    }, 1000);
  };

  const handleThemeChange = (theme: string) => {
    toast({
      title: "Tema alterado",
      description: `Tema ${theme} aplicado com sucesso.`,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Configurações</h1>
        <p className="text-muted-foreground">
          Gerencie suas preferências, perfil e configurações da conta.
        </p>
      </div>
      
      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile">Perfil</TabsTrigger>
          <TabsTrigger value="security">Segurança</TabsTrigger>
          <TabsTrigger value="interface">Interface</TabsTrigger>
          <TabsTrigger value="notifications">Notificações</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Informações do Perfil
              </CardTitle>
              <CardDescription>
                Atualize suas informações pessoais e profissionais
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ProfileForm />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security">
          <div className="space-y-6">
            <SecuritySettings />
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-destructive">
                  <LogOut className="h-5 w-5" />
                  Sair da Conta
                </CardTitle>
                <CardDescription>
                  Desconecte-se da sua conta atual
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="destructive" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Fazer Logout
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="interface">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Aparência
              </CardTitle>
              <CardDescription>
                Customize a aparência da interface
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Tema</label>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    onClick={() => handleThemeChange("claro")}
                  >
                    Claro
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => handleThemeChange("escuro")}
                  >
                    Escuro
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => handleThemeChange("automático")}
                  >
                    Automático
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Tamanho da fonte</label>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Pequena</Button>
                  <Button variant="default" size="sm">Média</Button>
                  <Button variant="outline" size="sm">Grande</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notificações
              </CardTitle>
              <CardDescription>
                Configure suas preferências de notificação
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Notificações por email</h4>
                  <p className="text-sm text-muted-foreground">
                    Receba atualizações sobre projetos e equipes
                  </p>
                </div>
                <Button variant="outline">Ativar</Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Notificações push</h4>
                  <p className="text-sm text-muted-foreground">
                    Notificações em tempo real no navegador
                  </p>
                </div>
                <Button variant="outline">Ativar</Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Resumo semanal</h4>
                  <p className="text-sm text-muted-foreground">
                    Relatório semanal de atividades
                  </p>
                </div>
                <Button variant="outline">Ativar</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
