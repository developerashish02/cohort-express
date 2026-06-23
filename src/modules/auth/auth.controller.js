import { authService } from "./auth.service.js";
import ApiResponse from "../../common/utils/api-response.js";

const registerUser = async (req, res) => {
    const user = await authService.registerUser(req.body);
    ApiResponse.create(res, "User created successfully", user);
};

export { registerUser };
