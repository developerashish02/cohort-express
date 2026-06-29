import { authService } from "./auth.service.js";
import ApiResponse from "../../common/utils/api-response.js";

const registerUser = async (req, res, next) => {
    try {
        const user = await authService.registerUser(req.body);
        ApiResponse.create(res, "User created successfully", user);
    } catch (error) {
        next(error)
    }
};

const verifyUser = async (req, res, next) => {
    try {
        const user = await authService.verifyUser(req.body);
        ApiResponse.ok(res, "User verified successfully", user);
    } catch (error) {
        next(error)
    }
}

const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const result = await authService.loginUser({ email, password });

        res.cookie("accessToken", result.accessToken, {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production"
        })

        res.cookie("refreshToken", result.refreshToken, {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production"
        })

        ApiResponse.ok(res, "User login successfully", result.user);
    } catch (error) {
        next(error)
    }
}


const getMe = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const result = await authService.getMe(userId);
        ApiResponse.ok(res, "User data retrive suceefully", result);
    } catch (error) {
        next(error)
    }
}


const logoutUser = async (req, res, next) => {
    try {
        const userId = req.user.id;
        await authService.logoutUser(userId);

        res.clearCookie("accessToken", {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production"
        })

        res.clearCookie("refreshToken", {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production"
        })

        ApiResponse.ok(res, "User logout successfully");

    } catch (error) {
        next(error)
    }
}


const forgotPassword = async (req, res, next) => {
    try {
        const email = req.body.email;
        await authService.forgotPassword(email);
        ApiResponse.ok(res, "If an account exists with this email, a reset link has been sent.");
    } catch (error) {
        next(error)
    }
}


const resetPassword = async (req, res, next) => {
    try {
        const token = req.params.token;
        const newPassword = req.body.password;
        await authService.resetPassword(token, newPassword);
        ApiResponse.ok("Password reset successfully");
    } catch (error) {
        next(error)
    }
}

export { registerUser, verifyUser, loginUser, getMe, logoutUser, forgotPassword, resetPassword };
