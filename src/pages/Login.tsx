
import LoginForm from "@/components/auth/LoginForm";
import { Link } from "react-router-dom";

const Login: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <div className="hidden lg:flex lg:w-1/2 bg-primary">
        <div className="w-full flex items-center justify-center px-12">
          <div className="text-white max-w-md">
            <h1 className="text-4xl font-bold mb-6">Aginerator</h1>
            <p className="text-xl mb-6">
              Formação ágil e inteligente de times multidisciplinares para seus projetos.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 bg-white rounded-full" />
                <span>Automatização na formação de times ágeis</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 bg-white rounded-full" />
                <span>Matching por habilidades e competências</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 bg-white rounded-full" />
                <span>Dashboard de visualização e alocação</span>
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
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
