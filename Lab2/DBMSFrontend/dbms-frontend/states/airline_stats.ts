import { makeAutoObservable } from "mobx";

export interface SingleAirlineFlightCount {
    icao: string;
    flightCount: number;
}

class AirlineStats {
    constructor() {
        makeAutoObservable(this);
    }

    flightCounts: SingleAirlineFlightCount[] = [];

    setFlightCounts(flightCounts: SingleAirlineFlightCount[]) {
        this.flightCounts = flightCounts;
    }

    clearFlightCounts() {
        this.flightCounts = [];
    }
}

const airlineStats = new AirlineStats();

export default airlineStats;
