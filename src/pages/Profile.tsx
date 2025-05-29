
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profile: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirecionar automaticamente para a página de configurações
    navigate("/settings", { replace: true });
  }, [navigate]);

  return null;
};

export default Profile;
