const db= require("../database/models")
const op=(db.Sequelize.Op)

module.exports={
    list: async(req,res)=>{
        
        try {
            const movies= await db.Movie.findAll()
           return res.render("moviesList",{movies:movies})
        } 
        catch (error) {
            
            console.log(error);
        }
    },
    detail: async(req,res)=>{
        
        try {
            const movie= await db.Movie.findByPk(req.params.id)
           return res.render("moviesDetail",{movie:movie})
        } 
        catch (error) {
            
            console.log(error);
        }
    },
    new: async(req,res)=>{
        
        try {
            const movies= await db.Movie.findAll({
                order:[["release_date","DESC"]],
                limit:5,
                offset:5

            })
           return res.render("newestMovies",{movies:movies})
        } 
        catch (error) {
            
            console.log(error);
        }
    },
    recommended: async(req,res)=>{
        
        try {
            const movies= await db.Movie.findAll({
               where:{rating:{[op.gt]:8}},
                order:[["rating","DESC"]],
                limit:8

            })
           return res.render("recommendedMovies",{movies:movies})
        } 
        catch (error) {
            
            console.log(error);
        }
    },
    
}