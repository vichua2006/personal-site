"use client";

import { useState } from "react";
import Sidebar from "src/components/Sidebar";
import Spotlight from "src/components/Spotlight";
import Footer from "src/components/Footer";

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const [isLightOn, updateIsLightOn] = useState(false);

  return (
    <div className="flex min-h-dvh flex-col">
      <div className="flex flex-1">
        <div className="hidden md:block">
          <Spotlight isLightOn={isLightOn} updateIsLightOn={updateIsLightOn} />
        </div>
        <Sidebar />
        <main className="flex-1 mx-10 md:mx-[30%] mt-30 p-4">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
}
