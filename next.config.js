const fs = require("fs");
const path = require("path");

module.exports = {
  async rewrites() {
    console.log("Registered API routes:");
    const appPath = path.join(__dirname, "app/api");
    const routes = fs
      .readdirSync(appPath, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name);
    console.log(routes);
    return [];
  },
  env: {
    AUTH0_SECRET: process.env.AUTH0_SECRET,
    AUTH0_BASE_URL: process.env.AUTH0_BASE_URL,
    AUTH0_ISSUER_BASE_URL: process.env.AUTH0_ISSUER_BASE_URL,
    AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
    AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET,
  },
};
