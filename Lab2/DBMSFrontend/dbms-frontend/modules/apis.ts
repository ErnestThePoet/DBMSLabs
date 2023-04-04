let urlPrefix = "http://localhost:31100/api/";

const APIS:{[i:string]:string} = {
    addFlight: "add_flight",
    deleteFlight: "delete_flight",
    getAllFlightInfo: "get_all_flight_info",
    getAirControllerByFlightNbr: "get_air_controller_by_flight_nbr",
    getAllAirlineFlightCount: "get_all_airline_flight_count"
};

for (const i in APIS) {
    APIS[i] = urlPrefix + APIS[i];
}

export default APIS;
