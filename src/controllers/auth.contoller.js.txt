const jwt = require("jsonwebtoken");
const pool = require("../db");
const { jwtSecret } = require("../config/env");

exports.login = async (req, res) => {
  const { matricula } = req.body;

  if (!matricula) {
    return res.status(400).json({ error: "Matrícula obrigatória" });
  }

  try {
    const user = await pool.query(
      "SELECT id, nome, matricula, role FROM users WHERE matricula = $1",
      [matricula]
    );

    if (user.rows.length === 0) {
      return res.status(401).json({ error: "Usuário não encontrado" });
    }

    const token = jwt.sign(
      { id: user.rows[0].id, role: user.rows[0].role },
      jwtSecret,
      { expiresIn: "1d" }
    );

    res.json({ token, user: user.rows[0] });
  } catch (err) {
    res.status(500).json({ error: "Erro no login" });
  }
};
