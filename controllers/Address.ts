import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Address from "../models/Address";

const createAddress = (req: Request, res: Response, next:NextFunction)=>{
    
    console.log(`inside createAddr() route`);
    const {city, state, country} = req.body;
    const address = new Address({
        _id: new mongoose.Types.ObjectId(),
        city,
        state,
        country
    });

    return address.save()
        .then((address) => res.status(201).send(address))
        .catch((error)  => res.status(500).send(error));
};
const getAddress = (req: Request, res: Response, next: NextFunction)=>{
    console.log(`inside getAddress() route`);

    const addressId = req.params.addressId;
    return Address.findById(addressId)
            .then((address) => res.status(200).send(address))
            .catch((error)  => res.status(404).send(error).json(({message: 'AddressId not Found'})));
};
const getAllAddress = (req: Request, res: Response, next:NextFunction)=>{
    return Address.find()
            .then((addresses) => res.status(200).send(addresses))
            .catch((error)  => res.status(404).send(error).json(({message: 'Cannot load addresses'})));
};
const updateAddress = (req: Request, res: Response, next:NextFunction)=>{
    const addreessId = req.params.addressId;
    
    return Address.findById(addreessId)
        .then((address) => {
            if(address)
            {
                address.set(req.body);

                return address
                    .save()
                    .then((address) => res.status(201).send(address).json({message: 'Address Updated'}))
                    .catch((error)  => res.status(500).send(error).json({message: 'Internal server Error'}));
            }
            else
            {
                res.status(404).json(({message: 'Error in Updating Address, Address is Null'}));
            }
        })
        .catch((error) => res.status(500).json({message: 'AddressId Not found'}));
};
const deleteAddress = (req: Request, res: Response, next:NextFunction)=>{
    const addreessId = req.params.addressId;
    
    return Address.findByIdAndDelete(addreessId)
        .then((address) => (address ?
                            res.status(201).json({message: 'deleted'}) :
                            res.status(404).json({message: 'Error in deleting Address'})))
        .catch((error) => res.status(500).json({ message: 'Address Not Found' }));
        
       
          
};

export default {createAddress, getAddress, getAllAddress, updateAddress, deleteAddress};