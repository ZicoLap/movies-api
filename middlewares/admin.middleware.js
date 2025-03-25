import { User } from "../models/index.js";

export async function isAdmin(req, res, next) {
    try {
        const user = await User.findByPk(req.user.id);
        
        if (!user || !user.isAdmin) {
            return res.status(403).json({
                status: "error",
                error: "Forbidden",
            });
        }

        next();
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ status: "error", error: "Server Error" });
    }
}
