import { authService } from "./auth.service.js";
import ApiResponse from "../../common/utils/api-response.js";

const registerUser = async (req, res) => {
    console.log(`[REQ BODY]:- ${req.body}`) ;
    await authService(req.body);


    ApiResponse.create(res, "User created sucessfully", user);
}


export { registerUser };