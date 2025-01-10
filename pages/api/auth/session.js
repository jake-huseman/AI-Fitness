import { getSession } from '@auth0/nextjs-auth0';

export default async function handler(req, res) {
  try {
    const session = await getSession(req, res);
    console.log('Session Debug:', session);

    if (!session) {
      return res.status(401).json({ error: 'No session found' });
    }

    res.status(200).json({ user: session.user });
  } catch (error) {
    console.error('Error fetching session:', error);
    res.status(500).json({ error: error.message });
  }
}