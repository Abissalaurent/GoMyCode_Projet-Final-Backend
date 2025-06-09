const Task = require("../models/Task");

// Créer une tâche
exports.createTask = async (req, res) => {
  try {
    const {title, description, dueDate, status, priority} = req.body;
    const task = new Task({
      title,
      description,
      dueDate,
      status,
      priority,
      user: req.user.id,
    });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({message: "Erreur serveur"});
  }
};

// Obtenir toutes les tâches de l'utilisateur
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({user: req.user.id}).sort({createdAt: -1});
    res.json(tasks);
  } catch (err) {
    res.status(500).json({message: "Erreur serveur"});
  }
};

// Mettre à jour une tâche
exports.updateTask = async (req, res) => {
  try {
    const {title, description, dueDate, status, priority} = req.body;
    const task = await Task.findOneAndUpdate(
      {_id: req.params.id, user: req.user.id},
      {title, description, dueDate, status, priority},
      {new: true}
    );

    if (!task) {
      return res.status(404).json({message: "Tâche non trouvée"});
    }

    res.json(task);
  } catch (err) {
    res.status(500).json({message: "Erreur serveur"});
  }
};

exports.updateStatus = async (req, res) => {
  const {status} = req.body;
  const validStatuses = ["todo", "in-progress", "completed"];

  if (!validStatuses.includes(status)) {
    return res.status(400).json({error: "Statut invalide"});
  }

  const task = await Task.findByIdAndUpdate(
    req.params.id,
    {status},
    {new: true}
  );
  res.json(task);
};

// Supprimer une tâche
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!task) {
      return res.status(404).json({message: "Tâche non trouvée"});
    }

    res.json({message: "Tâche supprimée avec succès"});
  } catch (err) {
    res.status(500).json({message: "Erreur serveur"});
  }
};
