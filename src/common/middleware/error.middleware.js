import ApiResponse from "../utils/api-response.js";

const errorHandler = (err, req, res, next) => {
    ApiResponse.error(res, err)
}


export default errorHandler;