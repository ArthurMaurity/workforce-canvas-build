
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, CheckCircle, Clock, Award } from "lucide-react";

const DashboardStats: React.FC = () => {
  const stats = [
    {
      title: "Total de Colaboradores",
      value: "156",
      icon: <Users className="h-6 w-6 text-primary" />,
      change: "+12% em relação ao mês passado",
      trend: "up",
    },
    {
      title: "Alocados em Projetos",
      value: "132",
      icon: <CheckCircle className="h-6 w-6 text-success-500" />,
      change: "85% do total",
      trend: "neutral",
    },
    {
      title: "Aguardando Alocação",
      value: "24",
      icon: <Clock className="h-6 w-6 text-warning-500" />,
      change: "15% do total",
      trend: "neutral",
    },
    {
      title: "Colaboradores Destacados",
      value: "8",
      icon: <Award className="h-6 w-6 text-accent" />,
      change: "5% do total",
      trend: "up",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            {stat.icon}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {stat.trend === "up" ? (
                <span className="text-success-500">↑ </span>
              ) : stat.trend === "down" ? (
                <span className="text-error-500">↓ </span>
              ) : null}
              {stat.change}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DashboardStats;
