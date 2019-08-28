const express = require("express");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const path = require('path');
const methodOverride = require('method-override');
const rootRouter = require('./routes/root');
const articlesRouter = require('./routes/articles');
const app = express();

app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.urlencoded({
    extended: true
}));
app.use(cookieParser());

app.use(
    methodOverride((req, res) => {
        if (req.body && req.body._method) {
            const method = req.body._method;
            return method;
        }
    })
);

app.use(express.static(path.join(__dirname, 'public')));


app.use((request, response, next) => {
    response.locals.username = "";
    const username = request.cookies.username;
    if (username) {
        response.locals.username = username;
    }
    next();
});

app.use('/', rootRouter);
app.use('/articles', articlesRouter);

//Server Connection
const PORT = 4545;
const ADDRESS = 'localhost';
app.listen(PORT, ADDRESS, () => {
    console.log(`Server started`);
});