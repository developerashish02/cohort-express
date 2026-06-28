import Joi from "joi";
import BaseDTO from "../../../common/dto/base.dto.js";

class LoginDto extends BaseDTO {
    static schema = Joi.object({
        email: Joi.string().email().trim().lowercase().min(3).max(254).required(),
        password: Joi.string().min(8).max(100).trim().required(),
    })
}

export default LoginDto; 