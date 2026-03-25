"use client";

import { useEffect, useState } from "react";

interface Props {
    words: string[];
    speed?: number;       // ms per character
    deleteSpeed?: number; // ms per character when deleting
    pause?: number;       // ms to pause after full word
    className?: string;
}

export default function TypeWriter({
    words,
    speed = 80,
    deleteSpeed = 40,
    pause = 1800,
    className = "",
}: Props) {
    const [display, setDisplay] = useState("");
    const [wordIdx, setWordIdx] = useState(0);
    const [typing, setTyping] = useState(true);
    const [blink, setBlink] = useState(true);

    // Cursor blink
    useEffect(() => {
        const id = setInterval(() => setBlink((b) => !b), 530);
        return () => clearInterval(id);
    }, []);

    // Typing logic
    useEffect(() => {
        const current = words[wordIdx % words.length];

        if (typing) {
            if (display.length < current.length) {
                const id = setTimeout(() => setDisplay(current.slice(0, display.length + 1)), speed);
                return () => clearTimeout(id);
            } else {
                const id = setTimeout(() => setTyping(false), pause);
                return () => clearTimeout(id);
            }
        } else {
            if (display.length > 0) {
                const id = setTimeout(() => setDisplay(display.slice(0, -1)), deleteSpeed);
                return () => clearTimeout(id);
            } else {
                setWordIdx((i) => i + 1);
                setTyping(true);
            }
        }
    }, [display, typing, wordIdx, words, speed, deleteSpeed, pause]);

    return (
        <span className={className}>
            {display}
            <span
                className="ml-0.5 inline-block w-[2px] align-middle"
                style={{
                    height: "1.1em",
                    background: "var(--accent)",
                    opacity: blink ? 1 : 0,
                    transition: "opacity 0.1s",
                }}
            />
        </span>
    );
}
