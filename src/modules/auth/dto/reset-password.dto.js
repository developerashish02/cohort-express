import Joi from "joi";
import BaseDTO from "../../../common/dto/base.dto.js";

class ResetPasswordDto extends BaseDTO {
    static schema = Joi.object({
        password: Joi.string().min(8).max(100).trim().required(),

    })
}

export default ResetPasswordDto;