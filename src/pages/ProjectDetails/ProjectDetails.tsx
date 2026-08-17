import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { buttonClass } from '@/lib/buttonStyles';
import { Seo } from '@/components/common/Seo';
import { Container } from '@/components/common/Container';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { ScrollReveal } from '@/components/effects/ScrollReveal';
import { ProjectHero } from '@/components/projects/ProjectHero';
import { ProjectOverview } from '@/components/projects/ProjectOverview';
import { ProjectProblem } from '@/components/projects/ProjectProblem';
import { ProjectSolution } from '@/components/projects/ProjectSolution';
import { ProjectHighlights } from '@/components/projects/ProjectHighlights';
import { ProjectArchitecture } from '@/components/projects/ProjectArchitecture';
import { ProjectTechnology } from '@/components/projects/ProjectTechnology';
import { ProjectImplementation } from '@/components/projects/ProjectImplementation';
import { ProjectChallenges } from '@/components/projects/ProjectChallenges';
import { ProjectResults } from '@/components/projects/ProjectResults';
import { ProjectLessons } from '@/components/projects/ProjectLessons';
import { ProjectGallery } from '@/components/projects/ProjectGallery';
import { ProjectLinks } from '@/components/projects/ProjectLinks';
import { ProjectNavigation } from '@/components/projects/ProjectNavigation';
import { RelatedProjects } from '@/components/projects/RelatedProjects';
import { projects } from '@/data/projects';

function ProjectNotFound({ slug }: { slug?: string }) {
  return (
    <>
      <Seo title="Project Not Found" description="This project doesn't exist." path="/projects" />
      <Container className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <p className="text-eyebrow text-gold-soft">Not Found</p>
        <h1 className="mt-4 text-3xl text-ink">
          {slug ? `No project matches "${slug}".` : "That project doesn't exist."}
        </h1>
        <p className="mt-3 max-w-sm text-ink-muted">
          It may have been renamed or removed. Take a look at everything currently shipped.
        </p>
        <Link
          to="/projects"
          className={buttonClass('primary', 'mt-8')}
        >
          <ArrowLeft size={14} strokeWidth={1.6} />
          All Projects
        </Link>
      </Container>
    </>
  );
}

export function ProjectDetails() {
  const { slug } = useParams<{ slug: string }>();
  const index = projects.findIndex((item) => item.slug === slug);
  const project = index >= 0 ? projects[index] : undefined;

  if (!project) {
    return <ProjectNotFound slug={slug} />;
  }

  return (
    <>
      <Seo
        title={project.title}
        description={project.description}
        path={`/projects/${project.slug}`}
      />
      <Container className="pb-24 pt-6">
        <Breadcrumbs
          items={[
            { label: 'Home', route: '/' },
            { label: 'Projects', route: '/projects' },
            { label: project.title },
          ]}
        />

        <div className="mt-8">
          <ProjectHero project={project} index={index} />
        </div>

        <div className="mt-16 flex flex-col gap-14">
          <ScrollReveal>
            <ProjectOverview project={project} />
          </ScrollReveal>

          <ScrollReveal>
            <div className="grid gap-12 sm:grid-cols-2">
              <ProjectProblem problem={project.problem} />
              <ProjectSolution approach={project.approach} />
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <ProjectHighlights highlights={project.highlights} />
          </ScrollReveal>
          <ScrollReveal>
            <ProjectTechnology technologies={project.technologies} />
          </ScrollReveal>
          {project.architecture && (
            <ScrollReveal>
              <ProjectArchitecture data={project.architecture} />
            </ScrollReveal>
          )}

          {(project.implementation.length > 0 ||
            project.challenges.length > 0 ||
            project.results.length > 0) && (
            <ScrollReveal>
              <div className="flex flex-col gap-14">
                <ProjectImplementation items={project.implementation} />
                <ProjectChallenges challenges={project.challenges} />
                <ProjectResults results={project.results} />
              </div>
            </ScrollReveal>
          )}

          {project.screenshots.length > 0 && (
            <ScrollReveal>
              <div>
                <h2 className="text-eyebrow text-gold-soft">Screenshots</h2>
                <div className="mt-4">
                  <ProjectGallery screenshots={project.screenshots} />
                </div>
              </div>
            </ScrollReveal>
          )}

          {project.lessons.length > 0 && (
            <ScrollReveal>
              <ProjectLessons lessons={project.lessons} />
            </ScrollReveal>
          )}
          {(project.liveUrl || project.githubUrl || (project.links && project.links.length > 0)) && (
            <ScrollReveal>
              <ProjectLinks project={project} />
            </ScrollReveal>
          )}
        </div>

        <ProjectNavigation index={index} />
        <RelatedProjects slugs={project.relatedProjectSlugs} />
      </Container>
    </>
  );
}
