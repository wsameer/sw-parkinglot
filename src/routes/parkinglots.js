const express = require('express');
const parkingLotRouter = express.Router();
const ParkingLotController = require('../controllers/parkinglot.controller.js')

// GET: Get total parking slot count
parkingLotRouter.get('/', ParkingLotController.get);

//GET: Find nearest free parking slot
parkingLotRouter.get('/find/parking', ParkingLotController.findParking);

// GET: Find the vehicle location and type
parkingLotRouter.get('/find/vehicle', ParkingLotController.findVehicle);

// POST: Park a vehicle
parkingLotRouter.post('/park', ParkingLotController.park);

// POST: Create a parking lot
parkingLotRouter.post('/create', ParkingLotController.create);

// GET: Get the status of parking lot
parkingLotRouter.get('/status', ParkingLotController.status);

module.exports = parkingLotRouter;
