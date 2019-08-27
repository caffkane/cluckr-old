// Requires
const express = require('express');
const logger = require('morgan');
const path = require('path');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
// const knex = require("./db/client");
const app = express();

//Middleware
app.use(express.urlencoded({
    extended: true
}));
app.use(methodOverride((req, res) => {
    if (req.body && req.body._method) {
        const method = req.body._method
        return method;
    }
}))
// Custom middleware to get username
function getUsernameMiddleware(request, response, next) {

    response.locals.username = request.cookies.username;
    next();
}
app.use(cookieParser());
app.use(getUsernameMiddleware);
app.use(express.urlencoded({
    extended: true
}));
app.use(express.static(path.join(__dirname, 'public')))
app.use(logger('dev'));
app.set('view engine', 'ejs');



//POST for Username Cookie request handler
const COOKIE_MAX_AGE = 1000 * 60 * 60 * 24 * 7;
app.post("/views/sign_in", (req, res) => {
    res.cookie('username', req.body.username, {
        maxAge: new Date(COOKIE_MAX_AGE)
    })
    res.redirect("/");
})

app.post("/sign_out", (req, res) => {
    res.clearCookie('username');
    res.redirect("/");
})



//APP
app.get("/sign_in", (req, res) => {
    res.render('sign_in');
})
app.get("/create_cluck", (req, res) => {
    res.render('createCluck');
})


//Server Connection
const PORT = 4545;
const ADDRESS = 'localhost';
app.listen(PORT, ADDRESS, () => {
    console.log(`Server started`);
});