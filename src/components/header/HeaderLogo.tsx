import { MapPin } from "lucide-react";

export const HeaderLogo = () => {
  return (
    <div className="flex items-center gap-2.5">
      <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
        <MapPin className="h-4 w-4 text-primary-foreground" />
      </div>
      <h1 className="font-serif text-lg font-semibold text-foreground">NamePlace</h1>
    </div>
  );
};
