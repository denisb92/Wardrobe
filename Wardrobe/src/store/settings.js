import { createSlice } from "@reduxjs/toolkit";

const initialSettings = {settings: [], availableTypesToWear: []};

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