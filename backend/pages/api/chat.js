export default async function handler(req, res) {
  if (req.method === "POST") {
    const { message } = req.body;

    const FIREWORKS_API_URL = "https://api.fireworks.ai/inference/v1/chat/completions";

    try {
      console.log("Incoming request to /api/chat");
      console.log("Message received:", message);
      console.log("API Endpoint:", FIREWORKS_API_URL);
      console.log("Using Fireworks API Key:", process.env.FIREWORKS_API_KEY.slice(0, 5) + "*****");

      const payload = {
        model: "accounts/fireworks/models/llama-v3p2-3b-instruct", // Replace with a valid model
        messages: [{ role: "user", content: message }],
      };
      

      console.log("Payload being sent to Fireworks.ai:", JSON.stringify(payload, null, 2));

      const response = await fetch(FIREWORKS_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.FIREWORKS_API_KEY}`,
        },
        body: JSON.stringify(payload),
      });

      // Log the response status and headers
      console.log("Response status from Fireworks.ai:", response.status);
      console.log(
        "Response headers from Fireworks.ai:",
        Object.fromEntries(response.headers.entries()) // Convert headers to an object for better readability
      );

      const responseText = await response.text();
      console.log("Response body from Fireworks.ai:", responseText);

      if (!response.ok) {
        throw new Error(`Fireworks API error: ${response.status} - ${responseText}`);
      }

      const data = JSON.parse(responseText);
      const reply = data.choices?.[0]?.message?.content || "No response from AI.";

      return res.status(200).json({ reply });
    } catch (error) {
      console.error("Error calling Fireworks.ai:", error.message);
      return res.status(500).json({
        error: "Failed to fetch response from Fireworks.ai.",
        details: error.message,
      });
    }
  }

  res.setHeader("Allow", ["POST"]);
  return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
}
