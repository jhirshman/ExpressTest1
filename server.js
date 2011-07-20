console.log("hello");

var express = require('express'),
    app = express.createServer(),
    users = require('./models/userModel');
    

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});


app.get('/', function (req, res) {
    res.render('form', {
        title: "Form"
    });
    //res.send("hello world");
});

app.post('/submit', function (req, res) {
    users.insertIntoDB(req.body.username, req.body.info, function() {res.redirect('/'); });
});

app.get('/information', function (req, res) {
    users.getUsers(res, function(response, userArry) {
        response.render('information', {
            title: "Users",
            userArray: userArry
        });
    });
});

app.get('/users/:id', function (req, res) {
    users.getInfo(req.params.id, res, function(response, user, informationArray) {
        response.render('userPage', {
            title: user,
            infoArray: informationArray
        });
    });
});

app.listen(3000);
console.log("Started");
