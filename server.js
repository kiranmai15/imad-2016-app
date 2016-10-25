var express = require('express');
var morgan = require('morgan');
var path = require('path'); 
var Pool= require('pg').Pool;

var config= {
    user: 'kiranmai15',
    database: 'kiranmai15',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
    
};

var app = express();
app.use(morgan('combined'));


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var pool= new pool('config');
app.get('/test-db', function(req, res){
   //make a select request
   //return the response with results
   pool.query('SELECT * FROM test', function(err,result){
       if(err){
           res.status(500).send(err,toString());
       }else{
           res.send(JSON.stringify(result));
       }
   });
});

var counter=0;
app.get('/counter',function(req, res){
    counter=counter+1;
    res.send(counter.toString());
});

app.get('/article-one', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'article-one.html'));
});
app.get('/article-two', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'article-two.html'));
});
app.get('/article-three', function (req, res) {
   res.sendFile(path.join(__dirname, 'ui', 'article-three.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});
app.get('/ui/main.js',function(req,res){
    res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});
var names=[];
app.get('/submit-name',function(req,res){//URL /submit-name/?name=XXXXX
    // get the name
    var name = req.query.name;
    names.push(name);
    //JSON Javascript object notation converts objects to strings
    
    res.send(JSON.stringify(names));
});
app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
