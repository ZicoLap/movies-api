import jwt from "jsonwebtoken";

export function generateToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
}


export function asyncHandler(fn) {

  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

// another way to hadle async function
export function asyncWrapper(fn) {
    return async (req, res, next) => {
        try {
          await fn(req, res, next);
        } catch (error) {
          next(error);
        }
      };
}