const mongoose = require('mongoose');
const DBConcoctionString = process.env.CONNECTION_URL;
mongoose.connect(DBConcoctionString,     
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('MongoDB Connected...'))
    .catch(error => {
        console.error('Connection error', error.message)
    });
    module.exports = mongoose.connection;