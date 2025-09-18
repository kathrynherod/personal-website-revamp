import Education from "../components/Education/Education";
import JobExperienceTimeline from "../components/JobExperienceTimeline";
import Layout from "../components/Layout";
import Skills from "../components/Skills/Skills";

export default function Experience() {
  return (
    <Layout id="experience" sectionTitle="Experience">
      <JobExperienceTimeline />
      <Skills />
      <Education />
    </Layout>
  );
}
