const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const app = express();

dotenv.config(); // this basically makes the config from all our .env file available to the whole project
const port = process.env.PORT; //now we can access the port from process.env because of the .config() exposure
const api = process.env.API; //now we can access the api from process.env because of the .config() exposure

app.get(`${api}/health`, (req, res) => {
    res.send('app is healthy');
});

mongoose.connect(process.env.MONGODB_CONN_STRING) //this will connect mongoose to our mongodb database
.then(() => {
    console.log('connected to mongodb')
})
.catch((error) => {
    console.log(error)
})

app.listen(port, () => {
    console.log('app listening on http://localhost:3000')
})