import axios, { AxiosError } from "axios";
import APIS from "@/modules/apis";
import { message } from "antd";
import type { AsyncRequestResult, SingleAtc } from "@/modules/types";

export async function getAirControllerByFlightNbrAsync(
    flightNbr: string
): Promise<AsyncRequestResult<SingleAtc[] | null>> {
    try {
        const result = await axios.get(APIS.getAirControllerByFlightNbr, {
            params: {
                flightNbr
            }
        });
        if (result.data.success) {
            return {
                result: "SUCCESS",
                data: result.data.airControllers
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
