import { createSlice } from "@reduxjs/toolkit";
import { DUMMY_SETTINGS } from "../data/DUMMY_SETTINGS";

const initialSettings = {settings: DUMMY_SETTINGS};

const settingsSlice = createSlice({
    name: 'settings',
    initialState: initialSettings,
    reducers:{
        changeClothingSetting(state, action)
        {
            state.settings = [...action.payload.settings];
        }
    }
})

export const settingsActions = settingsSlice.actions;
export default settingsSlice.reducer;