import { DataTypes } from "sequelize";
import sequelize from "../utils/db.js";

const Review = sequelize.define('Review', {
    text: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rating: {
        type: DataTypes.INTEGER,
        min: 1,
        max: 5,
        allowNull: false
    },
    movieId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

Review.associate = (models) => {
    Review.belongsTo(models.User, { foreignKey: 'userId', as : 'user'  });
    Review.belongsTo(models.Movie, { foreignKey: 'movieId', as : 'movie' });
};



export { Review };