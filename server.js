
const express = require('express')
const path = require('path')
const app = express()
const mongoose = require('mongoose')
const api = require('./server/routes/api')

const PORT = process.env.PORT || 4200
const URI = process.env.MONGODB_URI || 'mongodb://localhost/crm-mongo'

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true, connectTimeoutMS: 5000, serverSelectionTimeoutMS: 5000 })
.then(function(){
    console.log("Db connected: " + URI)
})
.catch(function(err){
    console.log(err.message);
});



app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('node_modules'));
app.use(express.static(path.join(__dirname, 'build')));
app.use('/', api);


app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, function(){
    console.log(`Server is up and running on port: ${PORT}`);
});