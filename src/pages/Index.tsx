
import { Navigate } from "react-router-dom";

const Index = () => {
  // Redirect to login - in a real application, we would check authentication state here
  return <Navigate to="/login" />;
};

export default Index;
