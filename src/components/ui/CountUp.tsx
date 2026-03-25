"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
    to: number;
    duration?: number;
    suffix?: string;
    className?: string;
}

export default function CountUp({ to, duration = 1.4, suffix = "", className = "" }: Props) {
    const [value, setValue] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const started = useRef(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !started.current) {
                    started.current = true;
                    const start = performance.now();
                    const tick = (now: number) => {
                        const progress = Math.min((now - start) / (duration * 1000), 1);
                        // ease-out cubic
                        const eased = 1 - Math.pow(1 - progress, 3);
                        setValue(Math.round(eased * to));
                        if (progress < 1) requestAnimationFrame(tick);
                    };
                    requestAnimationFrame(tick);
                }
            },
            { threshold: 0.5 }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [to, duration]);

    return (
        <span ref={ref} className={className}>
            {value}{suffix}
        </span>
    );
}
