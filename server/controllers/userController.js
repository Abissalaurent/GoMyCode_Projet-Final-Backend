// backend/controllers/userController.js
const User = require("../models/User");

exports.updateProfile = async (req, res) => {
  try {
    const {username, email} = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      {username, email},
      {new: true, runValidators: true}
    ).select("-password");

    if (!user) {
      return res.status(404).json({message: "Utilisateur non trouvé"});
    }

    res.json({user});
  } catch (err) {
    res.status(400).json({message: err.message});
  }
};
