import axios, { AxiosError } from "axios";
import APIS from "@/modules/apis";
import { message } from "antd";
import type {
    AsyncRequestResult,
    SingleAirlineFlightCount
} from "@/modules/types";

export async function getAllAirlineFlightCountAsync(
    minFlightCount: number
): Promise<AsyncRequestResult<SingleAirlineFlightCount[] | null>> {
    if (minFlightCount < 1) {
        message.error("最小航班数量必须为正");
        return {
            result: "FAILURE",
            data: null
        };
    }

    try {
        const result = await axios.get(APIS.getAllAirlineFlightCount, {
            params: {
                minFlightCount
            }
        });
        if (result.data.success) {
            return {
                result: "SUCCESS",
                data: result.data.flightCounts
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
