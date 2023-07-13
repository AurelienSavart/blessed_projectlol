const axios = require("axios");
const fs = require("fs");

class ChampionsController {
  constructor() {
    this.getChampions = this.getChampions.bind(this);
  }

  async getChampions(req, res) {
    let data = this.getJSON();
    // if not empty
    if (Object.keys(data).length > 0) {
      return res.status(200).json(data);
    } else {
      await axios
        .get(
          "http://ddragon.leagueoflegends.com/cdn/13.13.1/data/fr_FR/champion.json"
        )
        .then((result) => {
          this.saveJSON(result.data);
          return res.status(200).json(result.data.data);
        })
        .catch((err) => {
          return res.status(400).json(err);
        });
    }
  }

  saveJSON(data) {
    try {
      if (!data || Object.keys(data).length === 0) {
        console.error("Data is empty. File not saved.");
        return;
      }

      const jsonData = JSON.stringify(data.data);
      fs.writeFileSync("bdd/champions.json", jsonData, "utf8");
      console.log("File saved successfully!");
    } catch (error) {
      console.error("Error saving file:", error);
    }
  }

  getJSON() {
    // Get our file champions.json and return it
    try {
      const data = fs.readFileSync("bdd/champions.json", "utf8");
      return JSON.parse(data);
    } catch (error) {
      console.error("Error reading file:", error);
      return null;
    }
  }
}

module.exports = ChampionsController;
