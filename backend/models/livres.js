'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Livre extends Model {
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
    motsCle5: DataTypes.STRING,
    anneeSortie: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 1000,
        max: 9999
      }
    },
    nbTomes: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 1
      }
    },
    booknodeUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: true
      }
    }
  }, {
    sequelize,
    modelName: 'Livre',
  });
  return Livre;
};
