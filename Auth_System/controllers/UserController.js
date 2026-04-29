
// import connect from "../config/db.js";
// import * as UserModel from "../model/UserModel.js";

// export const register = async (req, res, next) => {
//     const {
//         name,
//         birthdate,
//         address,
//         program,
//         studentStatus,
//         email,
//         password
//     } = req.body;

//     let conn;

//     try {
//         conn = await connect();

//         const userProfile = {
//             name,
//             birthdate,
//             address,
//             program,
//             studentStatus
//         };

//         await UserModel.createUser(userProfile, email, password, conn);

//         res.status(201).json({
//             success: true,
//             message: "A new account has been created!"
//         });

//     } catch (e) {
//         next(e);

//     } finally {
//         if (conn) conn.release();
//     }
// };


// export const login = async (req, res, next) => {
//     const { email, password } = req.body;

//     let conn;

//     try {
//         conn = await connect();

//         const token = await UserModel.login(email, password, conn);

//         res.status(200).json({
//             success: true,
//             message: "Login successful!",
//             token
//         });

//     } catch (e) {
//         next(e);

//     } finally {
//         if (conn) conn.release();
//     }
// };

import connect from "../config/db.js";
import * as UserModel from "../model/UserModel.js";

// ====================== REGISTER ======================
export const register = async (req, res, next) => {
    const {
        name,
        birthdate,
        address,
        program,
        studentStatus,
        email,
        password
    } = req.body;

    let conn;

    try {
        conn = await connect();

        const userProfile = {
            name,
            birthdate,
            address,
            program,
            studentStatus
        };

        const result = await UserModel.createUser(
            userProfile,
            email,
            password,
            conn
        );

        res.status(201).json({
            success: true,
            message: "A new account has been created!",
            data: result
        });

    } catch (e) {
        next(e);

    } finally {
        if (conn) conn.release();
    }
};


export const login = async (req, res, next) => {
    const { email, password } = req.body;

    let conn;

    try {
        conn = await connect();

        const token = await UserModel.login(email, password, conn);

        res.status(200).json({
            success: true,
            message: "Login successful!",
            token
        });

    } catch (e) {
        next(e);

    } finally {
        if (conn) conn.release();
    }
};

