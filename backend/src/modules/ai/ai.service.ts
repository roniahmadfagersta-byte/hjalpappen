import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AiService {
  constructor(private prisma: PrismaService) {}

  async calculateMatchScore(taskId: string, applicantId: string): Promise<number> {
    const task = await this.prisma.task.findUnique({
      where: { id: taskId },
      include: { skills: true }
    });
    const applicant = await this.prisma.user.findUnique({
      where: { id: applicantId },
      include: { skills: { include: { skill: true } } }
    });

    if (!task || !applicant) return 0;

    const taskSkillSlugs = task.skills.map(s => s.slug);
    const applicantSkillSlugs = applicant.skills.map(s => s.skill.slug);

    if (taskSkillSlugs.length === 0) return 1.0; // No skills required, perfect match by default

    const matchingSkills = taskSkillSlugs.filter(slug => applicantSkillSlugs.includes(slug));
    return matchingSkills.length / taskSkillSlugs.length;
  }

  async detectReviewFraud(comment: string, rating: number): Promise<{ isSuspicious: boolean; score: number; reason?: string }> {
    // Basic heuristics for demo fraud detection
    const suspiciousKeywords = ['bäst', 'snabbast', 'följ mig', 'tjäna pengar', 'gratis', 'klicka här'];
    const lowerComment = comment.toLowerCase();
    
    let score = 0.05; // Base low suspicion score
    
    for (const keyword of suspiciousKeywords) {
      if (lowerComment.includes(keyword)) {
        score += 0.25;
      }
    }

    if (rating === 5 && comment.length < 5) {
      score += 0.3; // Very short 5-star review is slightly suspicious
    }

    return {
      isSuspicious: score > 0.5,
      score: Math.min(score, 1.0),
      reason: score > 0.5 ? 'Kommentaren innehåller misstänkta reklamord eller har onormalt mönster.' : undefined
    };
  }

  async getPriceSuggestion(category: string, description: string): Promise<number> {
    // Simple mock pricing based on category
    const rates: Record<string, number> = {
      'tradgard': 200,
      'hemhjalp': 180,
      'barnpassning': 150,
      'djurpassning': 140,
      'it-teknik': 250,
      'flytt-barhjalp': 220,
      'stadning': 190
    };

    const baseRate = rates[category.toLowerCase()] || 180;
    
    // Add small adjustment based on description length
    const lengthAdjustment = Math.min(description.length / 100 * 5, 25);
    
    return baseRate + lengthAdjustment;
  }
}
