export default function handler(req, res) {
    if (req.method === 'GET') {
      // list of users
      const users = [
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
      ];
      res.status(200).json(users);
    } else if (req.method === 'POST') {
      const { name, email } = req.body;
      if (!name || !email) {
        res.status(400).json({ error: 'Name and email are required' });
      } else {
        // Example user creation
        const newUser = { id: Date.now(), name, email };
        res.status(201).json(newUser);
      }
    } else {
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
  