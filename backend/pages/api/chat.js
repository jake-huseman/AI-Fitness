export default function handler(req, res) {
  if (req.method === "POST") {
    const { message } = req.body;

    // Mock response
    const aiResponse = `You said: "${message}". This is a mock reply.`;

    return res.status(200).json({ reply: aiResponse });
  }

  // Return 405 for unsupported methods
  res.setHeader("Allow", ["POST"]);
  res.status(405).json({ error: `Method ${req.method} Not Allowed` });
}
