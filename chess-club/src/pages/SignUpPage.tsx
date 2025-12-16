import { useState } from "react"
import { FaEye, FaEyeSlash, FaUser, FaEnvelope, FaChess } from "react-icons/fa"
import ButtonPrimary from "../components/ButtonPrimary"
import ButtonSecondary from "../components/ButtonSecondary"

function SignUpPage() {
    const [step, setStep] = useState(1)
    const [showPassword, setShowPassword] = useState(false)

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
                                    className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-club-primary"
                                />
                            </div>

                            {/* Email */}
                            <div className="relative">
                                <FaEnvelope className="absolute left-3 top-3 text-club-dark/50" />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-club-primary"
                                />
                            </div>

                            {/* Password */}
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    className="w-full pl-3 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-club-primary"
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
                                    placeholder="Password again"
                                    className="w-full pl-3 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-club-primary"
                                />
                            </div>

                            <ButtonPrimary
                                label="Continue"
                                size="lg"
                                onClick={() => setStep(2)}
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
                                    className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-club-primary"
                                />
                            </div>

                            <div className="flex justify-between gap-3">
                                <ButtonSecondary
                                    label="Back"
                                    size="md"
                                    onClick={() => setStep(1)}
                                />
                                <ButtonPrimary
                                    label="Continue"
                                    size="md"
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