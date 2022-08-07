import mongoose from "mongoose";
import { Request, Response, NextFunction, request, response } from "express";
import empProfile from "../models/empProfile";

const createEmployee = (request: Request, response: Response, next: NextFunction) => {
    console.log("inside createEmployee() method");
    const { firstName, lastName, emailId, phoneNumber, address } = request.body;
    console.log(address);
    const employee = new empProfile({
        _id: new mongoose.Types.ObjectId(),
        firstName,
        lastName,
        emailId,
        phoneNumber,
        address
    });

    return employee
        .save()
        .then((employee) => response.status(201).send(employee))
        .catch((error) => response.status(500).json({message: error}));

};


const getAllEmployees = (req: Request, res: Response, next:NextFunction)=>{
    return empProfile.find()
            .then((employees) => res.status(200).send(employees))
            .catch((error)  => res.status(404).send(error).json({message: 'Cannot load employees'}));
};
const getEmpById = (request: Request, response: Response, next: NextFunction) => {
    console.log(`inside getEmpById()`);
    const employeeId = request.params.employeeId;
    return empProfile.findById(employeeId)
            .then((employee) => response.status(200).send(employee))
            .catch((error) => response.status(404).send(error.json({message: 'Employee with this Id is not present'})));
}
const updateEmployee = (req: Request, res: Response, next: NextFunction) => {
    console.log(`inside updateEmployee()`);
    const employeeId = req.params.employeeId;
    return empProfile.findByIdAndUpdate(employeeId)
            .then((employee) => {
                if(employee)
                {
                    employee.set(req.body);
                    return employee
                    .save()
                    .then((employee) => res.status(201).send(employee).json({message: 'employee Updated'}))
                    .catch((error)  => res.status(500).send(error).json({message: 'Internal server Error'}));
                }
                else
                {
                    res.status(404).json(({message: 'Error in Updating Employee, Employee is Null'}));
                }
            })
            .catch((error) => res.status(404).send(error).json({message: 'Employee with this ID not found'}));
}

const deleteAddress = (req: Request, res: Response, next: NextFunction) => {
    const employeeId = req.params.employeeId;
    
    return empProfile.findByIdAndDelete(employeeId)
        .then((employee) => (employee ?
                            res.status(201).json({message: 'Employee deleted'}) :
                            res.status(404).json({message: 'Error in deleting employee'})))
        .catch((error) => res.status(500).send(error).json({ message: 'employeeId Not Found' }));
}



export default { createEmployee, getAllEmployees, getEmpById, updateEmployee, deleteAddress }