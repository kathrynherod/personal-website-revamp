export type ResumeData = {
  education: Education[];
  experience: Experience[];
  interests: Interests;
  personalInfo: PersonalInfo;
  professionalSummary: string;
  skills: Skill[];
  theme: Theme;
};

export type Education = {
  degree: string;
  id: number;
  institution: string;
  year: string;
};

export type Experience = {
  company: string;
  duration: string;
  id: number;
  location: string;
  responsibilities: string[];
  title: string;
};

export type Interests = {
  hobbies: string[];
  volunteerWork: VolunteerWork[];
};

export type VolunteerWork = {
  duration: string;
  id: number;
  organization: string;
  role: string;
};

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

export type Skill = {
  id: number;
  title: string;
  categories: SkillCategory[];
};
export type SkillCategory = {
  title: string;
  skills: string[];
};

export type Theme = {
  accentColor: string;
  backgroundColor: string;
  primaryColor: string;
  textColor: string;
};
