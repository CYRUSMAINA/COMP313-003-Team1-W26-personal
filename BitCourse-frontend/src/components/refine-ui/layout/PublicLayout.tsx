// src/components/refine-ui/layout/PublicLayout.tsx
import { PropsWithChildren } from "react";

export function PublicLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      {children}
    </div>
  );
}

PublicLayout.displayName = "PublicLayout";