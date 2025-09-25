import Education from "@components/Education/Education";
import JobExperienceTimeline from "@components/JobExperienceTimeline";
import Skills from "@components/Skills/Skills";
import Layout from "@shared/Layout";

export default function Experience() {
  return (
    <Layout id="experience" sectionTitle="Experience">
      <JobExperienceTimeline />
      <Skills />
      <Education />
    </Layout>
  );
}
