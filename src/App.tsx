
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SkillsSetup from "./pages/SkillsSetup";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import Collaborators from "./pages/Collaborators";
import Profile from "./pages/Profile";
import ProfileManagement from "./pages/ProfileManagement";
import TeamManagement from "./pages/TeamManagement";
import SkillManagement from "./pages/SkillManagement";
import Settings from "./pages/Settings";
import DashboardLayout from "./components/layout/DashboardLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Auth Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/skills-setup" element={<SkillsSetup />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          
          {/* Protected Routes (Dashboard) */}
          <Route path="/" element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/collaborators" element={<Collaborators />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile-management" element={<ProfileManagement />} />
            <Route path="/team-management" element={<TeamManagement />} />
            <Route path="/skill-management" element={<SkillManagement />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
          
          {/* Catch All Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
