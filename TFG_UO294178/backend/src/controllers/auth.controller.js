const passport = require("passport");
const bcrypt = require("bcrypt");
const validator = require("validator");
const userRepository = require("../repositories/user.repository");

function login(req, res, next) {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return setTimeout(() => {
        res.status(401).json({ error: info.message });
      }, 500);
    }

    req.logIn(user, (loginError) => {
      if (loginError) {
        return next(loginError);
      }

      return res.json({
        message: "Login correcto",
        user,
      });
    });
  })(req, res, next);
}

async function register(req, res, next) {
  const { email, password, name } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      error: "Email y contraseña son obligatorios.",
    });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({
      error: "Formato de email inválido.",
    });
  }

  if (!email.endsWith("@sergas.es")) {
    return res.status(403).json({
      error: "Solo se permiten cuentas corporativas (@sergas.es).",
    });
  }

  if (password.length < 8) {
    return res.status(400).json({
      error: "La contraseña debe tener al menos 8 caracteres.",
    });
  }

  try {
    const user = await userRepository.getUserByEmail(email);

    if (!user) {
      return res.status(403).json({
        error: "Usuario no autorizado por administración.",
      });
    }

    if (user.active) {
      return res.status(409).json({
        error: "Esta cuenta ya está activa.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const updatedUser = await userRepository.activateUser(
      email,
      hashedPassword,
      name
    );

    return res.status(201).json({
      message: "Cuenta activada correctamente.",
      user: updatedUser,
    });
  } catch (error) {
    return next(error);
  }
}

function logout(req, res) {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({
        error: "Error al cerrar sesión.",
      });
    }

    req.session.destroy(() => {
      res.clearCookie("sergas_session");

      return res.json({
        message: "Sesión cerrada correctamente.",
      });
    });
  });
}

function me(req, res) {
  if (!req.isAuthenticated()) {
    return res.status(401).json({
      user: null,
    });
  }

  return res.json({
    user: req.user,
  });
}

module.exports = {
  login,
  register,
  logout,
  me,
};