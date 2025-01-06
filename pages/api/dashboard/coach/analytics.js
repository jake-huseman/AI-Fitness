export default function handler(req, res) {
    if (req.method === 'GET') {
      const analyticsData = {
        userEngagement: 75,
        retentionRate: 85,
        activeUsers: 150,
      };
      res.status(200).json(analyticsData);
    } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
  