import {
    FaCheckCircle,
    FaTimesCircle,
    FaRegCircle,
} from "react-icons/fa"
import { ImSpinner2 } from "react-icons/im"

type StatusState = "idle" | "loading" | "success" | "error"
type StatusSize = "sm" | "md" | "lg"

interface StatusIndicatorProps {
    state: StatusState
    size?: StatusSize
}

const sizeClasses: Record<StatusSize, string> = {
    sm: "text-xl",
    md: "text-3xl",
    lg: "text-5xl",
}

function StatusIndicator({
    state,
    size = "md",
}: StatusIndicatorProps) {
    return (
        <div className="flex items-center justify-center">
            {/* NOT STARTED */}
            {state === "idle" && (
                <FaRegCircle
                    className={`text-club-dark/40 ${sizeClasses[size]}`}
                />
            )}

            {/* LOADING */}
            {state === "loading" && (
                <ImSpinner2
                    className={`animate-spin text-club-primary ${sizeClasses[size]}`}
                />
            )}

            {/* SUCCESS */}
            {state === "success" && (
                <FaCheckCircle
                    className={`text-green-500 ${sizeClasses[size]}`}
                />
            )}

            {/* ERROR */}
            {state === "error" && (
                <FaTimesCircle
                    className={`text-red-500 ${sizeClasses[size]}`}
                />
            )}
        </div>
    )
}

export default StatusIndicator