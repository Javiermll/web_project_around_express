const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

// Load cards data
const cardsDataPath = path.join(__dirname, "../data/cards.json");
let cards = JSON.parse(fs.readFileSync(cardsDataPath, "utf8"));

// Get all cards
router.get("/", (req, res) => {
  res.json(cards);
});

// Get a card by ID
router.get("/:id", (req, res) => {
  const card = cards.find((c) => c.id === parseInt(req.params.id));
  if (!card) return res.status(404).send("Card not found");
  res.json(card);
});

// Create a new card
router.post("/", (req, res) => {
  const newCard = {
    id: cards.length + 1,
    title: req.body.title,
    content: req.body.content,
  };
  cards.push(newCard);
  fs.writeFileSync(cardsDataPath, JSON.stringify(cards, null, 2));
  res.status(201).json(newCard);
});

// Update a card
router.put("/:id", (req, res) => {
  const card = cards.find((c) => c.id === parseInt(req.params.id));
  if (!card) return res.status(404).send("Card not found");

  card.title = req.body.title;
  card.content = req.body.content;
  fs.writeFileSync(cardsDataPath, JSON.stringify(cards, null, 2));
  res.json(card);
});

// Delete a card
router.delete("/:id", (req, res) => {
  const cardIndex = cards.findIndex((c) => c.id === parseInt(req.params.id));
  if (cardIndex === -1) return res.status(404).send("Card not found");

  cards.splice(cardIndex, 1);
  fs.writeFileSync(cardsDataPath, JSON.stringify(cards, null, 2));
  res.status(204).send();
});

module.exports = router;
