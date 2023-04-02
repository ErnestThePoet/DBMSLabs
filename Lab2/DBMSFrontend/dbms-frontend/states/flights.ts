import { makeAutoObservable } from "mobx";

export interface SingleFlight {
    flightNbr: string;
    origIcao: string;
    destIcao: string;
    depTime: number;
    arrTime: number;
    regNo: string;
    acType: string;
    pilotIds: string;
    pilotNames: string;
}

class Flights {
    constructor() {
        makeAutoObservable(this);
    }

    flights: SingleFlight[] = [];

    setFlights(flights: SingleFlight[]) {
        this.flights = flights;
    }

    clearFlights() {
        this.flights = [];
    }
}

const flights = new Flights();

export default flights;
