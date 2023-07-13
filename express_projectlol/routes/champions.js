var express = require("express");
var router = express.Router();
const ChampionsController = require("../controllers/ChampionsController");
const championsController = new ChampionsController();

/* GET home page. */
router.get("/", championsController.getChampions);

module.exports = router;
