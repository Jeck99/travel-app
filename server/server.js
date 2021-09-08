const dotenv = require('dotenv');
dotenv.config();
const cors = require("cors");
const PORT = process.env.PORT || 8080;
const express = require('express');
const app = express();
const profileRouter = require('./routes/profilesRouter');
const db = require('./DB');
const path = require('path');
const passport = require("passport");
// const passportFunc = require("./config/passport");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

db.on('error', () => { console.log("connection error") });

app.listen(PORT, () => {
    console.log(`server is up on port: ${PORT}`);
})
app.use(passport.initialize());
app.use('/api/profiles', profileRouter);
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
    });
}
