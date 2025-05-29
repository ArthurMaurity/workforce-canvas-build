
import React from "react";
import SkillsForm from "@/components/auth/SkillsForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SkillsSetup: React.FC = () => {
  const navigate = useNavigate();

  const handleSkillsSubmit = (skills: any[]) => {
    console.log("Skills submitted:", skills);
    // Aqui você pode salvar as competências no backend
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/register")}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>
          <h1 className="text-3xl font-bold text-center mb-2">
            Configure suas Competências
          </h1>
          <p className="text-muted-foreground text-center">
            Adicione suas competências relacionadas à metodologia Scrum para personalizar sua experiência
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm">
          <SkillsForm onSkillsChange={handleSkillsSubmit} />
          
          <div className="p-6 border-t">
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => navigate("/dashboard")}
              >
                Pular por agora
              </Button>
              <Button onClick={() => navigate("/dashboard")}>
                Finalizar Cadastro
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsSetup;
