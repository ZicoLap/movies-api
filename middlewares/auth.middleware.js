import jwt from "jsonwebtoken";

export function authenticateUser(req, res, next) {
    const token = req.headers.authorization;
    console.log(token);
    if (!token) {
        return res.status(401).json({
            status: "error",
            error: "Unauthorized",
        });
    }
    try {
        const user = jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            console.log(err.message);
            if (err) {
                return res.status(401).json({
                    status: "error",
                    error: "Forbidden",
                });
            }
            console.log(user);
            req.user = user;
            next();
        }
        );
        
    } catch (error) {
        return res.status(401).json({ error: "Unauthorized" });
    }
  }