module.exports = function(sequelize, Sequelize) {
 
    var User = sequelize.define('user', {
 
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
 
        firstname: {
            type: Sequelize.STRING,
            allowNull: false
        },
 
        lastname: {
            type: Sequelize.STRING,
            allowNull: false
        },
 
        username: {
            type: Sequelize.TEXT
        },
        email: {
            type: Sequelize.STRING,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        last_login: {
            type: Sequelize.DATE
        },
        status: {
            type: Sequelize.ENUM('active', 'inactive'),
            defaultValue: 'active'
        }
 
 
    });
    User.associate = function(models) {
        // Associating User with Searches
        // When an User is deleted, also delete any associated Searches
        User.hasMany(models.Search, {
          onDelete: "cascade"
        });
      };    
 
    return User;
    };