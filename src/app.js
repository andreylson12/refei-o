const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const mealsRoutes = require("./routes/meals.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/meals", mealsRoutes);

app.get("/", (req, res) => {
  res.json({ status: "API Refeições rodando 🚀" });
});

module.exports = app;
