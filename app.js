var express = require('express');
var path = require('path');
var http = require('http');
var exphbs = require('express-handlebars');

var app = express();

app.use(express.static(path.resolve(__dirname, "public")));

app.engine('hbs', exphbs({defaultLayout: 'main.hbs'}));
app.set('view engine', 'hbs');

app.get('/', function(req, res, next){
  res.render('index');
});

app.get('/dynamic/:name', function(req, res, next){
  var params = req.params.name;
  res.render('dynamic', {params});
});

app.get('/api/info', function(req, res, next){
  var data = {
    name: 'howie mann',
    age: '21'
  };
  res.json(data);
});

app.use(function(req, res){
  res.status(404).send('404 error');
});

http.createServer(app).listen(3000, function(){
  console.log("listening on localhost:3000");
});

module.exports = app;
