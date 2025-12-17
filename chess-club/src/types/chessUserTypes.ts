export interface ChessStreamingPlatform {
    type: "twitch" | "youtube" | string
    channel_url: string
}

export interface ChessUser {
    /** API resource ID */
    "@id": string

    /** Avatar image URL */
    avatar?: string

    /** Country API URL */
    country: string

    /** Number of followers */
    followers: number

    /** Whether user is a streamer */
    is_streamer: boolean

    /** Unix timestamp (seconds) */
    joined: number

    /** Unix timestamp (seconds) */
    last_online: number

    /** League name (e.g. Legend) */
    league?: string

    /** User-provided location */
    location?: string

    /** Full display name */
    name?: string

    /** Internal Chess.com player ID */
    player_id: number

    /** Account status */
    status: "premium" | "basic" | string

    /** Streaming platforms */
    streaming_platforms?: ChessStreamingPlatform[]

    /** Chess title */
    title?: "GM" | "IM" | "FM" | "CM" | "WGM" | "WIM" | "WFM" | "WCM"

    /** Twitch profile URL */
    twitch_url?: string

    /** Public profile URL */
    url: string

    /** Username (lowercase) */
    username: string

    /** Verified account */
    verified: boolean
}