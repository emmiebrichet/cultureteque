'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Serie extends Model {
    static associate(models) {
      // définir les associations ici si besoin
    }
  }
  Serie.init({
    imageUrl: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    titre: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    acteurs1: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    acteurs2: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    acteurs3: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    acteurs4: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    acteurs5: {
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
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    anneeSortie: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 1900,
        max: 2100,
      }
    },
    nbSaisons: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 1,
      }
    },
    youtubeTeaserUrl: {
      type: DataTypes.STRING(255),
      allowNull: true,
      validate: {
        isUrl: true,
      }
    }
  }, {
    sequelize,
    modelName: 'Serie',
    tableName: 'series',
    timestamps: false,  // créé automatiquement createdAt et updatedAt
  });

  return Serie;
};
