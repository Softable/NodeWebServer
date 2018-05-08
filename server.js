var express = require('express');
var app = express();

var cors = require('cors');
var bodyParser = require('body-parser');

const port = 3000;

require('./router')(app);

app.set('views',__dirname + '/views');
app.set('view engine', 'ejs');

app.engine('html', require('ejs').renderFile);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/views'));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });



var server = app.listen(port, function() {
    console.log("Il server è in ascolto sulla porta " + port);
});
