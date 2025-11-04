const mongoose = require("mongoose");
const User = require("../models/user");
const { BadRequestError, NotFoundError } = require("../errors/httpErrors");

// Obtener todos los usuarios
async function getUsers(req, res, next) {
  try {
    const users = await User.find({});
    return res.json(users);
  } catch (err) {
    return next(err);
  }
}

async function getUserById(req, res, next) {
  const { userId } = req.params;
  if (!mongoose.isValidObjectId(userId)) {
    return next(new BadRequestError("ID de usuario inválido"));
  }
  try {
    const user = await User.findById(userId).orFail(() => new NotFoundError("Usuario no encontrado"));
    return res.json(user);
  } catch (err) {
    return next(err);
  }
}

async function createUser(req, res, next) {
  const { name, about, avatar } = req.body;
  try {
    const newUser = await User.create({ name, about, avatar });
    return res.status(201).json(newUser);
  } catch (err) {
    if (err.name === "ValidationError") return next(new BadRequestError("Datos inválidos"));
    return next(err);
  }
}

async function updateProfile(req, res, next) {
  const userId = req.user && req.user._id;
  const { name, about } = req.body;

  if (!userId || !mongoose.isValidObjectId(userId)) {
    return next(new BadRequestError("ID de usuario inválido"));
  }

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { name, about },
      { new: true, runValidators: true }
    ).orFail(() => new NotFoundError("Usuario no encontrado"));

    return res.json(user);
  } catch (err) {
    if (err.name === "ValidationError") {
      return next(new BadRequestError("Datos inválidos para actualizar el perfil"));
    }
    return next(err);
  }
}

async function updateAvatar(req, res, next) {
  const userId = req.user && req.user._id;
  const { avatar } = req.body;

  if (!userId || !mongoose.isValidObjectId(userId)) {
    return next(new BadRequestError("ID de usuario inválido"));
  }

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { avatar },
      { new: true, runValidators: true }
    ).orFail(() => new NotFoundError("Usuario no encontrado"));

    return res.json(user);
  } catch (err) {
    if (err.name === "ValidationError") {
      return next(new BadRequestError("URL de avatar inválida"));
    }
    return next(err);
  }
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar,
};
