import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { SingleAirlineFlightCount } from "@/modules/types";
import type { RootState } from "@/store/store";
import * as L from "@/logics/airline_stats";

interface FlightCountsState {
    flightCounts: SingleAirlineFlightCount[];
    isFlightCountsLoading: boolean;
}

const initialState: FlightCountsState = {
    flightCounts: [],
    isFlightCountsLoading: false
};

export const getAllAirlineFlightCountAsync = createAsyncThunk(
    "flightCounts/getAllAirlineFlightCountAsync",
    async (minFlightCount: number) =>
        await L.getAllAirlineFlightCountAsync(minFlightCount)
);

export const flightCountsSlice = createSlice({
    name: "flightCounts",
    initialState,
    reducers: {
        clearFlightCounts: state => {
            state.flightCounts = [];
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getAllAirlineFlightCountAsync.pending, state => {
                state.isFlightCountsLoading = true;
            })
            .addCase(
                getAllAirlineFlightCountAsync.fulfilled,
                (state, action) => {
                    if (action.payload.result === "SUCCESS") {
                        state.flightCounts = action.payload.data!;
                    }

                    state.isFlightCountsLoading = false;
                }
            );
    }
});

export const { clearFlightCounts } = flightCountsSlice.actions;

export const selectFlightCounts = (state: RootState) =>
    state.flightCounts.flightCounts;
export const selectIsFlightCountsLoading = (state: RootState) =>
    state.flightCounts.isFlightCountsLoading;

export default flightCountsSlice.reducer;
