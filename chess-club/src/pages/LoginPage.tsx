import { useState } from "react"
import { FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa"
import ButtonPrimary from "../components/ButtonPrimary"
import ButtonSecondary from "../components/ButtonSecondary"

function LoginPage() {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <div className="min-h-screen flex items-center justify-center bg-club-light">
            <div className="w-full max-w-md bg-white border border-club-dark/20 rounded-2xl shadow-lg p-8">

                {/* Title */}
                <h1 className="text-3xl font-bold text-center text-club-dark mb-2">
                    Welcome Back
                </h1>
                <p className="text-center text-club-dark/70 mb-8">
                    Log in to your account
                </p>

                {/* Form */}
                <form className="flex flex-col gap-4">

                    {/* Email */}
                    <div className="relative">
                        <FaEnvelope className="absolute left-3 top-3 text-club-dark/50" />
                        <input
                            type="email"
                            placeholder="Email"
                            className="
                w-full
                pl-10
                pr-3
                py-2
                border
                rounded-lg
                focus:outline-none
                focus:ring-2
                focus:ring-club-primary
              "
                        />
                    </div>

                    {/* Password */}
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            className="
                w-full
                pl-3
                pr-10
                py-2
                border
                rounded-lg
                focus:outline-none
                focus:ring-2
                focus:ring-club-primary
              "
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-2.5 text-club-dark/60"
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-3 mt-6">
                        <ButtonPrimary label="Login" size="lg" />
                        <ButtonSecondary label="Forgot password?" size="md" />
                    </div>

                </form>
            </div>
        </div>
    )
}

export default LoginPage