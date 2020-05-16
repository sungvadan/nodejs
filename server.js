var express = require('express')

var app = express()
app.get('/', function(req, res) {
    res.setHeader('Content-Type', 'text/plain')
    res.send('Vous êtes à l\'accueil')
})

app.get('/etage/:etagenum/chambre', function(req, res) {
    res.render('chambre.ejs', {etage: req.params.etagenum})
})
app.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send('Page introuvable !');
});

app.listen(8088)