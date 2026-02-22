interface LoadingSpinnerProps {
  message?: string;
}

export const LoadingSpinner = ({ message = "Loading..." }: LoadingSpinnerProps) => {
  return (
    <div className="h-screen w-full bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-10 w-10 border-2 border-primary border-t-transparent mx-auto mb-4"></div>
        <p className="text-muted-foreground text-sm">{message}</p>
      </div>
    </div>
  );
};
