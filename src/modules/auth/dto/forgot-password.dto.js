import Joi from "joi";
import BaseDTO from "../../../common/dto/base.dto.js";

class ForgotPasswordDto extends BaseDTO {
    static schema = Joi.object({
        email: Joi.string().email().trim().lowercase().min(3).max(254).required(),
    })
}

export default ForgotPasswordDto;