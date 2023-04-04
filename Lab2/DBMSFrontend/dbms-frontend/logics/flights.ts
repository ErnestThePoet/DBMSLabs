import axios, { AxiosError } from "axios";
import APIS from "@/modules/apis";
import { message } from "antd";
import type { AsyncRequestResult, SingleFlight } from "@/modules/types";

export async function updateFlightsAsync(): Promise<
    AsyncRequestResult<SingleFlight[] | null>
> {
    try {
        const result = await axios.get(APIS.getAllFlightInfo);
        if (result.data.success) {
            return {
                result: "SUCCESS",
                data: result.data.flights
            };
        } else {
            message.error(result.data.msg);
            return {
                result: "FAILURE",
                data: null
            };
        }
    } catch (error) {
        console.log(error);
        message.error((<AxiosError>error).message);
        return {
            result: "REJECTED",
            data: null
        };
    }
}

export async function addFlightAsync(e: {
    flightNbr?: string;
    origIcao?: string;
    destIcao?: string;
    depTime?: { $d: Date };
    arrTime?: { $d: Date };
    acRegNo?: string;
    pilotId?: string;
}): Promise<AsyncRequestResult<string | null>> {
    const mapNullString = (x?: string) =>
        x === undefined || x === "" ? null : x;
    const mapNullDate = (x?: { $d: Date }) =>
        x === undefined ? null : x.$d.getTime();

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
            message.success("添加成功");
            return {
                result: "SUCCESS",
                data: null
            };
        }

        return {
            result: "FAILURE",
            data: result.data.msg
        };
    } catch (error) {
        console.log(error);
        message.error((<AxiosError>error).message);

        return {
            result: "REJECTED",
            data: null
        };
    }
}

export async function deleteFlightAsync(data: {
    flightNbr: string;
    origIcao: string;
    destIcao: string;
    depTime: number;
}): Promise<AsyncRequestResult<string | null>> {
    try {
        const result = await axios.delete(APIS.deleteFlight, {
            data
        });
        if (result.data.success) {
            message.success("删除成功");
            return {
                result: "SUCCESS",
                data: null
            };
        } else {
            message.error(result.data.msg);
            return {
                result: "FAILURE",
                data: result.data.msg
            };
        }
    } catch (error) {
        console.log(error);
        message.error((<AxiosError>error).message);
        return {
            result: "FAILURE",
            data: null
        };
    }
}
