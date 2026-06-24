import bcrypt from "bcryptjs";
import User from "./auth.modal.js";
import ApiError from "../../common/utils/api-error.js";
import { generateToken, verifyHash } from "../../common/utils/hash.js";
import ApiResponse from "../../common/utils/api-response.js";

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

const verify = async ({ email, rawToken }) => {
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
        { $set: { isVerified: true, verificationToken: null }, },
        { new: true, runValidators: true }
    );

    // now return
    return {
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        id: updatedUser._id,
    };
};

export const authService = { registerUser };
