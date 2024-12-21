export async function POST(req) {
  try {
    console.log("[API /chat]: Request received");

    // Parse the incoming request body
    const { message } = await req.json();
    console.log("[API /chat]: Received message:", message);

    // Fireworks API configuration
    const apiEndpoint = "https://api.fireworks.ai/inference/v1/chat/completions";
    const payload = {
      model: "accounts/fireworks/models/llama-v3p2-3b-instruct",
      messages: [{ role: "user", content: message }],
    };

    console.log("[API /chat]: Sending request to Fireworks AI");
    console.log("[API /chat]: Payload:", JSON.stringify(payload));

    const response = await fetch(apiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.FIREWORKS_API_KEY}`,
      },
      body: JSON.stringify(payload),
    });

    // Check response status
    if (!response.ok) {
      const error = await response.json();
      console.error("[API /chat]: Fireworks API error:", error);
      throw new Error(`Fireworks API error: ${error.message}`);
    }

    const data = await response.json();
    console.log("[API /chat]: Fireworks API response:", data);

    // Return the AI response
    return new Response(JSON.stringify({ reply: data.choices[0].message.content }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("[API /chat]: Error occurred:", error);

    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
