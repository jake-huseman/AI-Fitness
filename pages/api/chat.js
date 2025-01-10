export default async function handler(req, res) {
  if (req.method === "POST") {
    const { message } = req.body;

    const FIREWORKS_API_URL = "https://api.fireworks.ai/inference/v1/chat/completions";

    try {
      console.log("[Chat API]: Incoming message:", message);

      const payload = {
        model: "accounts/fireworks/models/llama-v3p2-3b-instruct",
        messages: [{ role: "user", content: message }],
      };

      console.log("[Chat API]: Payload being sent:", JSON.stringify(payload, null, 2));

      const response = await fetch(FIREWORKS_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.FIREWORKS_API_KEY}`,
        },
        body: JSON.stringify(payload),
      });

      console.log("[Chat API]: Fireworks API response status:", response.status);

      const responseBody = await response.text();
      console.log("[Chat API]: Fireworks API response body:", responseBody);

      // Parse the response body
      const data = JSON.parse(responseBody);

      // Validate the response structure
      if (
        !data.choices ||
        !Array.isArray(data.choices) ||
        !data.choices[0] ||
        !data.choices[0].message ||
        !data.choices[0].message.content
      ) {
        console.error("[Chat API]: Invalid response format from Fireworks API", data);
        throw new Error("Invalid response format from Fireworks API");
      }

      const reply = data.choices[0].message.content;
      console.log("[Chat API]: AI reply:", reply);

      return res.status(200).json({ reply });
    } catch (error) {
      console.error("[Chat API]: Error occurred:", error.message);
      return res.status(500).json({
        error: "Failed to fetch response from Fireworks AI.",
        details: error.message,
      });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
