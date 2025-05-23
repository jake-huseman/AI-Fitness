export default async function handler(req, res) {
    if (req.method !== "POST") {
      res.status(405).json({ error: "Method not allowed" });
      return;
    }
  
    const { OPENAI_API_KEY } = process.env;
  
    if (!OPENAI_API_KEY) {
      res.status(500).json({ error: "OpenAI API Key not configured" });
      return;
    }
  
    const { firstName, lastName, fitnessLevel, dietPreference, additionalGoals } = req.body;
  
    if (!firstName || !lastName || !fitnessLevel || !dietPreference) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }
  
    const fitnessPrompt = `
  Create a detailed weekly fitness plan for ${firstName} ${lastName}.
  Details:
  - Fitness Level: ${fitnessLevel}
  - Additional Goals: ${additionalGoals || "None"}
  
  Provide a structured plan with a day-by-day breakdown including cardio, strength training, flexibility exercises, and rest days.
  `;
  
    const mealPrompt = `
  Create a personalized meal plan for ${firstName} ${lastName}.
  Details:
  - Diet Preference: ${dietPreference}
  - Additional Goals: ${additionalGoals || "None"}
  
  Provide meal ideas for breakfast, lunch, dinner, and snacks with specific ingredients or options for variety.
  `;
  
    try {
      // Fetch fitness plan
      const fitnessResponse = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4",
          messages: [{ role: "user", content: fitnessPrompt }],
        }),
      });
  
      const fitnessData = await fitnessResponse.json();
      if (!fitnessResponse.ok) {
        throw new Error(fitnessData.error?.message || "Failed to fetch fitness plan");
      }
  
      const fitnessPlan = fitnessData.choices[0]?.message.content.trim();
  
      // Fetch meal plan
      const mealResponse = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4",
          messages: [{ role: "user", content: mealPrompt }],
        }),
      });
  
      const mealData = await mealResponse.json();
      if (!mealResponse.ok) {
        throw new Error(mealData.error?.message || "Failed to fetch meal plan");
      }
  
      const mealPlan = mealData.choices[0]?.message.content.trim();
  
      res.status(200).json({
        fitnessPlan,
        mealPlan,
      });
    } catch (error) {
      console.error("Error generating plans:", error.message);
      res.status(500).json({ error: error.message });
    }
  }
  