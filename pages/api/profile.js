import clientPromise from '../../utils/db';

export default async function handler(req, res) {
    try {
        const client = await clientPromise;
        const db = client.db('your-database-name');

        if (req.method === 'GET') {
            const users = await db.collection('users').find({}).toArray();
            res.status(200).json(users);
        } else {
            res.setHeader('Allow', ['GET']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database connection failed.' });
    }
}
