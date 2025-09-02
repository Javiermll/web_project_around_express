# Guía de configuración del proyecto web_project_around_express

## 1. Estructura del proyecto
- Se creó la carpeta `web_project_around_express` con subcarpetas `backend` y `frontend`.
- En `backend` se añadieron las carpetas `routes` y `data` para organizar rutas y archivos JSON.

## 2. Inicialización del proyecto
- Se ejecutó `npm init` para crear el archivo `package.json` y definir los campos principales.

## 3. Configuración de archivos básicos
- Se creó `.gitignore` para ignorar archivos y carpetas innecesarias como `node_modules`, logs y configuraciones de IDE.
- Se creó `.editorconfig` para mantener un estilo de código uniforme entre todos los desarrolladores.

## 4. Configuración de ESLint
- Se instalaron las dependencias:
  - `eslint@8.56.0`
  - `eslint-config-airbnb-base`
  - `eslint-plugin-import`
  - `nodemon`
- Se creó el archivo `.eslintrc` con la configuración de Airbnb y excepciones para `_id`, `console.log` y saltos de línea.

## 5. Configuración de scripts en package.json
- Se añadieron los comandos:
  - `"start": "node app.js"` para iniciar el servidor.
  - `"dev": "nodemon app.js"` para desarrollo con hot reload.
  - `"lint": "npx eslint ."` para analizar el código con ESLint.

## 6. Creación del servidor Express
- Se creó el archivo `app.js` como punto de entrada.
- Se configuró Express para escuchar en el puerto 3000.
- Se añadieron los middlewares necesarios y las rutas principales.

## 7. Configuración de rutas y manejo de datos
- Se crearon los archivos `routes/users.js` y `routes/cards.js`.
- Se configuraron las rutas:
  - `GET /users` para obtener todos los usuarios.
  - `GET /users/:id` para obtener un usuario por ID, devolviendo 404 si no existe.
  - `GET /cards` para obtener todas las tarjetas.
- Se utilizó el módulo `fs` para leer y escribir en los archivos JSON, y el módulo `path` para construir rutas compatibles con cualquier sistema operativo.

## 8. Manejo de errores
- Se configuró un manejador 404 global para devolver el mensaje `{ "message": "Recurso solicitado no encontrado" }` en rutas no existentes, incluyendo la raíz `/`.

## 9. Pruebas
- Se recomendó probar las rutas y respuestas en Postman para verificar el correcto funcionamiento de la API.

---

**¡Proyecto backend listo para continuar con el desarrollo y