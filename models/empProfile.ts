//data in mongodb is represented as javascript object
//so we need to have blueprint schema of our object database
//required to import mongoose + and take schema from mongoose + and finally create our own video/author schema
//finally create model from that schema and export it.
//1st arg - modelName 2nd- SchemaName 3rd - collectionName

import mongoose, {Document, Schema} from "mongoose";
import {IAddressModel} from "../models/Address";
export interface IEmployee {
    firstName: string,
    lastName: string,
    emailId: string,
    phoneNumber: number,
    address: IAddressModel[];
}

//create another interface IEModel from basic interface & Document
export interface IEmployeeModel extends IEmployee, Document{};

//create schema 
const employeeSchema: Schema = new Schema({

    firstName: {type: String},
    lastName:  {type: String}, 
    emailId: { type: String},
    phoneNumber: { type: Number },
    address: {type:Array, default: [], ref: 'Address'}
    //address: { type: IAddressModel, ref: 'Address' } //error
    // address: { type: Schema.Types.ObjectId, ref: 'Address'} //add extra feilds in schema
});


export default mongoose.model<IEmployeeModel>('Employee',employeeSchema);


