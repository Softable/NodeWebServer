module.exports = function(app)
{
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    app.get('/', function(req,res) {
        res.render('index.html');
    });

    app.get('/utente/collezione', function(req,res) {
        res.render('utente/collezione.html');
    });

    app.get('/utente/inserisci', function(req,res) {
        res.render('utente/inserisci.html');
    });

    app.get('/utente/richiedi', function(req,res) {
        res.render('utente/richiedi.html');
    });

    app.get('/utente/elimina', function(req,res) {
        res.render('utente/elimina.html');
    });

    app.get('/utente/modifica', function(req,res) {
        res.render('utente/modifica.html');
    });

    app.get('/modello/collezione', function(req,res) {
        res.render('modello/collezione.html');
    });

    app.get('/modello/aggiungi', function(req,res) {
        res.render('aggiungiModello.html');
    });

    app.get('/modello/richiedi', function(req,res) {
        res.render('modello/richiedi.html');
    });

    app.get('/modello/elimina', function(req,res) {
        res.render('modello/elimina.html');
    });

    app.get('/modello/modifica', function(req,res) {
        res.render('modello/modifica.html');
    });

    app.get('/tabella/collezione', function(req,res) {
        res.render('tabella/collezione.html');
    });

    app.get('/tabella/inserisci', function(req,res) {
        res.render('tabella/inserisci.html');
    });

    app.get('/tabella/richiedi', function(req,res) {
        res.render('tabella/richiedi.html');
    });

    app.get('/tabella/elimina', function(req,res) {
        res.render('tabella/elimina.html');
    });

    app.get('/tabella/modifica', function(req,res) {
        res.render('tabella/modifica.html');
    });

    app.get('/error', function(req,res) {
        res.render('error.html');
    });

    app.get('/tabella', function(req,res) {
        res.render('tabella.html');
    });

    app.get('/creaTabella', function(req,res) {
        res.render('creaTabella.html');
    });

    app.get('/modello', function(req,res) {
        res.render('modello.html');
    });

    app.get('/login', function(req,res) {
    res.render('login.html');
    });

    app.get('/register', function(req,res) {
        res.render('register.html');
    });
}
