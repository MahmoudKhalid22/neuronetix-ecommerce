const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Ecommerce project for internship",
      description: "This is ecommerce project for one month internship",
      version: "1.0.0",
      contact: {
        name: "Mahmoud Khalid",
        url: "https://my-portfolio-khalid.netlify.app",
        email: "m.khalid.samra@gmail.com",
      },
    },
    servers: [{ url: "https://typa.onrender.com" }],
  },
  apis: ["./src/utils/*.js", "./src/model/*.js"],
};
const spaces = swaggerJsDoc(options);

function docs(app) {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(spaces));
}

module.exports = { docs };
