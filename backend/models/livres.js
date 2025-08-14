'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Livre extends Model {
    static associate(models) {
      // définir les associations ici si besoin
    }
  }

  Livre.init({
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: true,
      }
    },
    titre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    auteur: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    motsCle1: { type: DataTypes.STRING, allowNull: true },
    motsCle2: { type: DataTypes.STRING, allowNull: true },
    motsCle3: { type: DataTypes.STRING, allowNull: true },
    motsCle4: { type: DataTypes.STRING, allowNull: true },
    motsCle5: { type: DataTypes.STRING, allowNull: true },
    anneeSortie: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 1000,
        max: 9999,
      }
    },
    nbTomes: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 1,
      }
    },
    booknodeUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: true,
      }
    }
  }, {
    sequelize,
    modelName: 'Livre',
    tableName: 'livres',
    timestamps: false, // supprime createdAt et updatedAt
  });

  return Livre;
};
