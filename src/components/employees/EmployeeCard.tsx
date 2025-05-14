
import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  MoreHorizontal,
  MapPin,
  Phone,
  Mail,
  Briefcase,
  Calendar
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface Employee {
  id: number;
  name: string;
  role: string;
  department: string;
  location: string;
  email: string;
  phone: string;
  startDate: string;
  status: 'Alocado' | 'Disponível';
  avatar: string | null;
  skills: string[];
}

interface EmployeeCardProps {
  employee: Employee;
  onEdit: (employee: Employee) => void;
  onAllocate: (employee: Employee) => void;
  onView: (employee: Employee) => void;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({
  employee,
  onEdit,
  onAllocate,
  onView,
}) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="h-3 bg-primary w-full"></div>
      <CardContent className="pt-6">
        <div className="flex flex-col items-center mb-4">
          <Avatar className="h-20 w-20 mb-3">
            <AvatarImage src={employee.avatar || ""} alt={employee.name} />
            <AvatarFallback className="text-lg">
              {employee.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .substring(0, 2)}
            </AvatarFallback>
          </Avatar>
          <h3 className="font-medium text-lg">{employee.name}</h3>
          <p className="text-muted-foreground text-sm">{employee.role}</p>
          <Badge
            className="mt-2"
            variant={employee.status === "Alocado" ? "default" : "outline"}
          >
            {employee.status}
          </Badge>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <Briefcase size={16} className="text-muted-foreground" />
            <span>{employee.department}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-muted-foreground" />
            <span>{employee.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-muted-foreground" />
            <span>Desde {employee.startDate}</span>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-xs font-medium mb-2">Habilidades</p>
          <div className="flex flex-wrap gap-1">
            {employee.skills.map((skill, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between border-t p-4 bg-muted/30">
        <Button variant="outline" size="sm" onClick={() => onView(employee)}>
          Ver perfil
        </Button>
        
        {employee.status === "Disponível" ? (
          <Button size="sm" onClick={() => onAllocate(employee)}>
            Alocar
          </Button>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(employee)}>
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onAllocate(employee)}>
                Mudar alocação
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </CardFooter>
    </Card>
  );
};

export default EmployeeCard;
