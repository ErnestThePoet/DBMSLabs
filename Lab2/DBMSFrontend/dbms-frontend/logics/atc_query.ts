import axios, { AxiosError } from "axios";
import type { SetBooleanStateFn } from "@/modules/fn-types";
import APIS from "@/modules/apis";
import { message } from "antd";
import atcs from "@/states/atcs";

export const getAirControllerByFlightNbr = async (
    flightNbr: string,
    setLoading: SetBooleanStateFn
) => {
    setLoading(true);

    try {
        const result = await axios.get(APIS.getAirControllerByFlightNbr, {
            params: {
                flightNbr
            }
        });
        if (result.data.success) {
            atcs.setAtcs(result.data.airControllers);
        } else {
            message.error(result.data.msg);
        }
    } catch (error) {
        console.log(error);
        message.error((<AxiosError>error).message);
    }

    setLoading(false);
};
