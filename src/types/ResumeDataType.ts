// Personal Information Types
export interface PersonalInfo {
  email: string;
  links: {
    github: string;
    linkedin: string;
    website: string;
  };
  location: string;
  name: string;
  phone: string;
  title: string;
}

// Experience Types
export interface Experience {
  company: string;
  duration: string;
  id: number;
  location: string;
  responsibilities: string[];
  title: string;
}

// Skills Types
export interface TechnicalSkills {
  backendDatabase: string[];
  ecommerceSeo: string[];
  frontendStyling: string[];
  testing: string[];
  toolsPlatforms: string[];
}

export interface SoftSkills {
  communicationCollaboration: string[];
  leadershipManagement: string[];
  processMethodology: string[];
}

export interface Skills {
  soft: SoftSkills;
  technical: TechnicalSkills;
}

export type EducationType = "certification" | "degree";

export interface Education {
  degree: string;
  id: number;
  institution: string;
  type: EducationType;
  year: string;
}

// Interests Types
export interface VolunteerWork {
  duration: string;
  id: number;
  organization: string;
  role: string;
}

export interface Interests {
  hobbies: string[];
  volunteerWork: VolunteerWork[];
}

export interface Theme {
  accentColor: string;
  backgroundColor: string;
  primaryColor: string;
  textColor: string;
}

export interface ResumeData {
  education: Education[];
  experience: Experience[];
  interests: Interests;
  personalInfo: PersonalInfo;
  professionalSummary: string;
  skills: Skills;
  theme: Theme;
}

export type SkillCategory = keyof TechnicalSkills | keyof SoftSkills;
export type ExperienceId = Experience["id"];
export type EducationId = Education["id"];
export type VolunteerWorkId = VolunteerWork["id"];

export interface ResumeComponentProps {
  data: ResumeData;
  showEducation?: boolean;
  showExperience?: boolean;
  showInterests?: boolean;
  showPersonalInfo?: boolean;
  showSkills?: boolean;
  theme?: Partial<Theme>;
}

export interface ExperienceCardProps {
  experience: Experience;
  maxResponsibilities?: number;
  showResponsibilities?: boolean;
}

export interface SkillsSectionProps {
  layout?: "columns" | "grid" | "list";
  showSoft?: boolean;
  showTechnical?: boolean;
  skills: Skills;
}

export interface EducationItemProps {
  compact?: boolean;
  education: Education;
  showType?: boolean;
}

export const isEducationDegree = (education: Education): boolean => {
  return education.type === "degree";
};

export const isEducationCertification = (education: Education): boolean => {
  return education.type === "certification";
};

// Helper type for filtering
export type FilterableExperience = Pick<
  Experience,
  "company" | "duration" | "location" | "title"
>;
export type FilterableEducation = Pick<
  Education,
  "degree" | "institution" | "type"
>;

// Default values type for partial data
export type PartialResumeData = Partial<ResumeData>;
