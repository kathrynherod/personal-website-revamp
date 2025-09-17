export type PersonalInfo = {
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
};

export type Experience = {
  company: string;
  duration: string;
  id: number;
  location: string;
  responsibilities: string[];
  title: string;
};
export type SkillCategory = {
  title: string;
  skills: string[];
};
export type Skills = {
  soft: SkillCategory[];
  technical: SkillCategory[];
};

export type Education = {
  degree: string;
  id: number;
  institution: string;
  year: string;
};

export type VolunteerWork = {
  duration: string;
  id: number;
  organization: string;
  role: string;
};

export type Interests = {
  hobbies: string[];
  volunteerWork: VolunteerWork[];
};

export type Theme = {
  accentColor: string;
  backgroundColor: string;
  primaryColor: string;
  textColor: string;
};

export type ResumeData = {
  education: Education[];
  experience: Experience[];
  interests: Interests;
  personalInfo: PersonalInfo;
  professionalSummary: string;
  skills: Skills;
  theme: Theme;
};

export type ExperienceId = Experience["id"];
export type EducationId = Education["id"];
export type VolunteerWorkId = VolunteerWork["id"];

export type ResumeComponentProps = {
  data: ResumeData;
  showEducation?: boolean;
  showExperience?: boolean;
  showInterests?: boolean;
  showPersonalInfo?: boolean;
  showSkills?: boolean;
  theme?: Partial<Theme>;
};

export type ExperienceCardProps = {
  experience: Experience;
  maxResponsibilities?: number;
  showResponsibilities?: boolean;
};

export type SkillsSectionProps = {
  layout?: "columns" | "grid" | "list";
  showSoft?: boolean;
  showTechnical?: boolean;
  skills: Skills;
};

export type EducationItemProps = {
  compact?: boolean;
  education: Education;
  showType?: boolean;
};

// Default values type for partial data
export type PartialResumeData = Partial<ResumeData>;
