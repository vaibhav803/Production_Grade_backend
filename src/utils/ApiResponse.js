class ApiResponse {
    constructor(statusCode, data, message = "Success"){
        this.data = data
        this.success = statusCode < 400
        this.statusCode = statusCode
        this.message = message
        

    }
}