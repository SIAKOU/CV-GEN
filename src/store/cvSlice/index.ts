import { createSlice } from '@reduxjs/toolkit';

import type { PersonalInfo, ExperienceEntry, EducationEntry, ProjectEntry, LanguageEntry, SkillCategory, CertificationEntry, InterestEntry } from '../../types';

interface CvState {
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

// Données d'exemple par défaut pour l'aperçu
const defaultPersonalInfo: PersonalInfo = {
  fullName: 'Jean Dupont',
  title: 'Développeur Full Stack',
  email: 'jean.dupont@example.com',
  phone: '+33 6 12 34 56 78',
  location: {
    city: 'Paris',
    country: 'France',
    postalCode: '75001',
  },
  socialLinks: {
    linkedin: 'https://linkedin.com/in/jeandupont',
    github: 'https://github.com/jeandupont',
    portfolio: 'https://jeandupont.dev',
  },
  summary: 'Développeur Full Stack passionné avec 5 ans d\'expérience dans la création d\'applications web modernes. Expertise en React, Node.js et TypeScript. Capacité démontrée à livrer des solutions innovantes et performantes.',
  professionalStatus: 'En recherche',
};

const defaultExperiences: ExperienceEntry[] = [
  {
    id: '1',
    role: 'Développeur Full Stack Senior',
    company: 'TechCorp',
    location: 'Paris, France',
    startDate: '2021-03',
    current: true,
    contractType: 'CDI',
    description: 'Développement d\'applications web complexes pour des clients internationaux',
    achievements: [
      'Réduction du temps de chargement de 40% grâce à l\'optimisation du code',
      'Migration réussie de l\'application vers React 18',
      'Mentorat de 3 développeurs juniors',
    ],
    technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS'],
  },
  {
    id: '2',
    role: 'Développeur Frontend',
    company: 'StartupXYZ',
    location: 'Lyon, France',
    startDate: '2019-06',
    endDate: '2021-02',
    contractType: 'CDD',
    description: 'Création d\'interfaces utilisateur modernes et responsives',
    achievements: [
      'Développement de 15+ composants réutilisables',
      'Amélioration de l\'accessibilité (WCAG 2.1)',
    ],
    technologies: ['React', 'JavaScript', 'CSS3', 'Redux'],
  },
];

const defaultEducation: EducationEntry[] = [
  {
    id: '1',
    degree: 'Master en Informatique',
    institution: 'Université Paris-Saclay',
    location: 'Paris, France',
    startDate: '2017-09',
    endDate: '2019-06',
    honors: 'Mention Bien',
    specialization: 'Développement Web et Mobile',
  },
  {
    id: '2',
    degree: 'Licence en Informatique',
    institution: 'Université de Lyon',
    location: 'Lyon, France',
    startDate: '2014-09',
    endDate: '2017-06',
  },
];

const defaultProjects: ProjectEntry[] = [
  {
    id: '1',
    name: 'Générateur de CV',
    description: 'Application React pour créer des CV professionnels avec export PDF',
    technologies: ['React', 'TypeScript', 'TailwindCSS', 'Redux'],
    role: 'Développeur Principal',
    github: 'https://github.com/jeandupont/cv-generator',
  },
  {
    id: '2',
    name: 'E-commerce Platform',
    description: 'Plateforme e-commerce complète avec paiement en ligne',
    technologies: ['Next.js', 'Node.js', 'Stripe', 'MongoDB'],
    role: 'Full Stack Developer',
  },
];

const defaultSkillCategories: SkillCategory[] = [
  {
    id: '1',
    category: 'Techniques',
    skills: [
      { id: '1', name: 'React', level: 5, yearsOfExperience: 5 },
      { id: '2', name: 'TypeScript', level: 5, yearsOfExperience: 4 },
      { id: '3', name: 'Node.js', level: 4, yearsOfExperience: 5 },
      { id: '4', name: 'PostgreSQL', level: 4, yearsOfExperience: 3 },
      { id: '5', name: 'MongoDB', level: 3, yearsOfExperience: 2 },
    ],
  },
  {
    id: '2',
    category: 'Méthodologies',
    skills: [
      { id: '6', name: 'Agile/Scrum', level: 5 },
      { id: '7', name: 'TDD', level: 4 },
      { id: '8', name: 'CI/CD', level: 4 },
    ],
  },
];

const defaultLanguages: LanguageEntry[] = [
  {
    id: '1',
    language: 'Français',
    languageCode: 'fr',
    level: 'Natif',
  },
  {
    id: '2',
    language: 'Anglais',
    languageCode: 'en',
    level: 'C1',
    certified: true,
    certificateName: 'TOEIC',
  },
  {
    id: '3',
    language: 'Espagnol',
    languageCode: 'es',
    level: 'B1',
  },
];

const defaultCertifications: CertificationEntry[] = [
  {
    id: '1',
    name: 'AWS Certified Developer',
    issuer: 'Amazon Web Services',
    issueDate: '2023-06',
    credentialId: 'AWS-123456',
  },
  {
    id: '2',
    name: 'React Advanced Certification',
    issuer: 'Meta',
    issueDate: '2022-11',
  },
];

const defaultInterests: InterestEntry[] = [
  {
    id: '1',
    category: 'Sport',
    title: 'Course à pied',
    description: 'Marathon de Paris 2023',
  },
  {
    id: '2',
    category: 'Bénévolat',
    title: 'Mentorat de jeunes développeurs',
    description: 'Bénévole chez Code.org',
  },
];

const initialState: CvState = {
  personalInfo: defaultPersonalInfo,
  experiences: defaultExperiences,
  education: defaultEducation,
  projects: defaultProjects,
  skills: [],
  skillCategories: defaultSkillCategories,
  languages: defaultLanguages,
  certifications: defaultCertifications,
  interests: defaultInterests,
};

const cvSlice = createSlice({
  name: 'cv',
  initialState,
  reducers: {
    setPersonalInfo(state, action: { payload: PersonalInfo }) {
      state.personalInfo = action.payload;
    },
    setExperiences(state, action: { payload: ExperienceEntry[] }) {
      state.experiences = action.payload;
    },
    setEducation(state, action: { payload: EducationEntry[] }) {
      state.education = action.payload;
    },
    setProjects(state, action: { payload: ProjectEntry[] }) {
      state.projects = action.payload;
    },
    setSkills(state, action: { payload: string[] }) {
      state.skills = action.payload;
    },
    setSkillCategories(state, action: { payload: SkillCategory[] }) {
      state.skillCategories = action.payload;
    },
    setLanguages(state, action: { payload: LanguageEntry[] }) {
      state.languages = action.payload;
    },
    setCertifications(state, action: { payload: CertificationEntry[] }) {
      state.certifications = action.payload;
    },
    setInterests(state, action: { payload: InterestEntry[] }) {
      state.interests = action.payload;
    },
    clearCV(state) {
      // Réinitialiser avec les données par défaut au lieu de vider complètement
      state.personalInfo = defaultPersonalInfo;
      state.experiences = defaultExperiences;
      state.education = defaultEducation;
      state.projects = defaultProjects;
      state.skills = [];
      state.skillCategories = defaultSkillCategories;
      state.languages = defaultLanguages;
      state.certifications = defaultCertifications;
      state.interests = defaultInterests;
    },
    resetToEmpty(state) {
      // Nouvelle action pour vraiment tout vider si nécessaire
      state.personalInfo = undefined;
      state.experiences = [];
      state.education = [];
      state.projects = [];
      state.skills = [];
      state.skillCategories = [];
      state.languages = [];
      state.certifications = [];
      state.interests = [];
    },
  },
});

export const { 
  setPersonalInfo, 
  setExperiences, 
  setEducation,
  setProjects,
  setSkills, 
  setSkillCategories,
  setLanguages,
  setCertifications,
  setInterests,
  clearCV,
  resetToEmpty,
} = cvSlice.actions;

export default cvSlice.reducer;
