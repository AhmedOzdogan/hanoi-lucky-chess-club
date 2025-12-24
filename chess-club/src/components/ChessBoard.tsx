import { useMemo } from "react";
import { Chessboard, type PieceDropHandlerArgs } from "react-chessboard";
import { Chess } from "chess.js";

interface ChessBoardProps {
    fen?: string;
    onMove: (from: string, to: string) => boolean;
    boardOrientation?: "white" | "black";
    movesEnabled?: boolean;
}

function isValidFen(fen: string) {
    try {
        new Chess(fen);
        return true;
    } catch {
        return false;
    }
}

function ChessBoard({ fen, onMove, boardOrientation, movesEnabled = true }: ChessBoardProps) {
    if (!fen || !isValidFen(fen)) {
        return null;
    }

    const options = useMemo(() => ({
        position: fen,

        onPieceDrop: ({ sourceSquare, targetSquare }: PieceDropHandlerArgs) => {
            if (!targetSquare) return false;


            return onMove(sourceSquare, targetSquare);
        },

        boardStyle: {
            borderRadius: "6px",
            boxShadow: "0 5px 15px rgba(0,0,0,0.5)",
        },

        animationDuration: 1000,
        allowDragging: movesEnabled,
        boardOrientation: boardOrientation ?? "white",
        allowDrawingArrows: true,
        animationDurationInMs: 400,
        onSquareClick: () => { },

    }), [fen, onMove, boardOrientation]);

    return <Chessboard options={options} />;
}

export default ChessBoard;