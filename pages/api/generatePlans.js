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
  
    const prompt = `
  Create a personalized fitness and meal plan for ${firstName} ${lastName}.
  Details:
  - Fitness Level: ${fitnessLevel}
  - Diet Preference: ${dietPreference}
  - Additional Goals: ${additionalGoals}
  
  Provide a detailed fitness plan and a meal plan.
  `;
  
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4",
          messages: [{ role: "user", content: prompt }],
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || "Failed to fetch from OpenAI API");
      }
  
      const data = await response.json();
      const generatedContent = data.choices[0].message.content.split("\n\n");
  
      const generatedFitnessPlan = generatedContent[0] || "Fitness plan could not be generated.";
      const generatedMealPlan = generatedContent[1] || "Meal plan could not be generated.";
  
      res.status(200).json({
        generatedFitnessPlan,
        generatedMealPlan,
      });
    } catch (error) {
      console.error("Error generating plans:", error.message);
      res.status(500).json({ error: error.message || "Failed to generate plans. Please try again." });
    }
  }
  