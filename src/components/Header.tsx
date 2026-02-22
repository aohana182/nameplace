import { useAuth } from "@/contexts/AuthContext";
import { HeaderLogo } from "./header/HeaderLogo";
import { UserMenu } from "./header/UserMenu";

export const Header = () => {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      // Error handled by auth context
    }
  };

  return (
    <header className="bg-background/80 backdrop-blur-lg border-b border-border/50 px-4 py-3 relative z-50">
      <div className="flex items-center justify-between min-h-[56px]">
        <HeaderLogo />
        {user ? (
          <UserMenu user={user} onSignOut={handleSignOut} />
        ) : (
          <div className="text-sm text-muted-foreground">Not signed in</div>
        )}
      </div>
    </header>
  );
};
