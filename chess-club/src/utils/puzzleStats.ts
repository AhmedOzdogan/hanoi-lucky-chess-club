import { supabasePersistent } from "./supabaseClient";
import type { ChessLeaderboardEntry } from
    "../components/ChessboardComps/ChessLeaderboard";

export function getPuzzleStats(puzzleDate: string) {
    return supabasePersistent
        .from("daily_puzzle_solves")
        .select(`
            user_id,
            puzzle_date,
            time_seconds,
            attempt,
            solved_at,
            profiles (
                username
            )
            
        `)
        .eq("puzzle_date", puzzleDate)
        .order('attempt', { ascending: true },)
        .order('time_seconds', { ascending: true },)
        .returns<ChessLeaderboardEntry[]>();
}

export function updatePuzzleStats(user_id: string, puzzle_date: string, time_seconds: number, attempt: number) {
    // Update puzzle statistics in Supabase
    return supabasePersistent
        .from("daily_puzzle_solves")
        .upsert({ user_id, puzzle_date, time_seconds, attempt });
}

