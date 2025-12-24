import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import useAttempt from "../hooks/useAttempt";
import { useUser } from "../hooks/useUser";
import { usePuzzleTimer } from "../hooks/usePuzzleTimer";
import fetchDailyPuzzle from "../hooks/useFetchPuzzle";

import ChessBoard from "../components/ChessBoard";
import ChessLoading from "../components/ChessboardComps/ChessLoading";
import ChessLeaderboard from "../components/ChessboardComps/ChessLeaderboard";
import type { ChessLeaderboardEntry } from "../components/ChessboardComps/ChessLeaderboard";

import {
    initPuzzleEngine,
    tryPuzzleMove,
    type PuzzleEngine,
} from "../utils/puzzleEngine";

import { getPuzzleStats, updatePuzzleStats } from "../utils/puzzleStats";
import { toastError, toastSuccess, toastInfo } from "../utils/toastUtils";

function ChessPuzzle() {
    const navigate = useNavigate();

    // User information
    const user = useUser();
    const userId = user.user?.id ?? null;

    //Allow moves only if user has not played today

    const [movesEnabled, setMovesEnabled] = useState(true);

    // Daily puzzle data
    const { puzzle, loading, error } = fetchDailyPuzzle();

    // Puzzle engine reference
    const engineRef = useRef<PuzzleEngine | null>(null);

    // Board position
    const [fen, setFen] = useState("");

    // Board orientation
    const [boardOrientation, setBoardOrientation] =
        useState<"white" | "black">("white");

    // Timer reset trigger
    const [resetKey, setResetKey] = useState(0);

    // Elapsed time
    const { elapsed } = usePuzzleTimer(resetKey, movesEnabled);

    // Displayed time
    const displayElapsed = movesEnabled
        ? elapsed
        : user.puzzleStats?.time_seconds;

    // Attempts counter
    const { attempts, incrementAttempt } = useAttempt();

    //Displayed attempts
    const displayAttempts = movesEnabled
        ? attempts
        : user.puzzleStats?.attempt;

    // Leaderboard data
    const [puzzleStats, setPuzzleStats] = useState<ChessLeaderboardEntry[]>([]);

    // Leaderboard loading state
    const [statsLoading, setStatsLoading] = useState(true);

    // Leaderboard error state
    const [statsError, setStatsError] = useState<string | null>(null);

    // Today’s puzzle date
    const puzzleDate = new Date().toISOString().slice(0, 10);


    // Redirect if user is not logged in
    useEffect(() => {
        if (!user.loading && !userId) {
            toastError("You must be logged in to access the daily puzzle.");
            navigate("/login");
        }
    }, [user.loading, userId, navigate]);

    // Notify if user has already played today
    useEffect(() => {
        if (!user.loading && user.puzzleStats) {
            toastInfo("You have already played today's puzzle. Come back tomorrow!");
            setMovesEnabled(false);
            console.log("Moves disabled because user has already played today.");
        }
    }, [user.loading, user.puzzleStats]);


    // Initialize puzzle engine when puzzle loads
    useEffect(() => {
        if (!puzzle) return;

        engineRef.current = initPuzzleEngine(
            puzzle.game.pgn,
            puzzle.puzzle.solution
        );

        const initialFen = engineRef.current.chess.fen();
        setFen(initialFen);

        const turn = engineRef.current.chess.turn();
        setBoardOrientation(turn === "w" ? "black" : "white");

        const timer = setTimeout(() => {
            if (!engineRef.current) return;

            const { from, to, promotion } = engineRef.current.lastMove;

            engineRef.current.chess.move({
                from,
                to,
                promotion: promotion ?? "q",
            });

            setFen(engineRef.current.chess.fen());
        }, 1000);

        return () => clearTimeout(timer);
    }, [puzzle]);

    // Reset timer when puzzle changes
    useEffect(() => {
        if (!puzzle?.puzzle?.id) return;
        setResetKey(prev => prev + 1);
    }, [puzzle?.puzzle?.id]);

    // Fetch leaderboard stats
    useEffect(() => {
        setStatsLoading(true);
        setStatsError(null);

        (async () => {
            try {
                const { data, error } = await getPuzzleStats(puzzleDate);

                if (error) {
                    setStatsError(error.message);
                    return;
                }

                setPuzzleStats(data || []);
            } catch (err: any) {
                setStatsError(err.message);
            } finally {
                setStatsLoading(false);
            }
        })();
    }, [puzzleDate]);

    // Handle user move on the board
    const handleMove = (from: string, to: string) => {
        if (!engineRef.current) return false;
        if (from === to) return false;

        const result = tryPuzzleMove(engineRef.current, from, to);

        if (!result.ok && !result.wrong) return false;

        if (result.wrong) {
            if (result.previewFen) {
                setFen(result.previewFen);
            }

            setTimeout(() => {
                setFen(result.fen);
                toastError("Wrong move for the puzzle. Try another move.");
                incrementAttempt();
            }, 500);

            return false;
        }

        setFen(result.fen);

        if (result.pendingOpponentMove) {
            setTimeout(() => {
                if (!engineRef.current || !result.pendingOpponentMove) return;

                const { from, to, promotion } = result.pendingOpponentMove;

                engineRef.current.chess.move({
                    from,
                    to,
                    promotion: promotion ?? "q",
                });

                setFen(engineRef.current.chess.fen());
            }, 500);
        }

        if (result.finished) {
            toastSuccess("Puzzle solved! Well done.");

            if (userId) {
                updatePuzzleStats(userId, puzzleDate, elapsed, attempts)
                    .then(({ error }) => {
                        if (error) {
                            console.error("Error updating puzzle stats:", error);
                        }
                    });
            }

            return true;
        }

        return true;
    };

    // Loading screen
    if (loading || user.loading) {
        return (
            <div className="grow">
                <ChessLoading
                    text="Loading puzzle" />
            </div>
        );
    }

    // Stop render if user is missing
    if (!user.user) return null;

    // Error state
    if (error) return <div>Error: {error}</div>;

    // Wait until board is ready
    if (!fen) return null;

    return (
        <div className="grow flex flex-col items-center">
            <div className="w-full max-w-5xl mx-auto mt-6 mb-8">
                <div className="relative flex justify-center">
                    <div className="flex items-center gap-3 bg-club-primary/20 px-8 py-4 rounded-xl border border-black/20 shadow-md">
                        <h1 className="text-2xl font-semibold tracking-wide">
                            Daily Chess Puzzle - Rating : {puzzle?.puzzle.rating}
                        </h1>
                    </div>
                </div>
            </div>

            <div className="flex w-full max-w-270 justify-center items-start gap-12 mx-auto">
                <div className="flex justify-center">
                    <ChessBoard
                        fen={fen}
                        onMove={handleMove}
                        boardOrientation={boardOrientation}
                        movesEnabled={movesEnabled}
                    />
                </div>
                <div className="w-full max-w-md flex flex-col gap-4">

                    {statsLoading && (
                        <div className="text-sm text-gray-500 text-center">
                            Loading leaderboard…
                        </div>
                    )}

                    {statsError && (
                        <div className="text-sm text-red-500 text-center">
                            {statsError}
                        </div>
                    )}

                    {!statsLoading && !statsError && (
                        <ChessLeaderboard
                            user_id={userId}
                            data={puzzleStats}
                            time={displayElapsed}
                            attempts={displayAttempts}
                            statsLoading={statsLoading}
                            statsError={statsError}
                            displayElapsed={displayElapsed}
                            displayAttempts={displayAttempts}
                            movesEnabled={movesEnabled} />
                    )}
                </div>
            </div>
        </div>
    );
}

export default ChessPuzzle;