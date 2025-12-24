import { useRef, useEffect } from "react";

// Types for leaderboard rows coming from the database
export interface ChessLeaderboardEntry {
    user_id: string;
    puzzle_date: string;
    time_seconds: number;
    attempt: number;
    solved_at: string;
    profiles: {
        username: string;
    };
}

// Props passed into the leaderboard component
interface ChessLeaderboardProps {
    user_id?: string | null;
    time: number;
    attempts?: number;
    statsLoading?: boolean;
    statsError?: string | null;
    displayElapsed: number;
    displayAttempts: number;
    movesEnabled: boolean;
    data: ChessLeaderboardEntry[];
}

// Renders the daily puzzle leaderboard
function ChessLeaderboard({
    user_id,
    data,
    statsLoading,
    statsError,
    displayElapsed,
    displayAttempts,
    movesEnabled,
}: ChessLeaderboardProps) {
    // it is sorted from database query
    const leaderboard = data;

    // Controls how many rows around the user are shown
    const WINDOW = 5;
    const total = leaderboard.length;

    const userIndex = leaderboard.findIndex(
        (entry) => entry.user_id === user_id
    );

    // Always keep top 3
    const topRows = leaderboard.slice(0, 3);

    let visibleRows: ChessLeaderboardEntry[] = [];

    // CASE 1: User not found → fallback top 10
    if (userIndex === -1) {
        visibleRows = leaderboard.slice(0, 10);
    }

    // CASE 2: User is in top 3 → show top 10
    else if (userIndex < 3) {
        visibleRows = leaderboard.slice(0, 10);

        // if user is last 5 in the →list show last 10
    } else if (userIndex >= total - WINDOW) {
        let tempVisibleRows = leaderboard.slice(Math.max(total - 10, 0), total);
        visibleRows = [...topRows, ...tempVisibleRows]
    }

    // CASE 3: User is NOT in top 3 → top 3 or last 5 + user ± 5
    else {
        const start = Math.max(userIndex - WINDOW, 3);
        const end = Math.min(userIndex + WINDOW + 1, total);

        const middleRows = leaderboard.slice(start, end);
        visibleRows = [...topRows, ...middleRows];
    }

    // Refs are used to auto-scroll to the current user
    const containerRef = useRef<HTMLDivElement | null>(null);
    const userRowRef = useRef<HTMLDivElement | null>(null);

    // Centers the current user row on render/update
    useEffect(() => {
        if (userRowRef.current) {
            userRowRef.current.scrollIntoView({
                behavior: "smooth",
                block: "center", // 👈 centers vertically
            });
        }
    }, [user_id]);


    console.log('visibleRows final', visibleRows);

    return (
        <div className="mb-6 w-full max-w-2xl mx-auto">
            <div className="bg-club-light/60 border border-black/20 rounded-2xl p-6 shadow-lg">

                {/* ===== Your Stats ===== */}
                <div className="mb-6 p-4 ">
                    <p className="mb-3 text-lg font-bold text-center">Your Stats</p>

                    {!movesEnabled && (
                        <p className="mb-4 text-sm text-center text-gray-700">
                            You’ve already completed today’s puzzle. Come back tomorrow!
                        </p>
                    )}

                    <div className="flex justify-center gap-6">
                        <div className="flex flex-col gap-1 px-6 py-3 rounded-xl border border-black/20 bg-[#f3e7c4] shadow-sm w-40">
                            <span className="text-xs uppercase text-gray-600 text-left">
                                Time Elapsed
                            </span>
                            <span className="font-mono text-lg font-semibold self-center">
                                {Math.floor(displayElapsed / 60)}:
                                {String(displayElapsed % 60).padStart(2, "0")}
                            </span>
                        </div>

                        <div className="flex flex-col gap-1 px-6 py-3 rounded-xl border border-black/20 bg-[#f3e7c4] shadow-sm w-40">
                            <span className="text-xs uppercase text-gray-600 text-left">
                                Total Mistakes
                            </span>
                            <span className="font-mono text-lg font-bold self-center">
                                {displayAttempts}
                            </span>
                        </div>
                    </div>
                </div>

                {/* ===== Leaderboard ===== */}
                <h2 className="text-lg font-semibold mb-4 text-center">
                    Daily Leaderboard
                </h2>

                {statsLoading && (
                    <p className="text-center text-sm text-gray-500">
                        Loading leaderboard…
                    </p>
                )}

                {statsError && (
                    <p className="text-center text-sm text-red-500">
                        {statsError}
                    </p>
                )}

                {leaderboard.length === 0 && !statsLoading && (
                    <div className="bg-[#ead9ad] rounded-lg px-4 py-3 text-sm text-center shadow-inner">
                        No solves yet. Be the first!
                    </div>
                )}

                {/* Enables vertical scrolling only */}
                <div
                    ref={containerRef}
                    className="flex flex-col gap-2 max-h-70 overflow-y-auto overflow-x-hidden">
                    {visibleRows.map((entry, index) => {
                        const isCurrentUser = user_id === entry.user_id;

                        return (
                            // Marks the current user row for scrolling
                            <div
                                ref={isCurrentUser ? userRowRef : null}
                                key={entry.solved_at}
                                className={`flex items-center gap-4 rounded-lg px-4 py-3 text-sm shadow-inner border
                                        ${isCurrentUser
                                        ? "bg-club-secondary font-semibold border-black scale-[1.02]"
                                        : "bg-[#ead9ad] border-black/10"
                                    }`}
                            >
                                {/* Rank */}
                                <div className="w-6 text-center font-semibold">
                                    {leaderboard.findIndex((e) => e.user_id === entry.user_id) + 1}
                                </div>

                                {/* Username */}
                                <div
                                    className={`flex-1 truncate ${isCurrentUser ? "text-center" : ""
                                        }`}
                                >
                                    {entry.profiles.username}
                                </div>

                                {/* Time */}
                                <div className="w-16 text-right font-mono">
                                    {Math.floor(entry.time_seconds / 60)}:
                                    {String(entry.time_seconds % 60).padStart(2, "0")}
                                </div>

                                {/* Attempts */}
                                <div className="w-20 text-right text-gray-700">
                                    {entry.attempt} tries
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default ChessLeaderboard;