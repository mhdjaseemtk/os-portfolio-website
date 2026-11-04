"use client";

import React, { useState } from "react";
import Image from "next/image";
import { cn } from "../lib/utils";
import { useContent } from "../context/content-context";

const Avatar: React.FC<{ className?: string }> = ({ className }) => {
  const { initials } = useContent().profile;
  const [error, setError] = useState(false);

  return (
    <div
      className={cn(
        "relative shrink-0 rounded-full overflow-hidden bg-gradient-to-b from-[#38bdf8] to-[#0a84ff] flex items-center justify-center text-white font-medium tracking-wide shadow-sm",
        className
      )}
    >
      {!error ? (
        <Image
          src="/jaseem-portrait.jpg"
          alt="Muhammad Jaseem"
          fill
          sizes="96px"
          className="object-cover"
          onError={() => setError(true)}
        />
      ) : (
        initials
      )}
    </div>
  );
};

export default Avatar;
