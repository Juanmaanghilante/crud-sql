

module.exports = (sequelize,DataTypes)=> {
    const alias ="Movie"
    const cols ={
        id:{
            type:DataTypes.INTEGER.UNSIGNED,
            primaryKey:true,
            autoIncrement:true
        },
        title:{
            type:DataTypes.STRING(500),
            // allowNull:false,
        },
        rating:{
            type:DataTypes.DECIMAL(3,1),
        },
        awards:{
            type:DataTypes.INTEGER.UNSIGNED,
        },
        release_date:{
            type:DataTypes.DATE,
        },
        length:{
            type:DataTypes.INTEGER.UNSIGNED,
        },
        genre_id:{
            type:DataTypes.INTEGER.UNSIGNED,
        },
        created_at:{
            type:DataTypes.DATE,
        },
        updated_at:{
            type:DataTypes.DATE,
        },

    }
    const config={
        tableName:"movies",
        timestamps:false
        
    }
    const movie= sequelize.define(alias,cols,config)
    return movie
}
