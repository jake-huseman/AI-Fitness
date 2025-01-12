export default async function handler(req, res) {
    if (req.method === "POST") {
      const userInput = req.body;
  
      try {
        // Call the AI API with user input
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-4", // Replace with a valid AI model
            messages: [
              { role: "system", content: "You are a professional fitness coach." },
              { role: "user", content: JSON.stringify(userInput) },
            ],
          }),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          const fitnessPlan = data.choices[0].message.content.split("Meal Plan:")[0];
          const mealPlan = data.choices[0].message.content.split("Meal Plan:")[1];
          res.status(200).json({ fitnessPlan, mealPlan });
        } else {
          res.status(response.status).json({ error: data.error.message });
        }
      } catch (error) {
        console.error("AI Error:", error);
        res.status(500).json({ error: "Failed to generate plans." });
      }
    } else {
      res.setHeader("Allow", ["POST"]);
      res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }
  }
  