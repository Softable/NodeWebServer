module.exports = function(app)
{
    app.get('/', function(req,res) {
        res.render('Utenti/index.html');
    });
    app.get('/inserisci', function(req,res) {
        res.render('Utenti/inserisci.html');
    });
}
