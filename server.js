var express = require('express');
var morgan = require('morgan');
var path = require('path'); 

var crypto = require('crypto');

var app = express();
app.use(morgan('combined'));


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.html'));
});
function hash (input, salt) {
    // How do we create a hash?
    var hashed = crypto.pbkdf2Sync(input, salt, 10000, 512, 'sha512');
    return ["pbkdf2", "10000", salt, hashed.toString('hex')].join('$');
}


app.get('/hash/:input', function(req, res) {
   var hashedString = hash(req.params.input, 'this-is-some-random-string');
   res.send(hashedString);
});

app.get('/index', function (req, res){
    res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});
app.get('/article-one', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'article-one.html'));
});


app.get('/ui/main.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.css'));
});

app.get('/ui/article-one.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'article-one.css'));
});

app.get('/ui/jquery-1.4.2.js',function(req,res){
    res.sendFile(path.join(__dirname, 'ui', 'jquery-1.4.2.js'));
});
app.get('/ui/main.js',function(req,res){
    res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});
app.get('/ui/course1.js',function(req,res){
    res.sendFile(path.join(__dirname, 'ui', 'course1.js'));
});
app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});
app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

var port = 8080; // Use 8080 for local development because you might already have apache running on 80

app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
