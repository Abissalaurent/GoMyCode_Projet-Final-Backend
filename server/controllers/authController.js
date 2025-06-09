const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Inscription
exports.register = async (req, res) => {
  try {
    const {username, email, password} = req.body;

    // Vérification si l'utilisateur existe déjà
    let user = await User.findOne({email});
    if (user) {
      return res
        .status(400)
        .json({message: "Un utilisateur avec cet email existe déjà"});
    }

    // Création du nouvel utilisateur
    user = new User({username, email, password});
    await user.save();

    // Génération du token JWT
    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res
      .status(201)
      .json({
        token,
        user: {id: user._id, username: user.username, email: user.email},
      });
  } catch (err) {
    res.status(500).json({message: "Erreur serveur"});
  }
};

// Connexion
exports.login = async (req, res) => {
  try {
    const {email, password} = req.body;

    // Vérification de l'utilisateur
    const user = await User.findOne({email});
    if (!user) {
      return res.status(400).json({message: "Identifiants invalides"});
    }

    // Vérification du mot de passe
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({message: "Identifiants invalides"});
    }

    // Génération du token JWT
    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      token,
      user: {id: user._id, username: user.username, email: user.email},
    });
  } catch (err) {
    res.status(500).json({message: "Erreur serveur"});
  }
};
