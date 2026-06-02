"use client";

import React, { useState, useEffect } from "react";
import { BootSequence } from "@/components/os/BootSequence";
import { Desktop } from "@/components/os/Desktop";

export default function Home() {
  const [isBooting, setIsBooting] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch by waiting for client mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="fixed inset-0 w-full h-full bg-black flex items-center justify-center font-mono text-xs text-white">
        Initializing bios channels...
      </div>
    );
  }

  return (
    <main className="relative w-screen h-screen overflow-hidden">
      {isBooting ? (
        <BootSequence onComplete={() => setIsBooting(false)} />
      ) : (
        <Desktop />
      )}
    </main>
  );
}
