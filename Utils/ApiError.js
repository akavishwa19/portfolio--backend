export class ApiError{
    constructor(
        statuscode,
        message='something went wrong',       
    ){     
        this.statuscode=statuscode,
        this.message=message,
        this.success=false
    }
}