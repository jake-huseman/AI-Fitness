// Utility functions for API calls

export async function fetchFromAPI(endpoint, method = "GET", body = null, headers = {}) {
    try {
        const response = await fetch(endpoint, {
            method,
            headers: {
                "Content-Type": "application/json",
                ...headers,
            },
            body: body ? JSON.stringify(body) : null,
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.status} - ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error in fetchFromAPI:", error);
        throw error;
    }
}
