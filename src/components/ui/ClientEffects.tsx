"use client";

import dynamic from "next/dynamic";
import BackToTop from "@/components/ui/BackToTop";
import KeyboardHints from "@/components/ui/KeyboardHints";
import BootLoader from "@/components/ui/BootLoader";

const ScrollProgress = dynamic(() => import("@/components/ui/ScrollProgress"), { ssr: false });
const FloatingParticles = dynamic(() => import("@/components/ui/FloatingParticles"), { ssr: false });

export default function ClientEffects() {
    return (
        <>
            <BootLoader />
            <ScrollProgress />
            <FloatingParticles />
            <BackToTop />
            <KeyboardHints />
        </>
    );
}
