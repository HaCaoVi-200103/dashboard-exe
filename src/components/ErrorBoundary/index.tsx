import React, { ReactNode } from "react";
import { ErrorBoundary as ReactErrorBoundary, FallbackProps } from "react-error-boundary";

interface ErrorBoundaryProps {
  children: ReactNode;
}

const ErrorFallback = ({ error }: FallbackProps) => {
  console.log(error);
  return (
    <div style={{ fontSize: "30px", fontWeight: 700 }}>Somthing wrong with page!!!</div>
  );
};

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => {
  return <ReactErrorBoundary FallbackComponent={ErrorFallback}>{children}</ReactErrorBoundary>;
};

export default ErrorBoundary;
