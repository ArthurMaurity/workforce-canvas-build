
import RegisterForm from "@/components/auth/RegisterForm";

const Register: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <div className="hidden lg:flex lg:w-1/2 bg-primary">
        <div className="w-full flex items-center justify-center px-12">
          <div className="text-white max-w-md">
            <h1 className="text-4xl font-bold mb-6">Aginerator</h1>
            <p className="text-xl mb-6">
              Crie sua conta e comece a formar times ágeis de alto desempenho para seus projetos.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 bg-white rounded-full" />
                <span>Cadastro de habilidades e experiências</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 bg-white rounded-full" />
                <span>Matching inteligente por perfil profissional</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 bg-white rounded-full" />
                <span>Foco em papéis Scrum e multidisciplinaridade</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center p-4 lg:p-8 bg-gray-50">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-primary lg:hidden">Aginerator</h2>
          </div>
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default Register;
