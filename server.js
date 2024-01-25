const { mkdirSync, existsSync } = require("fs");
const uploadsDir = "public/uploads"

// Strapi requires uploads folder to exist
if(!existsSync(uploadsDir)){
  mkdirSync(uploadsDir);
}

// Start Strapi server
const strapi = require('@strapi/strapi');
strapi({
  port: process.env.PORT || 1337,
}).start()
