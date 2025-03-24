
import sequelize  from "../utils/db.js";
import { DataTypes } from "sequelize";



const Movie = sequelize.define("movies", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  genre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  releaseDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});



export { Movie } ;