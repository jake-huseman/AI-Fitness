import { requireAuth } from "../../utils/auth";

export default requireAuth(async function handler(req, res) {
    try {
        if (req.method === "GET") {
            // Fetch fitness or meal plans
            const plans = [
                { id: 1, type: "Fitness", description: "Full-body workout for beginners" },
                { id: 2, type: "Meal", description: "7-day high-protein meal plan" },
            ];
            return res.status(200).json({ success: true, data: plans });
        } else {
            res.setHeader("Allow", ["GET"]);
            return res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    } catch (error) {
        console.error("Error in /api/plans:", error);
        return res.status(500).json({ success: false, error: error.message });
    }
});
