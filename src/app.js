const express = require("express");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/auth.routes");
const mealsRoutes = require("./routes/meals.routes");

const app = express();

// Middlewares básicos
app.use(cors());
app.use(express.json());

// 👉 SERVIR O FRONTEND (HTML / JS)
app.use(express.static(path.join(__dirname, "public")));

// Rotas da API
app.use("/auth", authRoutes);
app.use("/meals", mealsRoutes);

// Rota de status (opcional)
app.get("/api/status", (req, res) => {
  res.json({ status: "API Refeições rodando 🚀" });
});

module.exports = app;

