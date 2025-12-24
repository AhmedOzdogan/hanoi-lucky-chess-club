import { useEffect, useRef, useState } from "react";

interface TimerRecord {
    elapsed: number;
    date: string;
}

const TIMER_KEY = "daily-puzzle-timer";

export function usePuzzleTimer(resetKey: number, running: boolean = true) {
    const [elapsed, setElapsed] = useState(0);
    const elapsedRef = useRef(0);

    // Load or reset timer
    useEffect(() => {
        const today = new Date().toISOString().split("T")[0];

        const raw = localStorage.getItem(TIMER_KEY);
        const stored: TimerRecord | null = raw ? JSON.parse(raw) : null;

        if (stored && stored.date === today) {
            setElapsed(stored.elapsed);
            elapsedRef.current = stored.elapsed;
        } else {
            setElapsed(0);
            elapsedRef.current = 0;
            localStorage.setItem(
                TIMER_KEY,
                JSON.stringify({ elapsed: 0, date: today })
            );
        }
    }, [resetKey]);

    // Run timer
    useEffect(() => {
        if (!running) return;

        const interval = setInterval(() => {
            setElapsed(prev => {
                const next = prev + 1;
                elapsedRef.current = next;
                return next;
            });
        }, 1000);

        return () => {
            clearInterval(interval);

            const today = new Date().toISOString().split("T")[0];
            localStorage.setItem(
                TIMER_KEY,
                JSON.stringify({
                    elapsed: elapsedRef.current,
                    date: today,
                })
            );
        };
    }, [running]);

    function resetTimer() {
        const today = new Date().toISOString().split("T")[0];
        elapsedRef.current = 0;
        setElapsed(0);
        localStorage.setItem(
            TIMER_KEY,
            JSON.stringify({ elapsed: 0, date: today })
        );
    }

    return { elapsed, resetTimer };
}