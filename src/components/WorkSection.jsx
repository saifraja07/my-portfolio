import Section from "./Section";
import ProjectCard from "./ProjectCard";
import { projects } from "../data/projects";

export default function WorkSection() {
  return (
    <Section
      id="work"
      eyebrow="Work"
      title="Things I've Built"
      description="A selection of projects I've worked on."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </Section>
  );
}
