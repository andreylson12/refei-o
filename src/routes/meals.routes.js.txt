const express = require("express");
const router = express.Router();
const mealsController = require("../controllers/meals.controller");
const auth = require("../middlewares/auth.middleware");

router.post("/checkin", auth, mealsController.checkin);
router.get("/my", auth, mealsController.myMeals);

module.exports = router;
