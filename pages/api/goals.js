import { requireAuth } from "../../utils/auth";

export default requireAuth(async function handler(req, res) {
    try {
        if (req.method === "GET") {
            // Fetch user goals
            const goals = [
                { id: 1, title: "Lose 5 pounds", completed: false },
                { id: 2, title: "Run a 5K", completed: true },
            ];
            return res.status(200).json({ success: true, data: goals });
        } else if (req.method === "POST") {
            // Add a new goal
            const { title } = req.body;
            if (!title) {
                return res.status(400).json({ success: false, error: "Title is required" });
            }
            const newGoal = { id: Date.now(), title, completed: false };
            return res.status(201).json({ success: true, data: newGoal });
        } else {
            res.setHeader("Allow", ["GET", "POST"]);
            return res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    } catch (error) {
        console.error("Error in /api/goals:", error);
        return res.status(500).json({ success: false, error: error.message });
    }
});
