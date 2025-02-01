// controllers/userController.js
const db = require("../database/models");

// Función para iniciar sesión
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Buscar el usuario en la base de datos por nombre de usuario
    const user = await db.User.findOne({
      where: { Username: username },
    });

    // Verificar si el usuario existe y si la contraseña coincide
    if (!user || user.Password !== password) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // Enviar una respuesta exitosa si el inicio de sesión es exitoso
    res.json({ message: "Login successful", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error during login process" });
  }
};

// Función para crear un nuevo usuario
const createUser = async (req, res) => {
  try {
    const newUser = req.body;

    // Verificar si ya existe un usuario con el mismo nombre de usuario
    const existingUser = await db.User.findOne({
      where: { Username: newUser.Username },
    });

    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // Crear un nuevo usuario en la base de datos
    const createdUser = await db.User.create(newUser);

    // Enviar una respuesta exitosa si se crea el usuario correctamente
    res.json({ message: "User created successfully", user: createdUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating user" });
  }
};

module.exports = {
  login,
  createUser,
};
