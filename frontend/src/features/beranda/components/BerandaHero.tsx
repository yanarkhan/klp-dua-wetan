"use client";

import Image from "next/image";
import FloatingCTACard from "./FloatingCTACard";

export default function BerandaHero() {
  return (
    <div className="flex flex-col pb-10 -mt-8">
      <section
        className="
          relative z-0 
          w-full 
          h-[320px] md:h-[520px] 
          overflow-hidden 
          shadow-sm bg-gray-100
          
          rounded-t-none
          rounded-b-[3rem]
          md:rounded-none
        "
      >
        <div className="absolute inset-0">
          <Image
            src="/images/hero/hero-authenticated.png"
            alt="Latar Belakang Kantor Pelayanan"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/10" />
        </div>
      </section>

      <section className="relative z-10 -mt-32 md:-mt-40 px-4 flex justify-center">
        <FloatingCTACard />
      </section>
    </div>
  );
}
