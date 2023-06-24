const express = require("express");
const router = express.Router();
const Court = require("../models/Court");
const Player = require("../models/Player");
const isLoggedIn = require("../utils/isLoggedIn");
const User = require("../models/User");



router.get("/courts", (req, res) => {
    Court.find()
        .then((allCourts) => {
            res.render("courts/courts-page", { allCourts });
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send("An error occurred while fetching the courts.");
        });
});

router.get("/courts/new", (req, res) => {
    res.render("courts/new-court");
});

router.post("/courts/create", (req, res) => {
    // const { name, location, capacity, level, image } = req.body;
    Court.create({ 
        name: req.body.courtName, 
        location: req.body.courtLocation,
        capacity: req.body.courtCapacity, 
        level: req.body.courtLevel,
        image: req.body.courtImage,
     })
        .then((theCourt) => {
            res.redirect("/courts");
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send("An error occurred while creating the court.");
        });
});

router.get("/courts/:id", (req, res) => {
    const courtId = req.params.id;
    Court.findById(courtId)
        .then((foundCourt) => {
            if (!foundCourt) {
                res.status(404).send("Court not found.");
                return;
            }

            res.render("courts/court-details", { foundCourt });
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send("An error occurred while fetching the court details.");
        });
});

//added delete for courts 
router.post("/courts/delete/:courtId", (req, res) => {
    Court.findByIdAndRemove(req.params.courtId)
    .then(() => {
      res.redirect("/courts");
    });
  });

//added edit for courts
// router.get("/courts/edit/:id", (req, res) => {
//     Court.findById(req.params.id)
//     .then((theCourt) => {
//       Player.find().then((allPlayers) => {
//         allPlayers.forEach((thePlayer) => {
//           if (thePlayer._id.equals(theCourt.player)) {
//             thePlayer.blah = true;
//           }
//         });
  
//         res.render("courts/court-edit", { theCourt, players: allPlayers });
//       });
//     });
//   });

router.get("/courts/:id/edit", (req, res) =>{
    Court.findById(req.params.id)
    .then((theCourt) => {
        res.render("courts/court-edit", {theCourt})
    })
})


  router.post("/courts/:id/update", (req, res) => {
    Court.findByIdAndUpdate(req.params.id, {
        name: req.body.courtName, 
        location: req.body.courtLocation,
        capacity: req.body.courtCapacity, 
        level: req.body.courtLevel,
        image: req.body.courtImage,
        player: req.body.thePlayer
    }).then(() => {
      res.redirect("/courts/" + req.params.id);
    });
  });

router.post("/courts/add/:id", isLoggedIn, (req, res, next) => {
    const courtId = req.params.id
    Court.findById(courtId)
    .then((foundCourt) => {
        const userId = req.session.currentUser._id
        User.findByIdAndUpdate(userId, {
            $push: {courts: foundCourt}
        })
        .then(() => {
            Court.findByIdAndUpdate (courtId, {picked: true})
            .then(() => {
                req.flash("success", "court successfully picked up");
                res.redirect("/mypage");
            })
        })
        .catch((err)=>next(err));
    }).catch((err)=>next(err));
});



module.exports = router;
