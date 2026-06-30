import mongoose from "mongoose";
import { emailRegex, userRoles } from "../../common/utils/constants.js";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 1,
        maxLength: 100,
        trim: true,
        required: [true, "Please enter valid name"]
    },
    email: {
        type: String,
        minLength: 3,
        maxLength: 254,
        match: [emailRegex, "Please enter valid email"],
        trim: true,
        unique: true,
        lowercase: true,
        required: [true, "Please enter valid email"],
    },
    role: {
        type: String,
        enum: [userRoles.admin, userRoles.customer, userRoles.seller, userRoles.superAdmin],
        default: userRoles.customer
    },
    password: {
        type: String,
        select: false
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    verificationToken: {
        type: String,
        select: false
    },
    refreshToken: {
        type: String,
        select: false,
        index: true
    },
    resetPasswordToken: { type: String, select: false },
    resetPasswordExpires: { type: Date, select: false },
}, { timestamps: true })


export default mongoose.model("User", userSchema);