import { Seo } from '@/components/common/Seo';
import { Container } from '@/components/common/Container';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { RecruiterNavigation } from '@/components/recruiter/RecruiterNavigation';
import { RecruiterHero } from '@/components/recruiter/RecruiterHero';
import { RecruiterSummary } from '@/components/recruiter/RecruiterSummary';
import { RecruiterProjects } from '@/components/recruiter/RecruiterProjects';
import { RecruiterSkills } from '@/components/recruiter/RecruiterSkills';
import { RecruiterExperience } from '@/components/recruiter/RecruiterExperience';
import { RecruiterTechnicalFocus } from '@/components/recruiter/RecruiterTechnicalFocus';
import { RecruiterContact } from '@/components/recruiter/RecruiterContact';
import { profile } from '@/data/profile';

export function Recruiter() {
  return (
    <div className="min-h-screen bg-void text-ink">
      <Seo
        title={profile.role}
        description={profile.summary}
        path="/recruiter"
      />

      {/* A single restrained cosmic touch — no star field, no orbits, no animation. */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-64 opacity-40 print:hidden"
        style={{
          background: 'radial-gradient(ellipse at top, color-mix(in srgb, var(--color-gold) 12%, transparent), transparent 70%)',
        }}
      />

      <RecruiterNavigation />

      <ErrorBoundary>
        <Container as="main" className="max-w-4xl pb-24 pt-10 print:max-w-none print:px-0">
          <RecruiterHero />
          <RecruiterSummary />
          <RecruiterProjects />
          <RecruiterSkills />
          <RecruiterExperience />
          <RecruiterTechnicalFocus />
          <RecruiterContact />
        </Container>
      </ErrorBoundary>
    </div>
  );
}
