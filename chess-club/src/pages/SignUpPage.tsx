import { useState, useEffect } from "react"
import { FaEye, FaEyeSlash, FaUser, FaEnvelope, FaChess } from "react-icons/fa"
import ButtonPrimary from "../components/ButtonPrimary"
import ButtonSecondary from "../components/ButtonSecondary"
import Loading from "../components/Loading"
import { useEmailValidation } from "../hooks/useEmailValidation"
import validatePassword from "../utils/validatePassword"
import { useChessUser } from "../hooks/useChessUser"

function SignUpPage() {
    // Step State
    const [step, setStep] = useState(2)


    // Show Password State
    const [showPassword, setShowPassword] = useState(false)

    // Username - Email - Password State
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordAgain, setPasswordAgain] = useState("")




    // we will validate the email 
    const { status, validateEmail, reset } = useEmailValidation()

    // Step 1 - States
    const [state1ButtonDisabled, setState1ButtonDisabled] = useState(false)
    const [wrongPasswordAgain, setWrongPasswordAgain] = useState(false)
    const [invalidPassword, setInvalidPassword] = useState(false)

    useEffect(() => {
        if (status === 'error') {
            setState1ButtonDisabled(true)
        } else if (status === 'loading') {
            setState1ButtonDisabled(true)
        } else if (status === 'success') {
            setTimeout(() => { setStep(2) }, 1000); // proceed to next step after 1 second
        }
    }, [status])

    useEffect(() => {
        //first validate the password strength
        if (!validatePassword(password)) {
            setState1ButtonDisabled(true)
            setInvalidPassword(true)
        } else if (validatePassword(password) && password !== "") {
            setInvalidPassword(false)
            setState1ButtonDisabled(false)
        }

        //then check for password match
        const isMismatch = passwordAgain !== password

        setWrongPasswordAgain(isMismatch)
        setState1ButtonDisabled(isMismatch)
    }, [passwordAgain, password])



    //Step 2 - Chess User Hook
    const { status: chessStatus, checkUser, reset: resetChessUser, profile, stats } = useChessUser()
    const [state2ButtonDisabled, setState2ButtonDisabled] = useState(false)

    // Chess.com Username State
    const [chessUsername, setChessUsername] = useState("")

    useEffect(() => {
        resetChessUser()
    }, [chessUsername])

    useEffect(() => {
        if (chessStatus === 'loading' || chessStatus === 'error' || chessUsername.trim() === '') {
            setState2ButtonDisabled(true)
        } else if (chessStatus === 'success') {
            setState2ButtonDisabled(false)
        } else {
            setState2ButtonDisabled(false)
        }
    }, [chessStatus, chessUsername])




    return (
        <div className="min-h-screen flex items-center justify-center bg-club-light">
            <div className="w-full max-w-md bg-white border border-club-dark/20 rounded-2xl shadow-lg p-8">

                {/* STEP INDICATOR */}
                {/* STEP PROGRESS */}
                <div className="flex items-center mb-8">

                    {/* Step 1 */}
                    <div
                        className={`
                        w-8 h-8 flex items-center justify-center rounded-full font-semibold
                        ${step >= 1
                                ? "bg-club-primary text-club-dark"
                                : "bg-club-dark/20 text-club-dark/50"}
                        `}
                    >
                        1
                    </div>

                    {/* Bar 1 → 2 */}
                    <div
                        className={`
                        flex-1 h-1 mx-2 rounded
                        ${step > 1 ? "bg-club-primary" : "bg-club-dark/20"}
                        `}
                    />

                    {/* Step 2 */}
                    <div
                        className={`
                        w-8 h-8 flex items-center justify-center rounded-full font-semibold
                        ${step >= 2
                                ? "bg-club-primary text-club-dark"
                                : "bg-club-dark/20 text-club-dark/50"}
                        `}
                    >
                        2
                    </div>

                    {/* Bar 2 → 3 */}
                    <div
                        className={`
                        flex-1 h-1 mx-2 rounded
                        ${step > 2 ? "bg-club-primary" : "bg-club-dark/20"}
                        `}
                    />

                    {/* Step 3 */}
                    <div
                        className={`
                        w-8 h-8 flex items-center justify-center rounded-full font-semibold
                        ${step >= 3
                                ? "bg-club-primary text-club-dark"
                                : "bg-club-dark/20 text-club-dark/50"}
                        `}
                    >
                        3
                    </div>

                </div>

                {/* STEP 1 */}
                {step === 1 && (
                    <>
                        <h1 className="text-2xl font-bold text-center text-club-dark mb-6">
                            Create Account
                        </h1>

                        <div className="flex flex-col gap-4">

                            {/* Username */}
                            <div className="relative">
                                <FaUser className="absolute left-3 top-3 text-club-dark/50" />
                                <input
                                    type="text"
                                    placeholder="Username"
                                    onChange={(e) => setUsername(e.target.value)}
                                    value={username}
                                    className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-club-primary"
                                />
                            </div>

                            {/* Email */}
                            <div className="relative">
                                {/* Left icon */}
                                <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-club-dark/50" />

                                {/* Input */}
                                <input
                                    type="email"
                                    placeholder="Email"
                                    onChange={(e) => {
                                        setEmail(e.target.value)
                                        reset()
                                    }}
                                    value={email}
                                    className="
                                    w-full
                                    pl-10
                                    pr-10
                                    py-2
                                    border
                                    rounded-lg
                                    focus:ring-2
                                    focus:ring-club-primary
                                    "
                                />

                                {/* Right status indicator */}
                                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                    <Loading state={status} size="sm" />
                                </div>
                            </div>

                            {/* Password */}
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                    placeholder="Password"
                                    className={`w-full pl-3 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-club-primary ${wrongPasswordAgain || (invalidPassword && password !== "") ? "border-red-500 border-4 focus:invisible" : ""}`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-2 top-3.5 text-club-dark/60"
                                >
                                    {showPassword ? <FaEyeSlash className="" /> : <FaEye />}
                                </button>
                            </div>

                            {/* Password Again */}
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    onChange={(e) => setPasswordAgain(e.target.value)}
                                    value={passwordAgain}
                                    placeholder="Password again"
                                    className="w-full pl-3 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-club-primary"
                                />
                            </div>

                            <ButtonPrimary
                                label={status === "loading" ? "Loading..." : "Continue"}
                                size="lg"
                                onClick={() => { validateEmail(email); if (status === "success") setStep(2); }}
                                disabled={state1ButtonDisabled}
                            />
                        </div>
                    </>
                )}

                {/* STEP 2 */}
                {step === 2 && (
                    <>
                        <h1 className="text-2xl font-bold text-center text-club-dark mb-6">
                            Chess Profile
                        </h1>

                        <div className="flex flex-col gap-4">
                            <div className="relative">
                                <FaChess className="absolute left-3 top-3 text-club-dark/50" />
                                <input
                                    type="text"
                                    placeholder="Chess.com username"
                                    value={chessUsername}
                                    onChange={(e) => setChessUsername(e.target.value)}
                                    className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-club-primary"
                                />
                                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                    <Loading state={chessStatus} size="sm" />
                                </div>
                            </div>
                            {chessStatus === "success" && (
                                <div className="mt-4 w-full rounded-xl border border-green-200 bg-club-secondary p-4 shadow-sm">

                                    {/* Header */}
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-club-primary text-white font-bold">
                                            ✓
                                        </div>
                                        <div>
                                            <p className="font-bold text-club-dark">
                                                Chess.com user found
                                            </p>
                                            <p className="text-2xl font-bold text-club-dark/70">
                                                {profile?.username}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Ratings */}
                                    <div className="grid grid-cols-3 gap-3 text-center">

                                        <div className="rounded-lg bg-white p-3 border">
                                            <p className="text-xs text-club-dark/60">Blitz</p>
                                            <p className="text-lg font-semibold text-club-dark">
                                                {stats?.chess_blitz?.last?.rating ?? "—"}
                                            </p>
                                        </div>

                                        <div className="rounded-lg bg-white p-3 border">
                                            <p className="text-xs text-club-dark/60">Bullet</p>
                                            <p className="text-lg font-semibold text-club-dark">
                                                {stats?.chess_bullet?.last?.rating ?? "—"}
                                            </p>
                                        </div>

                                        <div className="rounded-lg bg-white p-3 border">
                                            <p className="text-xs text-club-dark/60">Rapid</p>
                                            <p className="text-lg font-semibold text-club-dark">
                                                {stats?.chess_rapid?.last?.rating ?? "—"}
                                            </p>
                                        </div>

                                    </div>
                                </div>
                            )}
                            <div className="flex justify-between gap-1 w-full">
                                <ButtonSecondary
                                    label="Back"
                                    size="sm"
                                    onClick={() => setStep(1)}
                                />
                                <ButtonPrimary
                                    label={chessStatus === "loading" ? "Checking..." : chessStatus === "success" ? "continue" : "Check"}
                                    size="sm"
                                    disabled={state2ButtonDisabled}
                                    onClick={chessStatus === "success" ? () => setStep(3) : () => checkUser(chessUsername)}
                                />
                                <ButtonSecondary
                                    label="Skip"
                                    size="sm"
                                    onClick={() => setStep(3)}
                                />
                            </div>
                        </div>
                    </>
                )}

                {/* STEP 3 */}
                {step === 3 && (
                    <>
                        <h1 className="text-2xl font-bold text-center text-club-dark mb-4">
                            Verify Your Email
                        </h1>

                        <p className="text-center text-club-dark/70 mb-6">
                            We’ve sent a verification link to your email address.
                            <br />
                            Please check your inbox.
                        </p>

                        <div className="flex flex-col gap-3">
                            <ButtonPrimary label="Resend Email" size="md" />
                            <ButtonSecondary
                                label="Back"
                                size="md"
                                onClick={() => setStep(2)}
                            />
                        </div>
                    </>
                )}

            </div>
        </div>
    )
}

export default SignUpPage