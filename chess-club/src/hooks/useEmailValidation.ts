import { useState } from "react"
import supabase from "../utils/supabase"
import { toastError } from "../utils/toastUtils"

type StatusState = "idle" | "loading" | "success" | "error"

export function useEmailValidation() {
    const [status, setStatus] = useState<StatusState>("idle")

    const validateEmail = async (email: string) => {
        if (!email) return

        setStatus("loading")

        try {
            const { data, error } = await supabase.functions.invoke(
                "email_check",
                {
                    body: { email },
                }
            )

            if (error) {
                toastError("Error validating email. Please try again later.")
                setStatus("error")
                console.log(status)
                return
            }

            if (data?.valid === true) {
                setStatus("success")
            } else {
                toastError("Invalid email address. Please check and try again.")
                setStatus("error")
            }
        } catch (err) {
            toastError("An unexpected error occurred during email validation.")
            setStatus("error")
        }
    }

    const reset = () => {
        setStatus("idle")
    }

    return {
        status,
        validateEmail,
        reset,
    }
}