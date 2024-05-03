// utils/rateLimit.ts
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

let ratelimit: Ratelimit | undefined;

export function initializeRateLimit() {
    ratelimit = new Ratelimit({
        redis: Redis.fromEnv(),
        limiter: Ratelimit.slidingWindow(250, "1 h"),
    });
}

export async function checkRateLimit(identifier: string) {
    const { success } = (await ratelimit?.limit(identifier)) ?? { success: true };
    return success;
}