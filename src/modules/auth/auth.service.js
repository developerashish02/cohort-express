import bcrypt from "bcryptjs";
import User from "./auth.modal.js";
import ApiError from "../../common/utils/api-error.js";
import { generateToken } from "../../common/utils/hash.js";

const generateHash = async (value) => {
    return await bcrypt.hash(value, 10);
}

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
    return { name: user.name, email: user.email, role: user.role, id: user._id }
}

export const authService = { registerUser };