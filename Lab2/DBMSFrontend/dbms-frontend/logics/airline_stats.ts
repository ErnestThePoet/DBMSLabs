import axios, { AxiosError } from "axios";
import type { SetBooleanStateFn } from "@/modules/fn-types";
import APIS from "@/modules/apis";
import { message } from "antd";
import airlineStats from "@/states/airline_stats";

export const getAllAirlineFlightCount = async (
    minFlightCount: number,
    setLoading: SetBooleanStateFn
) => {
    if (minFlightCount < 1) {
        message.error("最小航班数量必须为正");
        return;
    }

    setLoading(true);

    try {
        const result = await axios.get(APIS.getAllAirlineFlightCount, {
            params: {
                minFlightCount
            }
        });
        if (result.data.success) {
            airlineStats.setFlightCounts(result.data.flightCounts);
        } else {
            message.error(result.data.msg);
        }
    } catch (error) {
        console.log(error);
        message.error((<AxiosError>error).message);
    }

    setLoading(false);
};
