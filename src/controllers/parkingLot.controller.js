const ParkingLot = require('../models/parkingLot.model.js');

const ParkingLotController = (function () {
  'use strict';

  const parkingLot = new ParkingLot();

  /**
   * GET
   * params: NA
   * Returns the total number of slots in the parking lot
   */
  const get = (req, res, next) => {
    const availableSlots = parkingLot.getCountOfParkingSlots();
    return res.status(200).json({
      availableSlots: availableSlots,
      success: 1
    });
  }

  /**
   * POST
   * params: { slots: <number> }
   * Creates a new parking with given slot
   */
  const create = (req, res, next) => {
    let response;
    if (req.body.slots) {

      const slotsToAdd = parseInt(req.body.slots, 10);

      if (!(Number.isInteger(slotsToAdd))) {
        // error
        return res.status(200).json({
          message: 'Invalid parameter passed',
          success: 0
        });
      }

      response = parkingLot.createNewParkingLot(slotsToAdd);

      return res.status(200).json({
        message: response,
        success: 1
      });
    }

    return res.status(200).json({
      message: 'Invalid parameter passed',
      success: 0
    });
  }

  /**
   * GET
   * Returns the detailed status of the parking lot 
   */
  const statusOfParking = (req, res, next) => {
    const parkingSlots = parkingLot.getParkingSlots();
    let occupiedSlots = [];
    parkingSlots.forEach((element, index) => {
      if (element != null) {
        occupiedSlots.push({
          registrationNumber: element.registrationNumber,
          slotNumber: index + 1,
          vehicleType: element.vehicleType
        });
      }
    });

    return res.status(200).json({
      data: occupiedSlots,
      success: 1
    });
  }

  /**
   * Add the vechicle in the designated parking slots
   * @param {*} registrationNumber 
   * @param {*} slots 
   * @param {*} vehicleType 
   */
  const parkVehicle = (req, res, next) => {
    let parkingSlots = parkingLot.getParkingSlots();
    const params = {
      registrationNumber: req.body.registrationNumber,
      slots: req.body.slots,
      vehicleType: req.body.vehicleType
    };

    if (parkingSlots.length === 0) {
      return res.status(200).json({
        data: 'No parking spots available at this time.',
        success: 0
      });
    }

    if (params.registrationNumber && params.slots && params.vehicleType) {
      const slotsToReserve = params.slots.split(',');

      for (let index = 0; index < slotsToReserve.length; index++) {
        let slotNumber = parseInt(slotsToReserve[index], 10) + 1;
        // Add vehicle to the alloted parking spots
        parkingLot.addVehicleToParkingSpot(
          slotsToReserve[index],
          { 
            registrationNumber: params.registrationNumber, 
            slotNumber: slotNumber,
            vehicleType: params.vehicleType 
          }
        );
      }

      return res.status(200).json({
        data: `Parked your vehicle with registration ${params.registrationNumber} at ${slotsToReserve} slots.`,
        success: 1
      });
    }

    return res.status(200).json({
      data: 'Invalid parameters sent.',
      success: 0
    });
  }

  /** 
   * GET
   * Finds next available parking slot and returns it
  */
  const findParking = (req, res, next) => {
    if (!req.query.vehicleType) {
      return res.status(200).json({
        message: 'Invalid parameters',
        success: 0
      });
    } else {

      let vehicleType = parseInt(req.query.vehicleType, 10);

      if ([1, 2, 3].indexOf(vehicleType) > -1) {
        const slotsToCheck = __getNumberOfSlotsBasedOnVehicleType(vehicleType);
        const parkingSlots = parkingLot.getParkingSlots();
        if (parkingSlots === 0 || slotsToCheck === 0 || slotsToCheck > parkingSlots.length) {
          return res.status(200).json({
            message: 'No parking spots available',
            success: 0
          });
        }

        // console.log(parkingSlots);

        // We are sure that there are parking slots
        let firstEmptySlot = parkingLot.getFirstEmptySlot();
        if (firstEmptySlot == null) {
          return res.status(200).json({
            message: 'No parking spots available',
            success: 0
          });
        }

        let availableSpots = parkingLot.findNearestAvailableSlot(slotsToCheck, firstEmptySlot);
        if (availableSpots === null) {
          return res.status(200).json({
            message: 'No parking spots available',
            success: 0
          });
        }

        // success
        return res.status(200).json({
          data: availableSpots,
          success: 1
        });
      } else {
        return res.status(200).json({
          message: 'Invalid parameters',
          success: 0
        });
      }
    }
  }

  const findVehicle = (req, res, next) => {
    const registrationNumber = req.query.registrationNumber;
    const vehicleType = req.query.vehicleType;

    if (registrationNumber == null && vehicleType == null) {
      return res.status(200).json({
        message: 'Invalid parameters',
        success: 0
      });
    }

    // want to find parking slot based on registration number
    if (registrationNumber) {
      let response = __findByRegistrationNumber(registrationNumber);
      return res.status(200).json({
        data: response,
        success: 1
      });
    }

    // want to find parking slot of all vehicles matching the vehicle type
    if (vehicleType) {
      let response = __findByVehicleType(vehicleType.toString());
      return res.status(200).json({
        data: response,
        success: 1
      });
    }
  }


  ///////////////////////////////////
  // UTILITY METHODS

  function __getNumberOfSlotsBasedOnVehicleType(vehicleType) {
    switch (vehicleType) {
      case 1: // it's a bike
        return 1;

      case 2: // it's a car 
        return 2;

      case 3: // it's a truck
        return 4;

      default:
        return 1;
    }
  }

  function __findByRegistrationNumber(registrationNumber) {
    const _parkingSlots = parkingLot.getParkingSlots();
    return _parkingSlots.filter(function (value) {
      return (value.registrationNumber === registrationNumber);
    });
  }

  function __findByVehicleType(vehicleType) {
    console.log(vehicleType);
    const _parkingSlots = parkingLot.getParkingSlots();
    return _parkingSlots.filter(function (value, index) {
      if (value !== null) {
        return (value.vehicleType === vehicleType);
      }
    });
  }

  return {
    get: get,
    create: create,
    findParking: findParking,
    findVehicle: findVehicle,
    park: parkVehicle,
    status: statusOfParking,
  };

})();


module.exports = ParkingLotController;