import bcrypt from "bcryptjs";
import User from "./auth.modal.js";
import ApiError from "../../common/utils/api-error.js";
import {
    generateHashToken,
    generateToken,
    verifyHash,
} from "../../common/utils/hash.js";
import ApiResponse from "../../common/utils/api-response.js";
import {
    generateAccessToken,
    generateRefreshToken,
} from "../../common/utils/jwt.utils.js";

const generateHash = async (value) => {
    return await bcrypt.hash(value, 10);
};

const registerUser = async ({ name, email, password }) => {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw ApiError.conflict("User already exist");
    }

    const hashPassword = await generateHash(password);
    const { hashToken, rawToken } = generateToken();

    const user = await User.create({
        name,
        email,
        password: hashPassword,
        verificationToken: hashToken,
    });

    // TODO:- Verify the email
    return { name: user.name, email: user.email, role: user.role, id: user._id };
};

const verifyUser = async ({ email, rawToken }) => {
    // STEP1: check user exist with this email id and get required fields
    const user = await User.findOne({ email }).select("+verificationToken");
    // STEP2: if user not found throw error not found
    if (!user) {
        throw ApiError.notFound("User not found with this email.");
    }
    // STEP3 check if user is already verified
    if (user.isVerified) {
        throw ApiError.badRequest("User is already verified.");
    }

    // STEP4 : Verify token
    const tokenVerify = verifyHash(rawToken, user.verificationToken);

    if (!tokenVerify) {
        throw ApiError.unAuthorized("Invalid or expired verification token");
    }

    // STEP5 : mark the user verify and delete verification token from the db

    const updatedUser = await User.findByIdAndUpdate(
        user._id,
        { $set: { isVerified: true, verificationToken: null } },
        { new: true, runValidators: true },
    );

    // now return
    return {
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        id: updatedUser._id,
    };
};

const loginUser = async ({ email, password }) => {
    // STEP:1 check email exist in the db
    const user = await User.findOne({ email }).select("+password");
    // STEP:2 when user is not present throw the error
    if (!user) {
        throw ApiError.notFound(`User not found with this ${email} email.`);
    }
    // STEP3: check user if verify or not
    if (!user.isVerified) {
        throw ApiError.unAuthorized(`User not verified`);
    }
    // STEP4: compare password
    const isMatch = await bcrypt.compare(password, user.password);
    // STEP5: password not match throw error
    if (!isMatch) {
        throw ApiError.unAuthorized("Invalid password");
    }
    // STEP6: generate accessToken and refresh token
    const payload = { userId: user._id, role: user.role };
    const accessToken = await generateAccessToken(payload);
    const refreshToken = await generateRefreshToken(payload);
    // STEP7: generate hash of refreshToken to store in db
    const hashRefreshToken = generateHashToken(refreshToken);
    const updatedUser = await User.findByIdAndUpdate(
        user._id,
        { $set: { refreshToken: hashRefreshToken } },
        { new: true, runValidators: true },
    );

    // TODO:- send the accessToken and refreshToken to the user in cookie http only

    // STEP8: send the response to the user
    return {
        accessToken,
        refreshToken,
        user: {
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role,
            id: updatedUser._id,
        },
    };
};

const getMe = async (userId) => {
    const user = await User.findById(userId);
    if (!user) {
        throw ApiError.notFound("User not found");
    }
    return {
        name: user.name,
        email: user.email,
        role: user.role,
        id: user._id,
    };
};

const logoutUser = async (userId) => {
    await User.findByIdAndUpdate(
        userId,
        { $set: { refreshToken: null } },
        { new: true, runValidators: true },
    );
};

const forgotPassword = async (email) => {
    // STEP1:- check user exist with this email
    const user = await User.findOne({ email });
    // STEP2:- if email not in the database for the security share the generic response
    if (!user) {
        return null;
    }
    // STEP3: generate resetPasswordToken and resetPasswordExpire time
    const { rawToken, hashToken } = generateToken();
    const resetPasswordExpire = new Date(Date.now() + 15 * 60 * 1000); // 15 min 

    // STEP4: store hash token in the database and time
    await User.findByIdAndUpdate(
        user._id,
        {
            $set: {
                resetPasswordToken: hashToken,
                resetPasswordExpires: resetPasswordExpire,
            },
        },
        { new: true, runValidators: true },
    );
    // STEP5: send the raw token to the email
    // TODO send email with raw token
};

export const authService = {
    registerUser,
    verifyUser,
    loginUser,
    getMe,
    logoutUser,
    forgotPassword
};
