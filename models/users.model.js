import sequelize from "../utils/db.js";
import { DataTypes } from "sequelize";



const User = sequelize.define(
  "User",
  {
    // Model attributes are defined here
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      
    },
    password: {
      type: DataTypes.STRING,
      
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      
    },
  },
  {
    // Other model options go here
  }
);

User.associate = (models) => {
  User.hasMany(models.Review, { foreignKey: 'userId', as: 'reviews' });
}


export  { User };
