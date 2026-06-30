import jwt from "jsonwebtoken";
import ApiError from "./api-error.js";

const generateAccessToken = async (payload) => {
    return jwt.sign(payload, process.env.JWT_ACCESS_SECRET,
        {
            expiresIn: process.env.JWT_ACCESS_EXPIRE_IN,
        });
};

const generateRefreshToken = async (payload) => {
    return jwt.sign(
        payload,
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: process.env.JWT_REFRESH_EXPIRE_IN, }
    );
};

const verifyAccessToken = async (token) => {
    try {
        return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    } catch (error) {
        throw ApiError.unAuthorized("Unauthorized")
    }
}

const verifyRefreshToken = async (token) => {
    try {
        return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    } catch (error) {
        throw ApiError.unAuthorized("Unauthorized")
    }
}


export { generateAccessToken, generateRefreshToken, verifyRefreshToken, verifyAccessToken };
