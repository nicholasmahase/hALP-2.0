module.exports = function(sequelize, Sequelize) {
 
    var Search = sequelize.define('search', {
 
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
 
        search: {
            type: Sequelize.STRING,
            notEmpty: true
        },
 
        location: {
            type: Sequelize.STRING,
            notEmpty: false
        },
 
    });
 
    return Search;
 
}