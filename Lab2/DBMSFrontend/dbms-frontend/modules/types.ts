export interface SingleAirlineFlightCount {
    icao: string;
    flightCount: number;
}

export interface SingleAtc {
    id: number;
    name: string;
    airportIcao: string;
}

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

export interface AsyncRequestResult<T = any> {
    result: "SUCCESS" | "FAILURE" | "REJECTED";
    data: T;
}
