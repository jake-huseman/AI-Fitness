import { requireAuth } from "../../utils/auth";

export default requireAuth(async function handler(req, res) {
    try {
        if (req.method === "GET") {
            // Fetch user progress data
            const progress = {
                workoutsCompleted: 12,
                caloriesBurned: 5000,
                weightChange: -3,
            };
            return res.status(200).json({ success: true, data: progress });
        } else {
            res.setHeader("Allow", ["GET"]);
            return res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    } catch (error) {
        console.error("Error in /api/progress:", error);
        return res.status(500).json({ success: false, error: error.message });
    }
});
