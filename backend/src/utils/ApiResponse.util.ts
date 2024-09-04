
import { ApiResponseType } from "../types/ApiResponseType";

export default class ApiResponse implements ApiResponseType{
    success: boolean;
    statusCode: number;
    statusMessage: string;
    data: any;
    message: string|any;
    redirect: string | null;
 constructor(success:boolean,statusCode:number,statusMessage:string,data:any,message:string|any,redirect:string|null)
 {
    this.success=success,
    this.statusCode=statusCode,
    this.statusMessage=statusMessage,
    this.message=message,
    this.redirect=redirect
 }
    
}