'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Serie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Serie.init({
    imageUrl: DataTypes.STRING,
    titre: DataTypes.STRING,
    acteur: DataTypes.STRING,
    genre: DataTypes.STRING,
    motsCle1: DataTypes.STRING,
    motsCle2: DataTypes.STRING,
    motsCle3: DataTypes.STRING,
    motsCle4: DataTypes.STRING,
    motsCle5: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Serie',
  });
  return Serie;
};