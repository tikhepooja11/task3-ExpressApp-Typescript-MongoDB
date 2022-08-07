import express, { Router } from 'express';
import EmployeeController from '../controllers/Employee';


const router = express.Router();
router.post('/create', EmployeeController.createEmployee);
router.get('/getAllEmployees', EmployeeController.getAllEmployees);
router.get('/getEmpById/:employeeId', EmployeeController.getEmpById);
router.put('/updateEmployee/:employeeId', EmployeeController.updateEmployee);
router.delete('/deleteEmployee/:employeeId', EmployeeController.deleteAddress);
export = router;