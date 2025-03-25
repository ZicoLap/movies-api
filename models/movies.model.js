
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

Movie.associate = (models) => {
  Movie.hasMany(models.Review, { foreignKey: 'movieId', as: 'reviews' });
}



export { Movie } ;