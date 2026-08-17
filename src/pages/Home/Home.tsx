import { Seo } from '@/components/common/Seo';
import { Container } from '@/components/common/Container';
import { Universe } from '@/components/universe/Universe';
import { ScrollCue } from '@/components/effects/ScrollCue';
import { profile } from '@/data/profile';

export function Home() {
  return (
    <>
      <Seo title="Home" description={profile.summary} path="/" />
      <Container
        as="div"
        className="flex min-h-[calc(100vh-5rem)] flex-col items-center justify-center gap-10 py-10 lg:min-h-screen"
      >
        <Universe />
        <ScrollCue />
      </Container>
    </>
  );
}
