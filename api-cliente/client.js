const https = require('https');
const http = require('http');
const fs = require('fs');
const express = require('express');

const app = express();

// Endpoint: Postman envía petición aquí
app.get('/hola', async (req, res) => {
  console.log('\n CLIENTE recibió petición de Postman en /hola');
  
  try {
    // Crear agente HTTPS con certificado del cliente para mTLS
    const httpsAgent = new https.Agent({
      key: fs.readFileSync('../cliente_key.pem'),       // Clave privada del cliente
      cert: fs.readFileSync('../cliente_cert.pem'),     // Certificado del cliente
      ca: fs.readFileSync('../ca.crt'),                 // CA para validar servidor
      rejectUnauthorized: true                          // Validar certificado del servidor
    });

    console.log(' CLIENTE enviando petición a Servidor con mTLS...');

    // Hacer petición a API Servidor con mTLS
    const options = {
      hostname: 'localhost',
      port: 8080,
      path: '/hola',
      method: 'GET',
      agent: httpsAgent
    };

    const req_servidor = https.request(options, (res_servidor) => {
      let data = '';

      res_servidor.on('data', (chunk) => {
        data += chunk;
      });

      res_servidor.on('end', () => {
        const respuesta = JSON.parse(data);
        console.log('CLIENTE recibió respuesta del Servidor:', respuesta);
        
        // Devolver al cliente (Postman) la respuesta del servidor
        res.json({
          mensajeDelCliente: 'API Cliente procesó tu petición',
          respuestaDelServidor: respuesta,
          timestamp: new Date().toISOString()
        });
      });
    });

    req_servidor.on('error', (e) => {
      console.error('ERROR al conectar con Servidor:', e.message);
      res.status(500).json({ 
        error: 'No se pudo conectar al servidor',
        detalles: e.message
      });
    });

    req_servidor.end();

  } catch (err) {
    console.error(' Error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// Iniciar servidor HTTP en puerto 8081
http.createServer(app).listen(8081, () => {
  console.log('API CLIENTE escuchando en http://localhost:8081');
  console.log('   GET http://localhost:8081/hola (envía petición al Servidor con mTLS)');
});
