import axios, { AxiosError } from "axios";
import type { SetBooleanStateFn, SetStateFn } from "@/modules/fn-types";
import APIS from "@/modules/apis";
import { message } from "antd";
import flights from "@/states/flights";

export const updateFlights = async (setLoading: SetBooleanStateFn) => {
    setLoading(true);

    try {
        const result = await axios.get(APIS.getAllFlightInfo);
        if (result.data.success) {
            flights.setFlights(result.data.flights);
        } else {
            message.error(result.data.msg);
        }
    } catch (error) {
        console.log(error);
        message.error((<AxiosError>error).message);
    }

    setLoading(false);
};

export const addFlight = async (
    e,
    setFlightsLoading: SetBooleanStateFn,
    setLoading: SetBooleanStateFn,
    setOpen: SetBooleanStateFn
) => {
    setLoading(true);

    const mapNullString = x => (x === undefined || x === "" ? null : x);
    const mapNullDate = x => (x === undefined ? null : x.$d.getTime());

    try {
        const result = await axios.post(APIS.addFlight, {
            flightNbr: mapNullString(e.flightNbr),
            origIcao: mapNullString(e.origIcao),
            destIcao: mapNullString(e.destIcao),
            depTime: mapNullDate(e.depTime),
            arrTime: mapNullDate(e.arrTime),
            acRegNo: mapNullString(e.acRegNo),
            pilotId: mapNullString(e.pilotId)
        });
        if (result.data.success) {
            updateFlights(setFlightsLoading);
            setOpen(false);
        } else {
            message.error(result.data.msg, 5);
        }
    } catch (error) {
        console.log(error);
        message.error((<AxiosError>error).message);
    }

    setLoading(false);
};
