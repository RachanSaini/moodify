var express = require('express');
const { SQL_DATABASE } = require('./config');
const app = express(),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    authService = require('./services/auth.service'),
    passportSetup = require('./passport-setup');

var DbService = new require('./services/dbtable.service')

const authController = new require('./controllers/auth.controller.js')


//Applying middlewares
app.use(function (req, res, next) {
    let allowedOrigins = ['*']; // list of url-s
    let origin = req.headers.origin;
    if (allowedOrigins.indexOf(origin) > -1) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Expose-Headers', 'Content-Disposition');
    next();
});

app.use(passport.initialize());
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static(__dirname + '/'));

console.log(SQL_DATABASE)

//Error Message
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.get('/', (req, res) => {
    res.send('<h1>MoodMusic Online</h1>');
});


//Instead of using Passport Refresh Token Strategy, I am doing it manually. 
app.post('/auth/spotify/refresh',  authController.refreshToken);

app.get('/auth/spotify/authorize',
    passport.authenticate('spotify', {
        session: false,
        scope: ["streaming", "user-read-private", "user-read-email", "user-read-playback-state", "user-modify-playback-state"],
        accessType: "offline",
        approvalPrompt: "force"
    })
)

app.get('/auth/spotify/callback',
    passport.authenticate('spotify', { session: false }),
    (req, res) => {
        authService.signToken(req, res);
    }
)

app.listen(1200, () => {
    new DbService();
    console.log("Mood Music server online!")
})