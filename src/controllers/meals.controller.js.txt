const pool = require("../db");

exports.checkin = async (req, res) => {
  const { tipo } = req.body;
  const userId = req.user.id;

  if (!tipo) {
    return res.status(400).json({ error: "Tipo de refeição obrigatório" });
  }

  const today = new Date().toISOString().split("T")[0];

  try {
    const exists = await pool.query(
      "SELECT 1 FROM meals WHERE user_id=$1 AND tipo=$2 AND data=$3",
      [userId, tipo, today]
    );

    if (exists.rows.length > 0) {
      return res.status(400).json({ error: "Refeição já registrada hoje" });
    }

    await pool.query(
      "INSERT INTO meals (user_id, tipo, data, hora) VALUES ($1,$2,CURRENT_DATE,CURRENT_TIME)",
      [userId, tipo]
    );

    res.json({ message: "Refeição registrada com sucesso 🍽️" });
  } catch (err) {
    res.status(500).json({ error: "Erro ao registrar refeição" });
  }
};

exports.myMeals = async (req, res) => {
  const userId = req.user.id;

  try {
    const meals = await pool.query(
      "SELECT tipo, data, hora FROM meals WHERE user_id=$1 ORDER BY data DESC",
      [userId]
    );

    res.json(meals.rows);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar refeições" });
  }
};
