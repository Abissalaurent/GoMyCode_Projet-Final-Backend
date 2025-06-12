require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

// ✅ Configuration CORS robuste (autorise aussi localhost pour le dev)
const allowedOrigins = [
  "https://task-management-frontend-five-topaz.vercel.app/",
];
const corsOptions = {
  origin: function (origin, callback) {
    // Autorise les outils sans origin (ex: Postman) ou les origines listées
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

// ✅ Middleware JSON
app.use(express.json());

// Connexion à MongoDB
const dbURI = process.env.MONGODB_URI;
if (!dbURI) {
  console.error("❌ MONGODB_URI non défini dans .env");
  process.exit(1);
}
mongoose
  .connect(dbURI)
  .then(() => console.log("✅ Connecté à MongoDB"))
  .catch((err) => {
    console.error("❌ Erreur MongoDB:", err);
    process.exit(1);
  });

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);

// Route de test (optionnel)
app.get("/", (req, res) => {
  res.send("API Task Manager opérationnelle !");
});

// Démarrage serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Serveur démarré sur le port ${PORT}`));