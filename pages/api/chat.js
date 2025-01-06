export default async function handler(req, res) {
    if (req.method === "POST") {
      try {
        const { message } = req.body;
        const response = await fetch("https://api.fireworks.ai/inference/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.FIREWORKS_API_KEY}`,
          },
          body: JSON.stringify({
            model: "accounts/fireworks/models/llama-v2-7b-chat",
            messages: [{ role: "user", content: message }],
          }),
        });
        const data = await response.json();
        res.status(200).json({ reply: data.choices[0].message.content });
      } catch (error) {
        console.error("Error with chat API:", error);
        res.status(500).json({ error: error.message });
      }
    } else {
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
  