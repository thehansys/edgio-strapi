# 🚀 Deploy Strapi to Edgio

This guide will help you
set up new Strapi app with Edgio using nodejs-connector.

1. Create new basic Strapi app:
```
npx create-strapi-app@latest edgio-strapi
cd edgio-strapi
```

2. Install all dependencies and Edgio
```
npm i
npm i -D @edgio/cli @edgio/core @edgio/nodejs-connector
```

3. Create `server.js` file with following content:
```
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
```

4. Create `routes.js` file with following content:
```
import { Router } from '@edgio/core'
import { connectorRoutes } from '@edgio/connectors'

export default new Router().use(connectorRoutes)

```
5. Create `edgio.config.js` file with following content:
```
import { Router } from '@edgio/core'
import { connectorRoutes } from '@edgio/connectors'
export default new Router().use(connectorRoutes)

Create edgio.config.js file:
module.exports = {
  connector: '@edgio/nodejs-connector',
  nodejsConnector: {
    buildFolder: "",
    entryFile: "server.js",
    staticFolder: "public",
    envPort: "PORT",
    buildCommand: "npx strapi build",
    devCommand: "npx strapi develop",
    devReadyMessageOrTimeout: 0
  },
  purgeCacheOnDeploy: true,
  serverless: {
    includeNodeModules: true,
    include: [
      '.env',
      'api/**/*',
      'build/**/*',
      'config/**/*',
      'database/**/*',
      'public/**/*',
    ],
  },
}
```

6. Run following command to build you app:
```
npx edgio build
```

7. Test it locally:
```
npx edgio run -p
```

8. Deploy
```
npx edgio deploy
```
