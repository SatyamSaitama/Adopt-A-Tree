
module.exports = (sequelize, DataTypes) => {
  const Produce = sequelize.define('Produce', {
    produceName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    TreeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  });

  

  return Produce;
};
