import { ReactNode } from "react";
import { MapPin } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface AuthLayoutProps {
  children: ReactNode;
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-border shadow-xl">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2.5 mb-4">
            <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center">
              <MapPin className="h-5 w-5 text-primary-foreground" />
            </div>
            <h1 className="font-serif text-2xl font-bold text-foreground">NamePlace</h1>
          </div>
          <CardTitle className="font-serif">Welcome back</CardTitle>
          <CardDescription>
            Sign in to continue managing your places
          </CardDescription>
        </CardHeader>
        <CardContent>
          {children}
        </CardContent>
      </Card>
    </div>
  );
};
