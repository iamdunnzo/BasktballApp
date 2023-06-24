const express = require("express");
const router = express.Router();
const Player = require("../models/Player");
const Court = require("../models/Court");

// Create a new player
router.get("/players/new", (req, res) => {
  Court.find().then((allCourts) => {
    res.render("players/new-player", { courts: allCourts });
  });
});

router.post("/players/create", (req, res) => {
  Player.create({
    name: req.body.playerName,
    position: req.body.playerPosition,
    team: req.body.playerTeam,
    height: req.body.playerHeight,
    weight: req.body.playerWeight,
    age: req.body.playerAge,
    court: req.body.theCourt,
  }).then((response) => {
    res.redirect("/players");
  });
});

// Retrieve all players
router.get("/players", (req, res) => {
  Player.find().then((allPlayers) => {
    res.render("players/player-list", { players: allPlayers });
  });
});

// Retrieve player details
router.get("/players/:id", (req, res) => {
  const playerId = req.params.id;
  Player.findById(playerId)
    .populate("court")
    .then((thePlayer) => {
      console.log(thePlayer);
      res.render("players/player-details", { thePlayer });
    });
});

// Delete a player
router.post("/players/delete/:playerId", (req, res) => {
  Player.findByIdAndRemove(req.params.playerId).then(() => {
    res.redirect("/players");
  });
});

// Edit a player
router.get("/players/edit/:id/", (req, res) => {
  Player.findById(req.params.id).then((thePlayer) => {
    Court.find().then((allCourts) => {
      allCourts.forEach((theCourt) => {
        if (theCourt._id.equals(thePlayer.court)) {
          theCourt.blah = true;
        }
      });

      res.render("players/player-edit", { thePlayer, courts: allCourts });
    });
  });
});

router.post("/players/:id/update", (req, res) => {
  Player.findByIdAndUpdate(req.params.id, {
    name: req.body.playerName,
    position: req.body.playerPosition,
    team: req.body.playerTeam,
    height: req.body.playerHeight,
    weight: req.body.playerWeight,
    age: req.body.playerAge,
    court: req.body.theCourt,
  }).then(() => {
    res.redirect("/players/" + req.params.id);
  });
});

module.exports = router;
