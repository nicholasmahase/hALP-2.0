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
  
    return Search;
  };
