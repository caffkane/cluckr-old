const express = require('express');
const router = express.Router();
const knex = require("../db/client");

//Routes to Pages
router.get('/', (request, response) => {
    knex("clucks")
        .orderBy("createdAt", "DESC")
        .then(clucks => {
            response.render("articles/clucks", {
                clucks: clucks
            });
        });
});

router.get('/createCluck', (request, response) => {
    response.render('articles/createCluck')
});

router.get('/sign_in', (request, response) => {
    response.render('sign_in');
});

router.get('/clucks', (request, response) => {
    knex("clucks")
        .orderBy("createdAt", "DESC")
        .then(clucks => {
            response.render("articles/clucks", {
                clucks: clucks
            });
        });
});

//POST for Username Cookie request handler
const COOKIE_MAX_AGE = 1000 * 60 * 60 * 24 * 7;
router.post("/sign_in", (req, res) => {
    res.cookie('username', req.body.username, {
        maxAge: new Date(COOKIE_MAX_AGE)
    })
    res.redirect("/");
})

router.post("/sign_out", (req, res) => {
    res.clearCookie('username');
    res.redirect("/");
})

module.exports = router;