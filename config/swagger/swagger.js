import swaggerJSdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

//metadata
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Jabones Vegan",
      version: "1.0.0",
      description: "API para la venta de jabones",
    },
    apis: ["config/routes/*.js"] //llama a todas las routes
  }
}

//docs en JSON format
const swaggerSpec = swaggerJSDoc(options);

//Function to setup our docs
const swaggerDocs = (app, port) => {
  const docsPath = '/api/v1/docs';
  app.use(docsPath, swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get(`${docsPath}.json`, (req, res) => {
    res.setHeader('Content-Type','application/json')
    res.send(swaggerSpec);
  });
  console.log(`Version 1.0.0 Docs are available at http://localhost:${port}${docsPath}`);
}
module.exports = { swaggerDocs };


/*servers: [
  {
    url: "http://localhost:3000/api/v1",
  },
],
},
 
};

app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

export default (app) => {
app.use(
"/api/v1/docs", // url donde estaran disponibles los docs
swaggerUi.serve,
swaggerUi.setup(specs, {
  explorer: true,
  customCssUrl:
    "https://cdn.jsdelivr.net/npm/swagger-ui-themes@3.0.0/themes/3.x/theme-monokai.css",
})
);
};*/

