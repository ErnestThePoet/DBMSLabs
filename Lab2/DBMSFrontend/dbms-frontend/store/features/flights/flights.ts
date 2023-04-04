import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { SingleFlight } from "@/modules/types";
import type { AppDispatch, RootState } from "@/store/store";
import * as L from "@/logics/flights";

interface FlightsState {
    flights: SingleFlight[];
    isFlightsLoading: boolean;
    isAddFlightLoading: boolean;
    isAddFlightDialogOpen: boolean;
    addFlightErrorMessage: string;
}

const initialState: FlightsState = {
    flights: [],
    isFlightsLoading: false,
    isAddFlightLoading: false,
    isAddFlightDialogOpen: false,
    addFlightErrorMessage: ""
};

export const updateFlightsAsync = createAsyncThunk(
    "flights/updateFlights",
    async () => await L.updateFlightsAsync()
);

export const addFlightAsync =
    (e: Parameters<typeof L.addFlightAsync>[0]) =>
    async (dispatch: AppDispatch, getState: () => RootState) => {
        dispatch(setIsAddFlightLoading(true));
        const result = await L.addFlightAsync(e);
        if (result.result === "SUCCESS") {
            dispatch(updateFlightsAsync());
            dispatch(setIsAddFlightDialogOpen(false));
        } else if (result.result === "FAILURE") {
            dispatch(setAddFlightErrorMessage(result.data as string));
        }

        dispatch(setIsAddFlightLoading(false));
    };

export const deleteFlightAsync =
    (e: Parameters<typeof L.deleteFlightAsync>[0]) =>
    async (dispatch: AppDispatch, getState: () => RootState) => {
        const result = await L.deleteFlightAsync(e);
        if (result.result === "SUCCESS") {
            dispatch(updateFlightsAsync());
        }
    };

export const flightsSlice = createSlice({
    name: "flights",
    initialState,
    reducers: {
        setIsFlightsLoading: (state, action) => {
            state.isFlightsLoading = action.payload;
        },
        setIsAddFlightLoading: (state, action) => {
            state.isAddFlightLoading = action.payload;
        },
        setIsAddFlightDialogOpen: (state, action) => {
            state.isAddFlightDialogOpen = action.payload;
        },
        setAddFlightErrorMessage: (state, action) => {
            state.addFlightErrorMessage = action.payload;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(updateFlightsAsync.pending, state => {
                state.isFlightsLoading = true;
            })
            .addCase(updateFlightsAsync.fulfilled, (state, action) => {
                if (action.payload.result === "SUCCESS") {
                    state.flights = action.payload.data as SingleFlight[];
                }
                state.isFlightsLoading = false;
            });
    }
});

export const {
    setIsFlightsLoading,
    setIsAddFlightLoading,
    setIsAddFlightDialogOpen,
    setAddFlightErrorMessage
} = flightsSlice.actions;

export const selectFlights = (state: RootState) => state.flights.flights;
export const selectIsFlightsLoading = (state: RootState) =>
    state.flights.isFlightsLoading;
export const selectIsAddFlightLoading = (state: RootState) =>
    state.flights.isAddFlightLoading;
export const selectIsAddFlightDialogOpen = (state: RootState) =>
    state.flights.isAddFlightDialogOpen;
export const selectAddFlightErrorMessage = (state: RootState) =>
    state.flights.addFlightErrorMessage;

export default flightsSlice.reducer;
