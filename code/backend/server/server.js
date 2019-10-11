// express
const express = require('express');
const app = express();
const http = require('http').Server(app);


app.use(express.json());

app.get('/ping', function(req, res){
    console.log("ping received");
    res.send("pong");
});

var qalist = 
[
    {
        q: "2+3?",
        option:["2", "3", "0", "5"],
        correctAnswerIndex: 3
    }
];

app.get('/quiz', function(req, res) {
    res.json(qalist);
});

app.use(express.static("public"));
const server = http.listen(3001, function() {
    console.log('listening on *:3001');
});