var express = require('express');
var morgan = require('morgan');
var path = require('path'); 
var Pool = require('pg').Pool;

var crypto = require('crypto');
var bodyParser = require('body-parser');
var session = require('express-session');


var config = {
    user: 'kiranmai15',
    database: 'kiranmai15',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(session({
    secret: 'someRandomSecretValue',
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 30}
}));


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.html'));
});

app.get('/loginform',function(req,res){
    res.sendFile(path.join(__dirname, 'ui', 'loginform.html'));
});
app.get('/register',function(req,res){
    res.sendFile(path.join(__dirname, 'ui', 'register.html'));
});
app.get('/courses',function(req,res){
    res.sendFile(path.join(__dirname, 'ui', 'courses.html'));
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
var pool = new Pool(config);
app.post('/create-user', function (req, res) {
   // username, password
   // {"username": "tanmai", "password": "password"}
   // JSON
   var username = req.body.username;
   var password = req.body.password;
   var salt = crypto.randomBytes(128).toString('hex');
   var dbString = hash(password, salt);
   pool.query('INSERT INTO "user" (username, password) VALUES ($1, $2)', [username, dbString], function (err, result) {
      if (err) {
          res.status(500).send(err.toString());
      } else {
          res.send('User successfully created: ' + username);
      }
   });
});

app.post('/login', function (req, res) {
   var username = req.body.username;
   var password = req.body.password;
   
   pool.query('SELECT * FROM "user" WHERE username = $1', [username], function (err, result) {
      if (err) {
          res.status(500).send(err.toString());
      } else {
          if (result.rows.length === 0) {
              res.status(403).send('username/password is invalid');
          } else {
              // Match the password
              var dbString = result.rows[0].password;
              var salt = dbString.split('$')[2];
              var hashedPassword = hash(password, salt); // Creating a hash based on the password submitted and the original salt
              if (hashedPassword === dbString) {
               // Set the session
                req.session.auth = {userId: result.rows[0].id};
                // set cookie with a session id
                // internally, on the server side, it maps the session id to an object
                 // { auth: {userId }}
                
                res.send('credentials correct!');
                
              } else {
                res.status(403).send('username/password is invalid');
              }
          }
      }
   });
});
app.get('/check-login', function (req, res) {
if (req.session && req.session.auth && req.session.auth.userId) {
    res.send("You are logged in: " + req.session.auth.userId.toString());
}else{
    res.send("You are not logged in");
}

});
app.get('/logout', function (req, res) {
   delete req.session.auth;
   res.send('<html><body>Logged out!<br/><br/><a href="/">Back to Home</a></body></html>');
});
app.get('/index',function(req,res){
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
app.get('/ui/login.js',function(req,res){
    res.sendFile(path.join(__dirname, 'ui', 'login.js'));
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
