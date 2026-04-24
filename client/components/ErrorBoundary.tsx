import { Component, type ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * ErrorBoundary — catches rendering errors in child components.
 * Critical for wrapping 3D Canvas components that may crash
 * on devices without WebGL support or during GPU context loss.
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    if (import.meta.env.DEV) {
      console.error("[ErrorBoundary] Component crashed:", error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex items-center justify-center min-h-[200px] bg-white/[0.02] rounded border border-white/10">
          <div className="text-center space-y-2 p-8">
            <p className="text-sm text-white/60 font-sans">
              Something went wrong rendering this section.
            </p>
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              className="text-xs text-accent hover:text-white transition-colors font-sans underline"
            >
              Try again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
