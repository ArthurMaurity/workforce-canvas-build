
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const recentEmployees = [
  {
    id: 1,
    name: "Lucas Silva",
    role: "Desenvolvedor Front-end",
    department: "Desenvolvimento",
    status: "Alocado",
    avatar: null,
  },
  {
    id: 2,
    name: "Mariana Costa",
    role: "UX Designer",
    department: "Design",
    status: "Disponível",
    avatar: null,
  },
  {
    id: 3,
    name: "Pedro Alves",
    role: "Analista de Dados",
    department: "Produto",
    status: "Alocado",
    avatar: null,
  },
  {
    id: 4,
    name: "Juliana Mendes",
    role: "Desenvolvedora Back-end",
    department: "Desenvolvimento",
    status: "Disponível",
    avatar: null,
  },
  {
    id: 5,
    name: "Roberto Gomes",
    role: "Product Manager",
    department: "Produto",
    status: "Alocado",
    avatar: null,
  },
];

const RecentEmployees: React.FC = () => {
  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle>Colaboradores Recentes</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-4">
          {recentEmployees.map((employee) => (
            <div
              key={employee.id}
              className="flex items-center justify-between p-3 rounded-md hover:bg-muted transition-colors"
            >
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={employee.avatar || ""} />
                  <AvatarFallback>
                    {employee.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{employee.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {employee.role}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-sm hidden md:block">{employee.department}</div>
                <Badge
                  variant={employee.status === "Alocado" ? "default" : "outline"}
                  className={
                    employee.status === "Alocado"
                      ? "bg-success-500"
                      : "text-warning-500 border-warning-500"
                  }
                >
                  {employee.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentEmployees;
