var express = require('express');
var morgan = require('morgan');
var path = require('path'); 



var app = express();
app.use(morgan('combined'));


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.html'));
});


var counter=0;
app.get('/counter',function(req, res){
    counter=counter+1;
    res.send(counter.toString());
});
app.get('/index', function (req, res){
    res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});
app.get('/game', function (req, res){
    res.sendFile(path.join(__dirname, 'ui', 'game.html'));
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
app.get('/ui/article-one.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'article-one.css'));
});
app.get('/ui/main.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.css'));
});
app.get('/ui/main.js',function(req,res){
    res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});
app.get('/ui/game.css', function(req,res){
    res.sendFile(path.join(__dirname, 'ui', 'game.css'));
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
