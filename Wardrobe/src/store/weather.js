import { createSlice } from "@reduxjs/toolkit";
const initialWeather = {tempF: 70, condition: "Clear"};

const weatherSlice = createSlice({
    name: 'weather',
    initialState: initialWeather,
    reducers:{
        setWeatherInfo(state, action)
        {
            const condition = (action.payload.condition > 0) ? 'Raining' : 'Clear';
            state.condition = condition;
            state.tempF = action.payload.tempF;
           
        },
        
    }
})

export const weatherActions = weatherSlice.actions;
export default weatherSlice.reducer;