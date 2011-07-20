var express = require('express'),
    app = express.createServer();
    

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
    res.render('submit', {
        title: "Submit",
        text: req.body.text
    });
    //res.send("hello world");
});


app.listen(3000);
console.log("Started");
