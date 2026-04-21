import validator from "validator";
import bcrypt from "bcryptjs";
import tokenGenerator from "../utils/tokenGenerator.js";
import generateException from "../utils/exceptionGenerator.js";

// ====================== REGISTER ======================
export const createUser = async (userProfile, email, password, conn) => {

    email = email?.trim();
    password = password?.trim();

    if (!email || !password) {
        const error = new Error("Email and Password are required.");
        error.statusCode = 400;
        throw error;
    }

    if (!validator.isEmail(email)) {
        const error = new Error("Invalid email address.");
        error.statusCode = 400;
        throw error;
    }

    if (!validator.isStrongPassword(password)) {
        const error = new Error(
            "Password must be at least 8 chars, include uppercase, lowercase, number, and symbol."
        );
        error.statusCode = 400;
        throw error;
    }

    const [existingUser] = await conn.query(
        "SELECT email FROM tblusers WHERE email = ?",
        [email]
    );

    if (existingUser.length > 0) {
        const error = new Error(`The email ${email} is already used.`);
        error.statusCode = 400;
        throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // ====================== EXTERNAL API (FULL PROFILE OUTPUT) ======================
    let apiResponseData = null;

    try {
        const response = await fetch(
            "https://ais-simulated-legacy.onrender.com/api/students",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userProfile)
            }
        );

        apiResponseData = await response.json();

    } catch (err) {
        console.log("External API failed (ignored):", err.message);
    }

    // ====================== SAVE TO MYSQL (ONLY EMAIL + PASSWORD) ======================
    const [result] = await conn.query(
        `INSERT INTO tblusers (email, password) VALUES (?, ?)`,
        [email, hashedPassword]
    );

    // ====================== RETURN FAKE-MONGO STYLE OUTPUT ======================
    return {
        _id: apiResponseData?._id || result.insertId,
        name: userProfile.name,
        birthdate: userProfile.birthdate,
        address: userProfile.address,
        program: userProfile.program,
        studentStatus: userProfile.studentStatus,
        createdAt: apiResponseData?.createdAt || new Date(),
        updatedAt: apiResponseData?.updatedAt || new Date(),
        __v: 0
    };
};

// ====================== LOGIN (FIXED - THIS WAS MISSING) ======================
export const login = async (email, password, conn) => {

    email = email?.trim();
    password = password?.trim();

    if (!email || !password) {
        throw new Error("Email and Password are required.");
    }

    const [rows] = await conn.query(
        "SELECT * FROM tblusers WHERE email = ?",
        [email]
    );

    const user = rows?.[0];

    if (!user) {
        throw new Error("Account does not exist.");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error("Incorrect password.");
    }

    return tokenGenerator(user.id);
};