import jwt from "jsonwebtoken";

const generateAccessToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_ACCESS_SECRET,
        {
            expiresIn: process.env.JWT_ACCESS_EXPIRE_IN,
        });
};

const generateRefreshToken = (payload) => {
    return jwt.sign(
        payload,
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: process.env.JWT_REFRESH_EXPIRE_IN, }
    );
};

export { generateAccessToken, generateRefreshToken };
