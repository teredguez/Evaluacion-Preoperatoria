const validator = require("validator");
const userRepository = require("../repositories/user.repository");

async function inviteUser(req, res, next) {
  const { email } = req.body;

  if (!email || !validator.isEmail(email)) {
    return res.status(400).json({
      error: "Email inválido."
    });
  }

  if (!email.endsWith("@sergas.es")) {
    return res.status(400).json({
      error: "Solo se permiten correos @sergas.es"
    });
  }

  try {

    const user = await userRepository.inviteUser(email);

    return res.status(201).json({
      message: "Usuario dado de alta correctamente. Pendiente de activación.",
      user
    });

  } catch (error) {

    if (error.code === "23505") {
      return res.status(409).json({
        error: "Este usuario ya existe en la base de datos."
      });
    }

    return next(error);
  }
}

async function getUsers(req, res, next) {
  try {

    const users = await userRepository.getUsers();

    return res.json(users);

  } catch (error) {

    return next(error);

  }
}

async function deleteUser(req, res, next) {
  try {

    const { id } = req.params;

    await userRepository.deleteUser(id);

    return res.json({
      message: "Usuario eliminado correctamente"
    });

  } catch (error) {

    return next(error);

  }
}

module.exports = {
  inviteUser,
  getUsers,
  deleteUser,
};
