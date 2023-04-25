const express = require('express');
require('dotenv').config()
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

const apiProxy = createProxyMiddleware('/api/coordinate', {
  target: 'https://api.timezonedb.com/v2.1',
  changeOrigin: true,
  pathRewrite: (path, req) => {
    const { lat, lng } = req.query;
    return `/get-time-zone?key=${process.env.TIMEZONEDB_API_KEY}&format=json&by=position&lat=${lat}&lng=${lng}`;
  },
});

// Agrega el middleware del proxy a la aplicación de Express
app.use('/api/coordinate', apiProxy);

// Inicia el servidor
app.listen(3000, () => {
  console.log('El servidor está escuchando en el puerto 3000');
});

