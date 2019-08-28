const express = require("express");
const router = express.Router();
const knex = require("../db/client");

// ARTICLES
// router.get("/createCluck", (req, res) => {
//     res.render("articles/createCluck");
// });

router.get("/", (req, res) => {
    knex("clucks")
        .select("*")
        .then((data) => {
            res.render("articles/clucks", {
                clucks: data,
            });
        });
});

router.post("/", (req, res) => {
    console.log(req.body.username);
    knex("clucks")
        .insert({
            username: req.cookies.username,
            content: req.body.content,
            image_url: req.body.image_url,
            createdAt: knex.fn.now()
        })
        .returning("*")
        .then(() => {
            res.redirect("/clucks");
        });
});

router.get("/", (req, res) => {
    knex("clucks")
        .orderBy("createdAt", "DESC")
        .then(clucks => {
            res.render("articles/clucks", {
                clucks: clucks
            });
        });
});

module.exports = router;