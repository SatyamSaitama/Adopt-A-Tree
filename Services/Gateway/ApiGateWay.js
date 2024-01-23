// apigateway.js
const express = require('express');
const httpProxy = require('http-proxy');

const app = express();
const port = 3000;
const authenticateToken = require('../middleware/AuthMiddleWare');

const userProxy = httpProxy.createProxyServer({ target: 'http://localhost:3001' });
const treeProxy = httpProxy.createProxyServer({ target: 'http://localhost:3002' });
const produceProxy = httpProxy.createProxyServer({ target: 'http://localhost:3003' });
app.all('/user/*',authenticateToken, (req, res) => {

  try {
    userProxy.web(req, res);
  } catch (error) {
    console.error(error);
  }
 
});

app.all('/tree/*',authenticateToken,  (req, res) => {
  try {
    treeProxy.web(req, res);
  } catch (error) {
    console.error(error);
  }
}
  );


app.all('/production/*',authenticateToken,  (req, res) => {
  try {
    produceProxy.web(req, res);
  } catch (error) {
    console.error("hello error");
  }

})


module.exports = app;