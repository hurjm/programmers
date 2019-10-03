module.exports = (sequelize, DataTypes) => {
  return sequelize.define('schedules', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    sTime: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    eTime: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    cycle: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    timestamps: true,
  });
};