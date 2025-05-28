
import { Employee } from "@/components/employees/EmployeeCard";
import { Skill } from "@/pages/SkillManagement";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  primarySkill?: string;
  avatar: string | null;
  skills: string[];
}

interface Team {
  id: number;
  name: string;
  project: string;
  status: "Ativo" | "Inativo" | "Planejado";
  members: TeamMember[];
  maxMembers: number;
  description?: string;
  requiredSkills?: string[];
}

interface OptimizationResult {
  team: Team;
  suggestions: TeamMember[];
  score: number;
  reasoning: string[];
}

export class TeamOptimizer {
  static calculateSkillMatch(member: TeamMember, requiredSkills: string[]): number {
    if (!requiredSkills.length) return 0.5; // Neutral score if no requirements
    
    const memberSkills = member.skills || [];
    const matches = requiredSkills.filter(skill => 
      memberSkills.some(memberSkill => 
        memberSkill.toLowerCase().includes(skill.toLowerCase()) ||
        skill.toLowerCase().includes(memberSkill.toLowerCase())
      )
    );
    
    return matches.length / requiredSkills.length;
  }

  static calculateTeamBalance(members: TeamMember[]): number {
    const roles = members.map(m => m.role);
    const uniqueRoles = new Set(roles);
    
    // Prefer teams with diverse roles
    const diversityScore = uniqueRoles.size / members.length;
    
    // Check for key roles
    const hasLeadership = roles.some(role => 
      role.toLowerCase().includes('lead') || 
      role.toLowerCase().includes('senior') ||
      role.toLowerCase().includes('scrum master') ||
      role.toLowerCase().includes('po')
    );
    
    const hasDevelopment = roles.some(role => 
      role.toLowerCase().includes('desenvolvedor') || 
      role.toLowerCase().includes('developer')
    );
    
    const hasDesign = roles.some(role => 
      role.toLowerCase().includes('design') || 
      role.toLowerCase().includes('ux') || 
      role.toLowerCase().includes('ui')
    );
    
    let balanceScore = diversityScore;
    if (hasLeadership) balanceScore += 0.3;
    if (hasDevelopment) balanceScore += 0.2;
    if (hasDesign) balanceScore += 0.2;
    
    return Math.min(balanceScore, 1);
  }

  static optimizeTeam(
    team: Team, 
    availableMembers: Employee[], 
    requiredSkills: string[] = []
  ): OptimizationResult {
    const currentMembers = team.members;
    const availableSlots = team.maxMembers - currentMembers.length;
    
    if (availableSlots <= 0) {
      return {
        team,
        suggestions: [],
        score: this.calculateTeamBalance(currentMembers),
        reasoning: ["Equipe já está completa"]
      };
    }

    // Convert employees to team members format
    const candidates = availableMembers
      .filter(emp => emp.status === "Disponível")
      .map(emp => ({
        id: emp.id,
        name: emp.name,
        role: emp.role,
        primarySkill: emp.primarySkill,
        avatar: emp.avatar,
        skills: emp.skills || []
      }));

    // Score each candidate
    const scoredCandidates = candidates.map(candidate => {
      const skillMatch = this.calculateSkillMatch(candidate, requiredSkills);
      const roleNeeded = this.isRoleNeeded(candidate.role, currentMembers);
      const seniorityBonus = this.getSeniorityBonus(candidate.role);
      
      const totalScore = (skillMatch * 0.4) + (roleNeeded * 0.4) + (seniorityBonus * 0.2);
      
      return { candidate, score: totalScore, skillMatch, roleNeeded, seniorityBonus };
    });

    // Sort by score and take top candidates
    const topCandidates = scoredCandidates
      .sort((a, b) => b.score - a.score)
      .slice(0, availableSlots);

    const suggestions = topCandidates.map(c => c.candidate);
    const projectedMembers = [...currentMembers, ...suggestions];
    const teamScore = this.calculateTeamBalance(projectedMembers);

    const reasoning = this.generateReasoning(topCandidates, requiredSkills);

    return {
      team,
      suggestions,
      score: teamScore,
      reasoning
    };
  }

  private static isRoleNeeded(role: string, currentMembers: TeamMember[]): number {
    const currentRoles = currentMembers.map(m => m.role.toLowerCase());
    const candidateRole = role.toLowerCase();
    
    // Check if this role type is already covered
    const roleTypes = {
      'frontend': ['frontend', 'front-end', 'react', 'vue', 'angular'],
      'backend': ['backend', 'back-end', 'node', 'python', 'java'],
      'design': ['design', 'ux', 'ui', 'designer'],
      'qa': ['qa', 'test', 'qualidade'],
      'devops': ['devops', 'infra', 'cloud'],
      'management': ['scrum', 'po', 'product', 'manager', 'lead']
    };

    for (const [type, keywords] of Object.entries(roleTypes)) {
      const candidateMatches = keywords.some(keyword => candidateRole.includes(keyword));
      const teamHasRole = currentRoles.some(role => 
        keywords.some(keyword => role.includes(keyword))
      );

      if (candidateMatches) {
        return teamHasRole ? 0.3 : 1.0; // High score if role is missing
      }
    }

    return 0.5; // Neutral score for other roles
  }

  private static getSeniorityBonus(role: string): number {
    const roleLower = role.toLowerCase();
    if (roleLower.includes('senior') || roleLower.includes('lead')) return 0.8;
    if (roleLower.includes('pleno') || roleLower.includes('mid')) return 0.6;
    if (roleLower.includes('junior') || roleLower.includes('jr')) return 0.4;
    return 0.5;
  }

  private static generateReasoning(
    scoredCandidates: any[], 
    requiredSkills: string[]
  ): string[] {
    const reasoning: string[] = [];
    
    if (scoredCandidates.length === 0) {
      reasoning.push("Nenhum candidato disponível encontrado");
      return reasoning;
    }

    const topCandidate = scoredCandidates[0];
    
    if (topCandidate.skillMatch > 0.7) {
      reasoning.push(`${topCandidate.candidate.name} tem alta compatibilidade com as competências necessárias`);
    }
    
    if (topCandidate.roleNeeded > 0.8) {
      reasoning.push(`${topCandidate.candidate.name} preenche uma lacuna importante na equipe`);
    }
    
    if (topCandidate.seniorityBonus > 0.7) {
      reasoning.push(`${topCandidate.candidate.name} possui senioridade que pode agregar liderança técnica`);
    }

    const diverseRoles = new Set(scoredCandidates.map(c => c.candidate.role)).size;
    if (diverseRoles > 1) {
      reasoning.push("Sugestões incluem diferentes especialidades para balance da equipe");
    }

    return reasoning;
  }

  static suggestOptimalDistribution(
    teams: Team[], 
    availableMembers: Employee[],
    skills: Skill[] = []
  ): OptimizationResult[] {
    return teams.map(team => {
      const projectSkills = this.inferRequiredSkills(team.project, skills);
      return this.optimizeTeam(team, availableMembers, projectSkills);
    });
  }

  private static inferRequiredSkills(project: string, skills: Skill[]): string[] {
    const projectLower = project.toLowerCase();
    const inferredSkills: string[] = [];

    // Map project types to required skills
    if (projectLower.includes('mobile') || projectLower.includes('app')) {
      inferredSkills.push('React Native', 'Flutter', 'iOS', 'Android');
    }
    
    if (projectLower.includes('web') || projectLower.includes('portal') || projectLower.includes('site')) {
      inferredSkills.push('React', 'JavaScript', 'HTML', 'CSS');
    }
    
    if (projectLower.includes('api') || projectLower.includes('backend') || projectLower.includes('sistema')) {
      inferredSkills.push('Node.js', 'Python', 'Java', 'API');
    }
    
    if (projectLower.includes('design') || projectLower.includes('ux') || projectLower.includes('ui')) {
      inferredSkills.push('Figma', 'Adobe XD', 'Design System');
    }

    return inferredSkills;
  }
}
