import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { GoogleLoginButton } from "@/components/auth/GoogleLoginButton";
import { LoadingSpinner } from "@/components/LoadingSpinner";

const AuthPage = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user && !loading) navigate("/app", { replace: true });
  }, [user, loading, navigate]);

  if (loading) return <LoadingSpinner />;

  return (
    <AuthLayout>
      <div className="space-y-4">
        <GoogleLoginButton isLoading={isLoading} onLoadingChange={setIsLoading} />
      </div>
    </AuthLayout>
  );
};

export default AuthPage;
