// Define shared types for CV data

import { z } from 'zod';

// =====================================================================
// 🖼️ Informations personnelles
export const socialLinksSchema = z.object({
  linkedin: z.string().url('URL LinkedIn invalide').optional().or(z.literal('')),
  github: z.string().url('URL GitHub invalide').optional().or(z.literal('')),
  portfolio: z.string().url('URL Portfolio invalide').optional().or(z.literal('')),
  other: z.array(z.object({
    label: z.string(),
    url: z.string().url('URL invalide'),
  })).optional(),
});

export const locationSchema = z.object({
  country: z.string().optional(),
  city: z.string().optional(),
  postalCode: z.string().optional(),
});

export const personalInfoSchema = z.object({
  // Identité
  fullName: z.string().min(2, 'Le nom doit contenir au moins 2 caractères').max(50),
  title: z.string().max(100).optional(),
  profileImage: z.string().optional(), // Base64 ou URL
  
  // Contact
  email: z.string().email('Adresse email invalide'),
  phone: z.string().optional(),
  location: locationSchema.optional(),
  
  // Réseaux sociaux
  socialLinks: socialLinksSchema.optional(),
  
  // Informations complémentaires
  dateOfBirth: z.string().optional(),
  drivingLicense: z.boolean().optional(),
  
  // Résumé & Objectifs
  summary: z.string().min(50, 'Le résumé doit contenir au moins 50 mots').max(1500).optional(),
  careerObjective: z.string().max(500).optional(),
  keywords: z.array(z.string()).optional(), // Pour l'ATS
  professionalStatus: z.enum(['CDI', 'CDD', 'Freelance', 'Étudiant', 'En recherche', 'Autre']).optional(),
});

export type PersonalInfo = z.infer<typeof personalInfoSchema>;
export type SocialLinks = z.infer<typeof socialLinksSchema>;
export type Location = z.infer<typeof locationSchema>;

// =====================================================================
// 💼 Expériences professionnelles
export const experienceEntrySchema = z.object({
  id: z.string().optional(), // Pour le drag & drop
  role: z.string().min(1, 'Poste requis'),
  company: z.string().min(1, 'Entreprise requise'),
  location: z.string().optional(),
  startDate: z.string().optional(), // Format: YYYY-MM
  endDate: z.string().optional(), // Format: YYYY-MM ou "Présent"
  current: z.boolean().optional(),
  contractType: z.enum(['CDI', 'CDD', 'Stage', 'Freelance', 'Alternance', 'Autre']).optional(),
  description: z.string().optional(),
  achievements: z.array(z.string()).optional(), // Réalisations clés
  technologies: z.array(z.string()).optional(), // Tags de technologies
  projects: z.array(z.object({
    name: z.string(),
    description: z.string().optional(),
    url: z.string().optional(),
  })).optional(),
  companyLogo: z.string().optional(), // URL ou Base64
});

export type ExperienceEntry = z.infer<typeof experienceEntrySchema>;

export const experiencesSchema = z.array(experienceEntrySchema).optional();
export type Experiences = z.infer<typeof experiencesSchema>;

// =====================================================================
// 📚 Formation
export const educationEntrySchema = z.object({
  id: z.string().optional(),
  degree: z.string().min(1, 'Diplôme requis'),
  institution: z.string().min(1, 'Établissement requis'),
  location: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  current: z.boolean().optional(),
  honors: z.string().optional(), // Mention
  specialization: z.string().optional(),
  thesis: z.string().optional(), // Thèse/mémoire
  relevantCourses: z.array(z.string()).optional(), // Cours pertinents (tags)
  description: z.string().optional(),
  gpa: z.string().optional(),
});

export type EducationEntry = z.infer<typeof educationEntrySchema>;

// =====================================================================
// 🎨 Portfolio & Projets
export const projectEntrySchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Nom du projet requis'),
  description: z.string().optional(),
  technologies: z.array(z.string()).optional(),
  role: z.string().optional(),
  url: z.string().optional(), // Site live
  github: z.string().optional(),
  images: z.array(z.string()).optional(), // URLs ou Base64
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

export type ProjectEntry = z.infer<typeof projectEntrySchema>;

// =====================================================================
// 🌍 Langues
export const languageDetailedAssessmentSchema = z.object({
  listening: z.enum(['A1', 'A2', 'B1', 'B2', 'C1', 'C2']).optional(),
  speaking: z.enum(['A1', 'A2', 'B1', 'B2', 'C1', 'C2']).optional(),
  reading: z.enum(['A1', 'A2', 'B1', 'B2', 'C1', 'C2']).optional(),
  writing: z.enum(['A1', 'A2', 'B1', 'B2', 'C1', 'C2']).optional(),
});

export const languageEntrySchema = z.object({
  id: z.string().optional(),
  language: z.string().min(1, 'Langue requise'),
  languageCode: z.string().optional(), // Pour le drapeau (ex: 'fr', 'en')
  level: z.enum(['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'Natif']),
  detailedAssessment: languageDetailedAssessmentSchema.optional(),
  certified: z.boolean().optional(),
  certificateName: z.string().optional(),
  certificateUrl: z.string().optional(),
});

export type LanguageEntry = z.infer<typeof languageEntrySchema>;
export type LanguageDetailedAssessment = z.infer<typeof languageDetailedAssessmentSchema>;

// =====================================================================
// 🛠️ Compétences
export const skillEntrySchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Nom de la compétence requis'),
  level: z.number().min(1).max(5).optional(), // 1-5
  yearsOfExperience: z.number().optional(),
  lastUsed: z.string().optional(), // Année
});

export const skillCategorySchema = z.object({
  id: z.string().optional(),
  category: z.enum(['Techniques', 'Méthodologies', 'Langues', 'Soft Skills', 'Autres']),
  customCategoryName: z.string().optional(), // Si "Autres"
  skills: z.array(skillEntrySchema).min(1, 'Au moins une compétence requise'),
});

export type SkillEntry = z.infer<typeof skillEntrySchema>;
export type SkillCategory = z.infer<typeof skillCategorySchema>;

export const skillsSchema = z.object({
  skills: z.array(z.string().min(1)).max(50),
});
export type Skills = z.infer<typeof skillsSchema>;

// =====================================================================
// 🏆 Certifications & Formations continues
export const certificationEntrySchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Nom de la certification requis'),
  issuer: z.string().min(1, 'Organisme certificateur requis'),
  issueDate: z.string().optional(),
  expiryDate: z.string().optional(),
  credentialId: z.string().optional(),
  verificationUrl: z.string().optional(),
  associatedSkills: z.array(z.string()).optional(),
});

export type CertificationEntry = z.infer<typeof certificationEntrySchema>;

// =====================================================================
// 🤝 Centres d'intérêt
export const interestEntrySchema = z.object({
  id: z.string().optional(),
  category: z.enum(['Sport', 'Arts', 'Voyages', 'Bénévolat', 'Associations', 'Publications', 'Brevets', 'Autre']),
  title: z.string().min(1, 'Titre requis'),
  description: z.string().optional(),
});

export type InterestEntry = z.infer<typeof interestEntrySchema>;

// =====================================================================
// Complete CV data type
export interface CVData {
  personalInfo?: PersonalInfo;
  experiences: ExperienceEntry[];
  education: EducationEntry[];
  projects: ProjectEntry[];
  skills: string[];
  skillCategories: SkillCategory[];
  languages: LanguageEntry[];
  certifications: CertificationEntry[];
  interests: InterestEntry[];
}

