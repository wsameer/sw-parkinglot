# Welcome to SW-PARKING!

The backend of a multi storey parking lot system. This system function in the form of APIs, built in **Node JS** and **Express.js**.

# Install
Open terminal window; navigate to this folder and type the following commands:

    npm install
   
# Run the App
    npm start

# APIs to operate the Parking Lot
## Get count
Returns the count of total spaces in the parking lot
###  Request

    GET /parkinglots/
    curl -i -H 'Accept: application/json' http://localhost:3000/parkinglots/
### Parameters
NA

### Response

    enter code here



## Get nearest free parking slot
Returns the nearest free parking space number as per the vehicle type.
###  Request

    GET /parkinglots/find/parking

### Parameters

    ?vehicleType=[1/2/3]
    // 1 is for motorcycle
    // 2 is for cars
    // 3 is for trucks

### Response

    enter code here
## Get the vehicle location and type
For given registration number OR vehicle type, get the details of the parked location of that vehicle.
###  Request

    GET /parkinglots/find/vehicle

### Parameters

    ?vehicleType=[1/2/3] OR ?registrationNumber=MH-01-FB-2323
    // 1 is for motorcycle
    // 2 is for cars
    // 3 is for trucks

### Response

    enter code here
## Park a vehicle
Parks the vehicle with given registration number at the designated spots.

 1. **Motorcycle** requires 1 spot for parking.
 2. **Car** requires 2 spots for parking. 
 3. **Truck** requires 5 spots for parking.

###  Request

    POST /parkinglots/park
### Parameters

    {
	    "registrationNumber": "MH-01-FB-2323",
	    "slots": "1,2",
	    "vehicleType": "1"
    }

### Response

    enter code here
    
## Create/Add a parking spaces
Add a given number of spaces to the parking lot
###  Request

    POST /parkinglots/create

### Parameters

    {
	    "slots": "100"
    }

### Response

    enter code here

## Get the status of parking lot
Get the status of the entire parking lot.
###  Request

    GET /parkinglots/status

### Parameters
NA

### Response

    enter code here
##  Unpark a vehicle
Remove the given vehicle from its designated spot. The spot is now available for other vehicles to be parked.

###  Request

    DELETE /parkinglots/unpark

### Parameters

    ?registrationNumber=MH-01-FB-2323

### Response

    enter code here
