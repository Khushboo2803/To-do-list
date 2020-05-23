
class errorResponse extends Error {
    constructor(code, message, data = null) {
        super(message);
        this.message = message;
        this.msg = message;
        this.response = false;
        this.statusName = code.codeName;
        this.statusCode = code.code;
        this.data = data;
    }
}

class successResponse {
    constructor(code, message, data = null) {
        this.message = message;
        this.response = true;
        this.statusName = code.codeName;
        this.statusCode = code.code;
        this.data = data;
    }
}

module.exports = { errorResponse, successResponse }