'use client';

import { Component, ErrorInfo, ReactNode } from 'react';

/**
 * ErrorBoundary - Catches JavaScript errors in child components
 *
 * Features:
 * - Catches render errors and lifecycle errors
 * - Provides fallback UI
 * - Logs errors for debugging
 * - Allows recovery via reset
 *
 * @example
 * ```tsx
 * <ErrorBoundary fallback={<ErrorFallback />}>
 *   <GameBoy />
 * </ErrorBoundary>
 * ```
 */

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  onReset?: () => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log error for debugging
    console.error('ErrorBoundary caught an error:', error, errorInfo);

    // Call optional error callback
    this.props.onError?.(error, errorInfo);
  }

  handleReset = (): void => {
    this.setState({ hasError: false, error: null });
    this.props.onReset?.();
  };

  render(): ReactNode {
    if (this.state.hasError) {
      // Custom fallback or default
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="p-6 bg-slate-900/80 border border-red-500/30 rounded-xl backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center">
              <svg
                className="w-5 h-5 text-red-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Une erreur s&apos;est produite</h3>
              <p className="text-sm text-slate-400">Quelque chose s&apos;est mal passé</p>
            </div>
          </div>

          {this.state.error && (
            <div className="mb-4 p-3 bg-slate-800/50 rounded-lg overflow-x-auto">
              <code className="text-xs text-red-300 font-mono">
                {this.state.error.message}
              </code>
            </div>
          )}

          <button
            onClick={this.handleReset}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg transition-colors"
          >
            Réessayer
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * GameErrorFallback - Specific fallback for game components
 */
interface GameErrorFallbackProps {
  onRetry?: () => void;
}

export function GameErrorFallback({ onRetry }: GameErrorFallbackProps) {
  return (
    <div className="w-[320px] h-[540px] md:w-[340px] md:h-[580px] bg-[#c4c4b4] rounded-[24px] rounded-br-[70px] shadow-2xl flex items-center justify-center">
      <div className="text-center p-8">
        <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-slate-700 mb-2">Erreur de jeu</h3>
        <p className="text-sm text-slate-500 mb-4">
          Le jeu a rencontré un problème
        </p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white text-sm font-medium rounded-lg transition-colors"
          >
            Recharger
          </button>
        )}
      </div>
    </div>
  );
}
