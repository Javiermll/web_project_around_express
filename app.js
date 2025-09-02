const express = require("express");
const bodyParser = require("body-parser");
const cardsRoutes = require("./routes/cards");
const usersRoutes = require("./routes/users");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use("/cards", cardsRoutes);
app.use("/users", usersRoutes);

// app.get("/", (req, res) => {
//  res.send("¡Servidor Express funcionando!");
// });

app.use((req, res) => {
  res.status(404).json({ message: "Recurso solicitado no encontrado" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
