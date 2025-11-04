const express = require("express");
const bodyParser = require("body-parser");
const cardsRoutes = require("./routes/cards");
const usersRoutes = require("./routes/users");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Middleware temporal de autorización (hard-coded para pruebas)
app.use((req, res, next) => {
  req.user = {
    _id: "64f1a2b3c4d5e6f7a8b9c0d1", // reemplaza por el _id de tu usuario de prueba
  };
  next();
});

app.use((req, res, next) => {
  const headerId = req.header("x-user-id");
  const envId = process.env.TEST_USER_ID;
  if (headerId) {
    req.user = { _id: headerId };
  } else if (envId) {
    req.user = { _id: envId };
  }
  next();
});
app.use("/cards", cardsRoutes);
app.use("/users", usersRoutes);

// app.get("/", (req, res) => {
//  res.send("¡Servidor Express funcionando!");
// });

app.use((req, res) => {
  res.status(404).json({ message: "Recurso solicitado no encontrado" });
});

// Middleware global de manejo de errores
app.use((err, req, res, next) => {
  console.error(err); // útil para depuración en desarrollo

  if (res.headersSent) {
    return next(err);
  }

  // Prioriza statusCode si el error personalizado lo trae
  const status = err.statusCode
    || (err.name === "ValidationError" || err.name === "CastError" ? 400
    : err.name === "DocumentNotFoundError" ? 404
    : 500);

  const message = status === 500 ? "Error interno del servidor" : (err.message || "Error");

  res.status(status).json({ message });
});

// Conectar a MongoDB y luego arrancar el servidor
async function start() {
  try {
    await mongoose.connect("mongodb://localhost:27017/aroundb");
    console.log("Conectado a MongoDB: mongodb://localhost:27017/aroundb");

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error al conectar a MongoDB", error);
    process.exit(1);
  }
}

start();
