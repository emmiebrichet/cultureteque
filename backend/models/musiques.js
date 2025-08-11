'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Musique extends Model {
    static associate(models) {
      // définir les associations ici si besoin
    }
  }
  Musique.init({
    imageUrl: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    artiste: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    album: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    genre: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    motsCle1: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    motsCle2: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    motsCle3: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    motsCle4: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    motsCle5: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    anneeSortie: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 1900,
        max: 2100
      }
    },
    spotifyUrl: {
      type: DataTypes.STRING(255),
      allowNull: true,
      validate: {
        isUrl: true
      }
    }
  }, {
    sequelize,
    modelName: 'Musique',
    tableName: 'musiques',
    timestamps: true,  // createdAt et updatedAt automatiques
  });

  return Musique;
};
