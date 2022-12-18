"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIError = void 0;
const http_model_1 = require("../types/http.model");
const base_error_1 = require("./base-error");
class APIError extends base_error_1.BaseError {
    constructor(message, methodName = '', httpCode = http_model_1.HttpStatusCode.INTERNAL_SERVER_ERROR, isOperational = true) {
        super('', message, methodName, httpCode, isOperational);
    }
}
exports.APIError = APIError;
//# sourceMappingURL=api-error.js.map