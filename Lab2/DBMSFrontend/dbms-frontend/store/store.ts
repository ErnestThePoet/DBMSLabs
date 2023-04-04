import { configureStore } from "@reduxjs/toolkit";
import flightsReducer from "./features/flights/flights";
import atcsReducer from "./features/atcs/atcs";
import flightCountsReducer from "./features/flight-counts/flight-counts";

export const store = configureStore({
    reducer: {
        flights: flightsReducer,
        atcs: atcsReducer,
        flightCounts: flightCountsReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
