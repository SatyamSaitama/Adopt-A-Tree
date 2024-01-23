
module.exports = (sequelize, DataTypes) => {
  const Tree = sequelize.define('Tree', {
    treeName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isAdopted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    UserId :{
      type : DataTypes.INTEGER,
      defaultValue : 0
    }
  });

  

  return Tree;
};
