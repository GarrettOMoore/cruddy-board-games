        // REQUIRES
var express = require('express');
var methodOverride = require('method-override');
var db = require('./models');
var app = express();

        // MIDDLEWARE
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/static"));
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));

app.get('/games/new', function(req, res) {
    res.render('games/new');
});

app.post('/games/', function(req, res) {
    db.game.create({
        name: req.body.name,
        players: parseInt(req.body.players),
        description: req.body.description
    }).then(function(){
        res.redirect('/games/');
    })
});

app.get('/', function(req, res) {
    res.render("index");
});

app.get('/games', function(req, res) {
    //try and get all records
    db.game.findAll().then(function(games){
        //Find data within data object
        console.log(games);
        //res.render data into ejs page
        res.render("games/index", {games});
    });
});

app.get('/games/:id', function(req, res) {
    db.game.findById(parseInt(req.params.id)).then(function(game) {
        res.render("games/show", {game});
    });
});

app.get('/games/:id/edit', function(req, res) {
    db.game.findById(parseInt(req.params.id)).then(function(game) {
        res.render("games/edit", {game});
    });
});

app.put('/games/:id', function(req, res) {
    db.game.update ({
        name: req.body.name,
        players: parseInt(req.body.players),
        description: req.body.description
    },
    {
        where: {
            id: parseInt(req.params.id)
        }
    }).then(function(game) {
        res.redirect("/games/" + parseInt(req.params.id));
    });
});

app.delete('/games/:id', function(req, res) {
    db.game.destroy ({
       where: { id: parseInt(req.params.id) }
    }).then(function(){
        res.redirect('/games/');
    })
})

app.listen(3000);
