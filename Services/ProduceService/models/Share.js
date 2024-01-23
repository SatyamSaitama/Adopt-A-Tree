
module.exports = (sequelize, DataTypes) => {
  const Share = sequelize.define('Share', {
    product :{
        type : DataTypes.STRING,
        allowNull : false
    },
    numberOfTree: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    relationshipTime: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    UserId:{
      type: DataTypes.INTEGER,
      defaultValue: 0,
    }
  });

  

  return Share;
};
