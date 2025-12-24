import { useEffect, useState } from "react";

interface AttemptRecord {
    date: string;
    attempts: number;
}

const ATTEMPT_KEY = "daily-puzzle-attempts-record";

function useAttempt() {
    const [attempts, setAttempts] = useState<number>(0);

    // Load attempts once on mount
    useEffect(() => {
        const stored = localStorage.getItem(ATTEMPT_KEY);
        const today = new Date().toISOString().split("T")[0];

        if (!stored) {
            localStorage.setItem(
                ATTEMPT_KEY,
                JSON.stringify({ date: today, attempts: 0 } as AttemptRecord)
            );
            return;
        }

        const record: AttemptRecord = JSON.parse(stored);

        if (record.date === today) {
            setAttempts(record.attempts);
        } else {
            localStorage.setItem(
                ATTEMPT_KEY,
                JSON.stringify({ date: today, attempts: 0 } as AttemptRecord)
            );
            setAttempts(0);
        }
    }, []);

    function incrementAttempt() {
        setAttempts(prev => {
            const next = prev + 1;

            localStorage.setItem(
                ATTEMPT_KEY,
                JSON.stringify({
                    date: new Date().toISOString().split("T")[0],
                    attempts: next,
                } as AttemptRecord)
            );

            return next;
        });
    }

    function resetAttempts() {
        const today = new Date().toISOString().split("T")[0];

        setAttempts(0);
        localStorage.setItem(
            ATTEMPT_KEY,
            JSON.stringify({ date: today, attempts: 0 } as AttemptRecord)
        );
    }

    return { attempts, incrementAttempt, resetAttempts };
}

export default useAttempt;