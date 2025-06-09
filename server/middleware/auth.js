const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = async (req, res, next) => {
  try {
    // Récupération du token depuis le header
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res
        .status(401)
        .json({message: "Pas de token, autorisation refusée"});
    }

    // Vérification du token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({message: "Token invalide"});
    }

    // Ajout de l'utilisateur à la requête
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({message: "Token invalide"});
  }
};
