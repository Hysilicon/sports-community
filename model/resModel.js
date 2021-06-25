class BaseModel {
    constructor(data, msg) {
        if (typeof data === 'string') {
            this.message = data
            data = null
            msg = null
        }
        if (data) {
            this.data = data
        }
        if (msg) {
            this.message = msg
        }
    }
}

class Success extends BaseModel {
    constructor(data, message) {
        super(data, message)
        this.errnum = 0
    }
}

class Error extends BaseModel {
    constructor(data, message) {
        super(data, message)
        this.errnum = -1
    }
}

module.exports = {
    Success,
    Error
}