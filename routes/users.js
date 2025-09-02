const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

// Cargar datos de usuarios
const usersDataPath = path.join(__dirname, "../data/users.json");
let users = JSON.parse(fs.readFileSync(usersDataPath, "utf8"));

// Obtener todos los usuarios
router.get("/", (req, res) => {
  res.json(users);
});

// Obtener un usuario por ID
router.get("/:id", (req, res) => {
  const user = users.find((u) => u._id === req.params.id);
  if (!user) {
    return res.status(404).json({ message: "ID de usuario no encontrado" });
  }
  res.json(user);
});

// Crear un nuevo usuario
router.post("/", (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    email: req.body.email,
  };
  users.push(newUser);
  fs.writeFileSync(usersDataPath, JSON.stringify(users, null, 2));
  res.status(201).json(newUser);
});

// Actualizar un usuario existente
router.put("/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).send("Usuario no encontrado");

  user.name = req.body.name;
  user.email = req.body.email;
  fs.writeFileSync(usersDataPath, JSON.stringify(users, null, 2));
  res.json(user);
});

// Eliminar un usuario
router.delete("/:id", (req, res) => {
  const userIndex = users.findIndex((u) => u.id === parseInt(req.params.id));
  if (userIndex === -1) return res.status(404).send("Usuario no encontrado");

  users.splice(userIndex, 1);
  fs.writeFileSync(usersDataPath, JSON.stringify(users, null, 2));
  res.status(204).send();
});

module.exports = router;
