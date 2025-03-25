import jwt from "jsonwebtoken";

export async function authenticateUser(req, res, next) {
    const token = req.headers.authorization;
    console.log(token);
    
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    console.log("Token has been found");

    try {
        console.log("Try to verify the token");
        const decoded = await new Promise((resolve, reject) => {
            jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(user);
                }
            });
        });

        console.log(decoded);
        req.user = decoded;
        console.log("User has been decoded");
        next();
        
    } catch (error) {
        console.error(error.message);
        return res.status(401).json({ status: "error", error: "Forbidden" });
    }
}
