"use client";

import Tilt from "react-parallax-tilt";
import Image from "next/image";

export default function ProfileTilt() {
  return (
    <Tilt
      tiltMaxAngleX={10}
      tiltMaxAngleY={12}
      glareEnable
      glareMaxOpacity={0.15}
      glareColor="#00F5D4"
      scale={1.02}
      className="relative"
    >
      <div className="relative h-[280px] w-[280px] rounded-3xl border border-white/10 bg-white/5 backdrop-blur p-3">
        <div className="absolute -inset-1 rounded-3xl opacity-60 blur-xl"
          style={{
            background:
              "radial-gradient(circle at 30% 20%, rgba(255,183,3,.35), transparent 55%), radial-gradient(circle at 70% 70%, rgba(0,245,212,.22), transparent 55%)",
          }}
        />
        <div className="relative h-full w-full overflow-hidden rounded-2xl">
          <Image
            src="/profile.jpg"
            alt="Refat"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </Tilt>
  );
}