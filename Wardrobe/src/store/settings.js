import { createSlice } from "@reduxjs/toolkit";
import { DUMMY_ITEMS_TO_WEAR, DUMMY_SETTINGS } from "../data/DUMMY_SETTINGS";

const initialSettings = {settings: DUMMY_SETTINGS, availableTypesToWear: DUMMY_ITEMS_TO_WEAR };

const settingsSlice = createSlice({
    name: 'settings',
    initialState: initialSettings,
    reducers:{
        changeClothingSetting(state, action)
        {
            state.settings = [...action.payload.settings];
            state.availableTypesToWear = [...action.payload.newAvailableTypes];
        }
    }
})

export const settingsActions = settingsSlice.actions;
export default settingsSlice.reducer;