'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Livre extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Livre.init({
    imageUrl: DataTypes.STRING,
    titre: DataTypes.STRING,
    auteur: DataTypes.STRING,
    description: DataTypes.TEXT,
    genre: DataTypes.STRING,
    motsCle1: DataTypes.STRING,
    motsCle2: DataTypes.STRING,
    motsCle3: DataTypes.STRING,
    motsCle4: DataTypes.STRING,
    motsCle5: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Livre',
  });
  return Livre;
};