var express = require('express');
var app = express();

var cors = require('cors');
app.use(cors());

var bodyParser = require('body-parser');

const port = 3000;

require('./router')(app);

app.set('views',__dirname + '/views');
app.set('view engine', 'ejs');

app.engine('html', require('ejs').renderFile);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/views'));

//Inizio settaggio del Server per i file e le immagini.
  var fileName;
const multer = require('multer');
//MULTER CONFIG: to get file photos to temp server storage
const multerConfig = {

  //specify diskStorage (another option is memory)
  storage: multer.diskStorage({

    //specify destination
    destination: function(req, file, next){
      next(null, './Support');
    },

    //specify the filename to be unique
    filename: function(req, file, next){
      //get the file mimetype ie 'image/jpeg' split and prefer the second value ie'jpeg'
      const ext = file.mimetype.split('/')[1];
      //set the file fieldname to a unique name containing the original name, current datetime and the extension.
      next(null, file.originalname);
      fileName=file.originalname;
    }
  }),

  // filter out and prevent non-image files.
  fileFilter: function(req, file, next){
        if(!file){
          next();
        }

      // only permit image mimetypes
      const image = file.mimetype.startsWith('image/');
      if(image){
        next(null, true);
      }else{
        //TODO:  A better message response to user on failure.
        return next();
      }
  }
};

app.post('/upload', multer(multerConfig).single('photo'),function(req, res){
    var scriptFile = '<script>function aggiungiFile(id){nomeFile = "'+fileName+'";$(document).ready(function() {var obj = {};obj = {"nome":nomeFile,"id":id};$.ajax({url: "http://localhost:8080/tabella/upload",type: "POST",contentType: "application/json",data: JSON.stringify(obj),dataType: "json"}).done(function (esito) {console.log("Esito inserimento: "+esito);});});}';
    var scriptCookie =' function leggiCookie(name) {var i, c, ca, nameEQ = name + "=";ca = document.cookie.split(";");for(i=0;i < ca.length;i++) {c = ca[i];while (c.charAt(0)==" ") {c = c.substring(1,c.length);}if (c.indexOf(nameEQ) == 0) {return c.substring(nameEQ.length,c.length);}}return "null";}</script>';
    var jQuery = '<script src="assets/js/jquery.min.js"></script>';
    //Here is where I could add functions to then get the url of the new photo
    //And relocate that to a cloud storage solution with a callback containing its new url
    //then ideally loading that into your database solution.   Use case - user uploading an avatar...
    res.send(jQuery+scriptFile+scriptCookie+'<style>img:hover{cursor:pointer;} img{display: block;margin-left: auto;margin-right: auto;} body{background-image:url("assets/images/universe6.jpg"); background-position:center;background-attachment: fixed;}</style><body onload=aggiungiFile(leggiCookie("id_modello"))><img title="Torna alle tue Tabelle" style=" width:50%;" src="assets/images/logo.png" onclick=location.href="/tabella"></body>');
}

);

//Fine settaggio del Server per i file e le immagini.

var server = app.listen(port, function() {
    console.log("Il server è in ascolto sulla porta " + port);
});
