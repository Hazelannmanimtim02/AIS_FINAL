import jwt from "jsonwebtoken";
import { doesUserExist } from "../model/UserModel.js";
import connect from "../config/db.js";

const authHandler = async (req, res, next) => {
    const authorization = req.headers.authorization;

    if (!authorization) {
        return res.status(401).json({
            success: false,
            message: [{ result: "No token provided" }]
        });
    }

    const token = authorization.split(" ")[1];

    let conn;

    try {
        const { id } = jwt.verify(token, process.env.SECRET);

        conn = await connect();
        await doesUserExist(id, conn);

        next();

    } catch (err) {
        return res.status(401).json({
            success: false,
            message: [{ result: "Request is unauthorized" }]
        });

    } finally {
        if (conn) conn.release();
    }
};

export default authHandler;