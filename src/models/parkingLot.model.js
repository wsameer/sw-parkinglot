class ParkingLot {

  constructor() {
    this._MAX_PARKING_SLOTS = 0; // maximum parking slots allowed
    this._parkingSlots = new Array(); // array for parking slots
  }

  getCountOfParkingSlots() {
    return this._parkingSlots.length;
  }

  getParkingSlots() {
    return this._parkingSlots;
  }

  emptyThisSlot(index) {
    this._parkingSlots[index] = null;
  }

  getOccupiedParkingSpots() {
    // get the updated parking slots
    return this._parkingSlots.filter(function (element) {
      return element != null;
    });
  }

  getDataAboutThisSlot(index) {
    return this._parkingSlots[index];
  }

  createNewParkingLot(slotsToAdd) {
    this._MAX_PARKING_SLOTS += (slotsToAdd);
    const newArray = new Array(slotsToAdd).fill(null);
    this._parkingSlots.push(...newArray);
    return `Added ${slotsToAdd} slots to the parking`;
  }

  getFirstEmptySlot() {
    for (let index = 0; index < this._parkingSlots.length; index++) {
      if (this._parkingSlots[index] == null) {
        return index;
      }
    }
  }

  addVehicleToParkingSpot(index, vehicleDetails) {
    if (vehicleDetails) {
      this._parkingSlots[index] = vehicleDetails;
    }
  }

  findNearestAvailableSlot(slotsToCheck, firstEmptySlot) {
    let freeParkingSlots = new Array(0);

    if ((firstEmptySlot + slotsToCheck) <= this._parkingSlots.length) {
      // console.debug('First free slot is at index', firstEmptySlot);
      for (let index = slotsToCheck; index > 0; index--) {
        if (this._parkingSlots[firstEmptySlot] == null) {
          freeParkingSlots.push(firstEmptySlot);
          firstEmptySlot += 1;
          continue;
        }
        freeParkingSlots = null;
        break;
      }
    } else {
      return null;
    }

    // console.log('User can park his vehicle in spot:', freeParkingSlots.join(','));
    return freeParkingSlots;
  }

}

module.exports = ParkingLot;