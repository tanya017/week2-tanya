// PURPOSE: Catch errors from lazy-loaded components and show a friendly
// message instead of crashing the whole app.
 
import { Component } from 'react';
import type{ ErrorInfo, ReactNode } from 'react';
// import type{ Component, ErrorInfo, ReactNode } from 'react';
//                 ^         ^          ^
//                 |         |          ReactNode = anything React can render
//                 |         ErrorInfo  = the error's component stack trace
//                 Component = the base class for all React class components
 
interface ErrorBoundaryProps {
  children:  ReactNode;  // the content to protect
  fallback?: ReactNode;  // optional: a custom error UI to show
                         // if not provided, the default error box is used
}
 
interface ErrorBoundaryState {
  hasError: boolean;    // true = something crashed, show error UI
  error:    Error | null; // the actual error object (or null when healthy)
}
 
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
 
  constructor(props: ErrorBoundaryProps) {
    super(props);  // REQUIRED: always call super(props) first
    this.state = {
      hasError: false,  // start healthy — no errors yet
      error: null,
    };
  }
 
  // React calls this automatically when a child component throws an error.
  // 'static' means it belongs to the class itself, not one instance.
  // It receives the error and must return new state values.
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error: error,
    };
  }
 
  // React calls this after getDerivedStateFromError.
  // In production you would send this to an error monitoring service.
  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('[ErrorBoundary caught an error]', error, info.componentStack);
  }
 
  render() {
    // Has an error happened?
    if (this.state.hasError === true) {
 
      // If caller gave us a custom error UI, show that instead
      if (this.props.fallback) {
        return this.props.fallback;
      }
 
      // Pull out the error message — or use a generic fallback text
      var errorMessage = this.state.error
        ? this.state.error.message
        : 'An unexpected error occurred.';
 
      return (
        <div style={{
          padding: 24,
          border: '1px solid #FCA5A5',
          borderRadius: 8,
          background: '#FEF2F2',
          color: '#991B1B',
        }}>
          <h3 style={{ marginTop: 0 }}>⚠️ Something went wrong</h3>
          <p style={{ fontSize: 14 }}>{errorMessage}</p>
          <button
            onClick={() => {
              // Reset state back to healthy — React will re-try rendering children
              this.setState({ hasError: false, error: null });
            }}
            style={{
              padding: '6px 14px',
              border: '1px solid #FCA5A5',
              borderRadius: 4,
              background: '#fff',
              cursor: 'pointer',
              color: '#991B1B',
            }}
          >
            Try Again
          </button>
        </div>
      );
    }
 
    // No error: just render the children normally
    return this.props.children;
  }
}
 
export default ErrorBoundary;
