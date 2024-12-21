export async function POST(req) {
    try {
      const { preferences, goals } = await req.json();
  
      // Fireworks API configuration
      const response = await fetch("https://api.fireworks.ai/inference/v1/plans", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.FIREWORKS_API_KEY}`,
        },
        body: JSON.stringify({
          model: "accounts/fireworks/models/fitness-planner",
          preferences,
          goals,
        }),
      });
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(`Fireworks API error: ${error.message}`);
      }
  
      const data = await response.json();
      return new Response(JSON.stringify(data), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  }
  