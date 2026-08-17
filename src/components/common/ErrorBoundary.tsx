import { Component, type ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    // Intentionally no stack traces surfaced to the user.
    console.error('Unhandled application error:', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
          <p className="text-eyebrow text-gold">Something went wrong</p>
          <h1 className="text-3xl text-ink">This part of the universe hit an error.</h1>
          <p className="max-w-md text-ink-muted">
            Try reloading the page. If the problem continues, head back home.
          </p>
          <a
            href="/"
            className="mt-2 rounded-full border border-hairline px-5 py-2 text-sm text-ink transition-colors hover:border-gold-soft hover:text-gold-soft"
          >
            Back to Home
          </a>
        </div>
      );
    }

    return this.props.children;
  }
}
