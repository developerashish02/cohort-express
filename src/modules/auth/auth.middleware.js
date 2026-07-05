import ApiError from "../../common/utils/api-error.js";
import { verifyAccessToken } from "../../common/utils/jwt.utils.js";
import User from "../auth/auth.modal.js";

const authMiddleware = async (req, res, next) => {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
        throw ApiError.unAuthorized("Unauthorized");
    }
    const payload = await verifyAccessToken(accessToken);
    const user = await User.findById(payload.userId);
    if (!user) {
        throw ApiError.unAuthorized("Unauthorized");
    }
    req.user = {
        id: user.id,
        name: user.name,
        role: user.role,
        email: user.email
    }
    next();
}
export { authMiddleware };

