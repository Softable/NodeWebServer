module.exports = function(app)
{
    app.get('/', function(req,res) {
        res.render('index.html');
    });
    app.get('/inserisci', function(req,res) {
        res.render('inserisci.html');
    });
}
