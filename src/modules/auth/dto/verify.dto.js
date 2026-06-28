import Joi from "joi";
import BaseDTO from "../../../common/dto/base.dto.js";

class VerifyDto extends BaseDTO {
    static schema = Joi.object({
        email: Joi.string().email().trim().lowercase().min(3).max(254).required(),
        verificationToken: Joi.string().required(),
    })
}

export default VerifyDto;