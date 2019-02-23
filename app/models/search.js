module.exports = function(sequelize, DataTypes) {
    var Search = sequelize.define("search", {
      search: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      location: {
        type: DataTypes.STRING,
        allowNull: true,
      }
    });
  
    Search.associate = function(models) {
      // We're saying that a Post should belong to an Author
      // A Post can't be created without an Author due to the foreign key constraint
      Search.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      });
    };
  
    return Search;
  };
