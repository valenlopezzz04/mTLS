
# Taller de comunicación entre APIs con mTLS

## Descripción breve

Este taller muestra cómo dos APIs (Cliente y Servidor) se comunican usando mutual TLS (mTLS) para asegurar la autenticación y confidencialidad en las peticiones.

***

## Tecnologías usadas

- Node.js y Express para construir las APIs.
- Comunicación HTTP y HTTPS.
- Mutual TLS con certificados y claves.
- Archivos `.p12` usados para almacenar claves y certificados.

***

## HTTP, HTTPS y mTLS

- **HTTP:** Postman hace la petición GET simple al API Cliente (puerto 8081).
- **HTTPS:** API Cliente se comunica con el API Servidor usando HTTPS cifrado.
- **mTLS:** Además del cifrado, cliente y servidor validan mutuamente sus certificados para garantizar confianza.

***

## Archivos .p12 y claves

- Los archivos `.p12` contienen la clave privada y el certificado para cada entidad (Servidor y Cliente).
- Claves usadas para los `.p12` en este taller son contraseñas específicas (por ejemplo, `serverpass`) al generar certificados.
- Node.js usa estos `.p12` para exportar archivos `.pem` que luego se usan en el código para la conexión mTLS.

***

## Flujo de comunicación

1. Postman envía petición HTTP al API Cliente (`http://localhost:8081/hola`).
2. Cliente recibe la petición y hace una petición HTTPS con mTLS al Servidor (`https://localhost:8080/hola`).
3. Servidor valida el certificado del Cliente y responde con JSON.
4. Cliente envía la respuesta final a Postman.

***


## Video

En el video se muestra el proceso completo, consola y Postman abiertos, y mostrando el correcto funcionamiento con certificados `.p12` y claves.

***

¿Quieres que te prepare este texto en formato markdown listo para pegar?
