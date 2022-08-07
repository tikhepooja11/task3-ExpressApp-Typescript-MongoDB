import express from 'express';
import http from 'http';
import mongoose, { mongo } from "mongoose";
import { config } from './config/config';
import Logging from './library/logging';
import addressRoutes from './routes/Address';
import employeeRoutes from './routes/Employee';

const router = express(); //ask for router to express
router.use(express.urlencoded({extended: true}));
router.use(express.json());

//now connect to mongoDB
console.log(`pooja hi`);
mongoose.connect(config.mongo.url, {retryWrites: true, w: 'majority'})
.then(() => { 
    // console.log(`connected to DB`);
    Logging.info(`connected to mongoDB dataBase`);
    StartServer();
})
.catch((error) => {
   // console.log(error);
   Logging.error(`Unable to connect to DB`);
   Logging.error(error);
});

router.listen(config.server.port, () => {
    // console.log(`server started on port ${config.server.port}`);
    Logging.info(`server started on port ${config.server.port}`)
});

/*only start if server is connected*/
const StartServer = () => {
    router.use((req, res, next) =>{
        Logging.info(`Incoming Method: ${req.method} - URL: ${req.url}`);

        //now after requesting check what actually happens to that request & sending its status code
        res.on('finish', ()=>{
            Logging.info(`Incoming Method: ${req.method} - status: ${req.statusCode}`);
        });

        //after this execute next code of functionality after sending response
        next();
    });

    //Routers called
    router.use('/address', addressRoutes);
    router.use('/employee', employeeRoutes);

    //Routes healthcheak
    router.get('/ping', (req, res, next) => res.status(200).json({ message: 'Routers are working fine'}));
    //error handling if passed request doesnt matched with anything
    router.use((req, res, next) => {
        const error = new Error('Request not matched - not found');
        Logging.error(error);
        return res.status(404).json({ message: error.message});
    });

  
    
}