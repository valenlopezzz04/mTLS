const https = require('https');
const fs = require('fs');
const express = require('express');

const app = express();

// Opciones del servidor: clave, certificado, CA para validar cliente
const serverOptions = {
  key: fs.readFileSync('../servidor_key.pem'),           // Clave privada del servidor
  cert: fs.readFileSync('../servidor_cert.pem'),         // Certificado del servidor
  ca: fs.readFileSync('../ca.crt'),                       // CA para validar cliente
  requestCert: true,                                      // Exigir certificado del cliente
  rejectUnauthorized: true                                // Rechazar si no es válido
};

// Endpoint que responde al cliente con mTLS
app.get('/hola', (req, res) => {
  const clientCert = req.socket.getPeerCertificate();
  
  console.log('\n🔒 SERVIDOR recibió petición con mTLS');
  console.log('   Cliente CN:', clientCert.subject ? clientCert.subject.CN : 'Desconocido');
  console.log('   ✅ Petición validada\n');
  
  res.json({
    mensaje: 'Hola desde API Servidor (8080)',
    clienteCN: clientCert.subject ? clientCert.subject.CN : 'Desconocido',
    timestamp: new Date().toISOString()
  });
});


// Iniciar servidor HTTPS en puerto 8080
https.createServer(serverOptions, app).listen(8080, () => {
  console.log('✅ API SERVIDOR escuchando en https://localhost:8080 con mTLS');
  console.log('   Esperando peticiones de clientes con certificado...');
});
