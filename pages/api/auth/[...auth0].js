import { handleAuth } from '@auth0/nextjs-auth0';

export default handleAuth({
  async callback(req, res) {
    try {
      console.log('Callback received...');
      await handleAuth().callback(req, res);
      console.log('Session successfully created');
    } catch (error) {
      console.error('Error during callback:', error);
      res.status(error.status || 500).end(error.message);
    }
  },
});