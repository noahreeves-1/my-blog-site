"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseError = void 0;
const http_model_1 = require("../types/http.model");
class BaseError extends Error {
    constructor(log, message = log, methodName, httpCode = http_model_1.HttpStatusCode.INTERNAL_SERVER_ERROR, isOperational = true) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.log = log;
        if (methodName)
            this.methodName = methodName;
        this.httpCode = httpCode;
        this.isOperational = isOperational;
        Error.captureStackTrace(this);
    }
}
exports.BaseError = BaseError;
//# sourceMappingURL=base-error.js.map