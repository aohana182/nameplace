import { MapPin } from "lucide-react";

export const HeaderLogo = () => {
  return (
    <div className="flex items-center space-x-2">
      <MapPin className="h-6 w-6 text-blue-600" />
      <h1 className="text-xl font-semibold text-gray-900">NamePlace</h1>
    </div>
  );
};
