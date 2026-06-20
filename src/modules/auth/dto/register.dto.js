import Joi from "joi";
import BaseDTO from "../../../common/dto/base.dto.js";
import { emailRegex, userRoles } from "../../../common/utils/constants.js";

class RegisterDto extends BaseDTO {
    static schema = Joi.object({
        name: Joi.string().trim().min(1).max(100).required(),
        email: Joi.string().email().trim().lowercase().min(3).max(254).required(),
        password: Joi.string().min(8).max(100).trim().required(),
    })
}

export default RegisterDto; 