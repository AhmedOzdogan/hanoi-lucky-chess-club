import { toast } from "react-toastify";
import { supabasePersistent } from "./supabaseClient";

export async function checkUsernameAvailable(username: string): Promise<boolean> {
    const { data, error } = await supabasePersistent
        .from("profiles")
        .select("username")
        .eq("username", username)
        .maybeSingle();

    if (error) {
        toast.error(`Error checking username availability: ${error.message}`);
        return false;
    }

    if (data) {
        toast.error("Username is not available. Please choose another one.");
        return false;
    }

    return true;
}