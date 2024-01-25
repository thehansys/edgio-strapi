// Strapi requires uploads folder to exist
const { mkdirSync } = require("fs");
mkdirSync("public/uploads");

const strapi = require('@strapi/strapi');
strapi({
  port: process.env.PORT || 1337,
}).start()
