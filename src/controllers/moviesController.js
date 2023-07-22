const path = require('path');
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");


//Aqui tienen una forma de llamar a cada uno de los modelos
// const {Movies,Genres,Actor} = require('../database/models');

//Aquí tienen otra forma de llamar a los modelos creados
const Movies = db.Movie;
const Genres = db.Genre;
const Actors = db.Actor;


const moviesController = {
    'list': (req, res) => {
        db.Movie.findAll()
            .then(movies => {
                res.render('moviesList.ejs', {movies})
            })
    },
    'detail': (req, res) => {
        db.Movie.findByPk(req.params.id,{include:[{association:'generos'},{association:'actores'}]})
            .then(movie => {
              //  res.render('moviesDetail.ejs', {movie});//
              res.send(movie)
            });
    },
    'new': (req, res) => {
        db.Movie.findAll({
            order : [
                ['release_date', 'DESC']
            ],
            limit: 5
        })
            .then(movies => {
                res.render('newestMovies', {movies});
            });
    },
    'recomended': (req, res) => {
        db.Movie.findAll({
            where: {
                rating: {[db.Sequelize.Op.gte] : 8}
            },
            order: [
                ['rating', 'DESC']
            ]
        })
            .then(movies => {
                res.render('recommendedMovies.ejs', {movies});
            });
    },
    //Aqui dispongo las rutas para trabajar con el CRUD
    add: async function (req, res) {
       try {
       const generos= await db.Genre.findAll()
        res.render('moviesAdd',{allGenres:generos})
       } catch (error) {
        console.log(error);
       }
        
    },
    create: async function (req,res) {
try {
   console.log(req.body);
    const actores=[{
        id:1,
    apariciones:3,
    rating:1,
    },
    {
        id:5,
    apariciones:5,
    rating:10,
    },{
        id:9,
    apariciones:6,
    rating:6,
    }
]
   const peliculaCreada=await db.Movie.create({
        title: req.body.title,
  rating: req.body.rating,
  awards: req.body.awards,
  release_date: req.body.release_date,
  length: req.body.length,
  genre_id: req.body.genre_id,
  
        
    })

for (let i = 0; i< actores.length; i++) {
 await peliculaCreada.addActor(actores[i].id,{through:{rating:actores[i].rating,participaciones:actores[i].apariciones}})
    }

    res.redirect('/movies')
} catch (error) {
    console.log(error);
}
    },
    edit:async function(req,res) {
        try {
            const movies= db.Movie.findByPk(req.params.id)
            const genre=db.Genre.findAll()
            const [peliculas,generos]= await Promise.all([movies,genre])
            res.render('moviesEdit',{Movie:peliculas,allGenres:generos})
        } catch (error) {
            console.log(error);
        }

    },
    update: async function (req,res) {
try {
  await  db.Movie.update({
...req.body
  },{
    where:{
        id:req.params.id
    }

  })


    res.redirect('/movies')
} catch (error) {
    console.log(error);
}
    },
    delete: function (req,res) {

    },
    destroy: function (req,res) {

    }

}

module.exports = moviesController;