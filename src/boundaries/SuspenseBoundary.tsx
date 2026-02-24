import { Suspense } from 'react';
import type { ReactNode } from 'react';
import ErrorBoundary from './ErrorBoundary';
 
interface SuspenseBoundaryProps {
  children:       ReactNode;  // the lazy component to render
  fallback:       ReactNode;  // what to show WHILE loading
  errorFallback?: ReactNode;  // what to show IF it fails (optional)
}
 
const SuspenseBoundary: React.FC<SuspenseBoundaryProps> = ({
  children,
  fallback,
  errorFallback,
}) => {
  return (
    // ErrorBoundary is on the OUTSIDE
    // → it catches errors from BOTH Suspense and the lazy component inside
    <ErrorBoundary fallback={errorFallback}>
 
      {/* Suspense is on the INSIDE */}
      {/* → it catches the 'loading' state while the chunk downloads */}
      <Suspense fallback={fallback}>
        {children}
      </Suspense>
 
    </ErrorBoundary>
  );
};
 
export default SuspenseBoundary;
