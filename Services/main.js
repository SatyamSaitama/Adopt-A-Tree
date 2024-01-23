const app = require('./Gateway/ApiGateWay'); 
const YAML = require('yamljs'); 
const swaggerUi = require('swagger-ui-express');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
const port = 3000;

app.listen(port, () => {
  console.log(`API Gateway listening at http://localhost:${port}`);
});
