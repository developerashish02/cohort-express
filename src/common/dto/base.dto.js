import Joi from "joi";

class BaseDTO {
    static schema = Joi.object({});

    static validate(data) {
        const { error, value } = this.schema.validate(data, {
            abortEarly: true,
            stripUnknown: true
        });



        if (error) {
            const errors = error.details.map((e) => e.message);
            return {
                errors,
                value: null
            }
        }

        return {
            value,
            errors: null
        }
    }
}

export default BaseDTO;