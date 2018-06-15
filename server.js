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


    //Here is where I could add functions to then get the url of the new photo
    //And relocate that to a cloud storage solution with a callback containing its new url
    //then ideally loading that into your database solution.   Use case - user uploading an avatar...
    res.send('Complete! Check out your public/photo-storage folder.  Please note that files not encoded with an image mimetype are rejected. <a href="index.html">try again</a>');
}

);

//Fine settaggio del Server per i file e le immagini.

var server = app.listen(port, function() {
    console.log("Il server è in ascolto sulla porta " + port);
});
