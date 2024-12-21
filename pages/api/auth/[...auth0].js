import { handleAuth } from "@auth0/nextjs-auth0";

console.log("Initializing Auth0 route handler in [...auth0].js");

export default function handler(req, res) {
  console.log(`[Auth0 API]: Received ${req.method} request at ${req.url}`);
  return handleAuth()(req, res);
}
