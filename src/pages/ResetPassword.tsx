
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";

const ResetPassword: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <div className="hidden lg:flex lg:w-1/2 bg-primary">
        <div className="w-full flex items-center justify-center px-12">
          <div className="text-white max-w-md">
            <h1 className="text-4xl font-bold mb-6">StaffSync</h1>
            <p className="text-xl mb-6">
              Recupere o acesso à sua conta de forma rápida e segura.
            </p>
          </div>
        </div>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center p-4 lg:p-8 bg-gray-50">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-primary lg:hidden">StaffSync</h2>
          </div>
          <ResetPasswordForm />
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
