
import { User } from "./users.model.js";
import { Movie } from "./movies.model.js";
import { Review } from "./reviews.model.js";

const models = {
  User,
  Movie,
  Review,
};

Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

export { User, Movie, Review  };