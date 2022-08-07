import express from 'express';
import AddressController from '../controllers/Address';

const router = express.Router();
console.log(`inside address router`);
router.post('/create', AddressController.createAddress);
router.get('/getAddress/:addressId', AddressController.getAddress);
router.get('/getAllAddress', AddressController.getAllAddress);
router.patch('/updateAddress/:addressId', AddressController.updateAddress);
router.delete('/deleteAddress/:addressId', AddressController.deleteAddress);


export = router;