// import mongoose from "mongoose";
// const Schema = mongoose.Schema;
// const addressSchema = new Schema({
//     city: String,
//     state: String,
//     country: String
// });

// export default mongoose.model('Address', addressSchema,'employees');

// module.exports = mongoose.model('addrModel', addressSchema, 'employees');

import mongoose, { Document, Schema} from "mongoose";

export interface IAddress {
    city: string;
    state: string;
    country: string;
}

export interface IAddressModel extends IAddress, Document{};
//create schema
const addressSchema: Schema = new Schema({
    city: { type: String},
    state: { type: String},
    country: { type: String}
});

//create model from schema
export default mongoose.model<IAddressModel>('AddressModel', addressSchema);
