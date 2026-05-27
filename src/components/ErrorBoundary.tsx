import { Component, type ErrorInfo, type ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  /** Optional custom fallback. Receives the error and a reset callback. */
  fallback?: (error: Error, reset: () => void) => ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * Catches render errors in its subtree and displays a friendly fallback
 * instead of letting the app crash to a blank screen.
 *
 * Usage (in main.tsx or any layout):
 *   <ErrorBoundary>
 *     <App />
 *   </ErrorBoundary>
 *
 * Optionally provide a custom fallback:
 *   <ErrorBoundary fallback={(err, reset) => <MyErrorUI err={err} onRetry={reset} />}>
 *     <App />
 *   </ErrorBoundary>
 */
export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    // Log to your monitoring service here (e.g. Sentry, Datadog)
    console.error('[ErrorBoundary] Uncaught render error:', error);
    console.error('[ErrorBoundary] Component stack:', info.componentStack);
  }

  private handleReset = (): void => {
    this.setState({ hasError: false, error: null });
  };

  render(): ReactNode {
    if (this.state.hasError && this.state.error) {
      if (this.props.fallback) {
        return this.props.fallback(this.state.error, this.handleReset);
      }

      // ── Default fallback UI ─────────────────────────────────────────────
      return (
        <div
          className="min-h-screen flex items-center justify-center p-6"
          style={{ background: 'linear-gradient(160deg, #B8874A 0%, #8B6530 50%, #6B4D24 100%)' }}
        >
          <div className="max-w-md w-full text-center">
            {/* Decorative icon */}
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-white/10 flex items-center justify-center">
              <svg className="w-8 h-8 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            </div>

            <h1 className="font-heading font-bold text-white text-2xl mb-3">
              Something went wrong
            </h1>
            <p className="font-body text-white/60 text-sm mb-8 leading-relaxed">
              An unexpected error occurred. Please try again, or contact us if the problem persists.
            </p>

            <button
              onClick={this.handleReset}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-navy font-heading font-semibold text-sm rounded-full hover:bg-white/90 hover:scale-[1.02] active:scale-[0.98] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#6B4D24]"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
              </svg>
              Try Again
            </button>

            <p className="font-body text-white/25 text-xs mt-8">
              If this keeps happening, email{' '}
              <a href="mailto:info@tnrsolutions.co.in" className="text-white/40 underline hover:text-white/60 transition-colors">
                info@tnrsolutions.co.in
              </a>
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
