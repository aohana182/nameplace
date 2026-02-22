import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@supabase/supabase-js";

interface UserMenuProps {
  user: User;
  onSignOut: () => void;
}

export const UserMenu = ({ user, onSignOut }: UserMenuProps) => {
  const getUserInitials = () => {
    if (user?.user_metadata?.full_name) {
      return user.user_metadata.full_name
        .split(' ')
        .map((name: string) => name[0])
        .join('')
        .toUpperCase();
    }
    return user?.email?.[0]?.toUpperCase() || 'U';
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 md:h-8 md:w-8 rounded-full touch-manipulation">
          <Avatar className="h-10 w-10 md:h-8 md:w-8">
            <AvatarImage src={user.user_metadata?.avatar_url} alt={user.email || ''} />
            <AvatarFallback className="bg-blue-100 text-blue-600">
              {getUserInitials()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-64 md:w-56 bg-white border shadow-lg z-[9999]"
        align="end"
        forceMount
        side="bottom"
        sideOffset={12}
      >
        <div className="flex items-center justify-start gap-2 p-3 md:p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {user.user_metadata?.full_name && (
              <p className="font-medium text-base md:text-sm">{user.user_metadata.full_name}</p>
            )}
            <p className="w-[220px] md:w-[200px] truncate text-sm text-muted-foreground">
              {user.email}
            </p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={onSignOut}
          className="cursor-pointer hover:bg-gray-100 p-3 md:p-2 min-h-[44px] touch-manipulation"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span className="text-base md:text-sm">Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
