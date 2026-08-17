import { Link } from 'react-router-dom';
import { Seo } from '@/components/common/Seo';
import { Container } from '@/components/common/Container';
import { buttonClass } from '@/lib/buttonStyles';

export function NotFound() {
  return (
    <>
      <Seo title="Not Found" description="This page doesn't exist." path="/404" />
      <Container className="flex min-h-[70vh] flex-col items-center justify-center text-center">
        <p className="text-eyebrow text-gold-soft">404</p>
        <h1 className="mt-4 text-4xl text-ink sm:text-5xl">Lost in the universe</h1>
        <p className="mt-3 max-w-sm text-ink-muted">
          There's nothing orbiting at this address. Let's get you back on course.
        </p>
        <Link to="/" className={buttonClass('primary', 'mt-8')}>
          Back to Home
        </Link>
      </Container>
    </>
  );
}
