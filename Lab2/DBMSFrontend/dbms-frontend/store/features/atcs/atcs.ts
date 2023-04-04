import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { SingleAtc } from "@/modules/types";
import type { RootState } from "@/store/store";
import * as L from "@/logics/atc_query";

interface AtcsState {
    atcs: SingleAtc[];
    isAtcsLoading: boolean;
}

const initialState: AtcsState = {
    atcs: [],
    isAtcsLoading: false
};

export const getAirControllerByFlightNbrAsync = createAsyncThunk(
    "atcs/getAirControllerByFlightNbrAsync",
    async (flightNbr: string) =>
        await L.getAirControllerByFlightNbrAsync(flightNbr)
);

export const atcsSlice = createSlice({
    name: "atcs",
    initialState,
    reducers: {
        clearAtcs: state => {
            state.atcs = [];
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getAirControllerByFlightNbrAsync.pending, state => {
                state.isAtcsLoading = true;
            })
            .addCase(
                getAirControllerByFlightNbrAsync.fulfilled,
                (state, action) => {
                    if (action.payload.result === "SUCCESS") {
                        state.atcs = action.payload.data!;
                    }

                    state.isAtcsLoading = false;
                }
            );
    }
});

export const { clearAtcs } = atcsSlice.actions;

export const selectAtcs = (state: RootState) => state.atcs.atcs;
export const selectIsAtcsLoading = (state: RootState) =>
    state.atcs.isAtcsLoading;

export default atcsSlice.reducer;
