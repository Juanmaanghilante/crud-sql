module.exports = (sequelize,DataTypes)=> {
    const alias ="Genre"
    const cols ={
        id:{
            type:DataTypes.INTEGER.UNSIGNED,
            primaryKey:true,
            autoIncrement:true
        },
        name:{
            type:DataTypes.STRING(100),
            // allowNull:false,
        },
        ranking:{
            type:DataTypes.INTEGER.UNSIGNED,
        },
        active:{
            type:DataTypes.TINYINT,
        },
        created_at:{
            type:DataTypes.DATE,
        },
        updated_at:{
            type:DataTypes.DATE,
        },

    }
    const config={
        tableName:"genres",
        timestamps:false
        
    }
    const genre= sequelize.define(alias,cols,config)
    return genre
}