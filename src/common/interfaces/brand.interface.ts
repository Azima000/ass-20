import { Document, Types } from "mongoose";



export interface IBrand extends Document{
    name:string,
    image?:string,
    slug:string,
    createdBy:Types.ObjectId,
    updatedBy:Types.ObjectId,
    updateAt:string,
    DeletedAt:string,
    createAt:string,
    restoreAt:string
}