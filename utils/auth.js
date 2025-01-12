// Utility functions for authentication

import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";

// Get the current user's session
export async function getUserSession(req, res) {
    try {
        const session = await getSession(req, res);
        if (!session || !session.user) {
            throw new Error("User not authenticated");
        }
        return session.user;
    } catch (error) {
        console.error("Error fetching user session:", error);
        throw error;
    }
}

// API route wrapper to enforce authentication
export function requireAuth(handler) {
    return withApiAuthRequired(handler);
}
