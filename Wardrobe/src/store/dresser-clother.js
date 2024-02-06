import { createSlice } from "@reduxjs/toolkit";
import { DUMMY_DATA } from "../data/DUMMY_DATA";

const intialDresserState = {items: DUMMY_DATA, clothesAmount: 8 };
const dresserSlice = createSlice({
    name: 'dresser',
    initialState: intialDresserState,
    reducers:{
        addItem(state,action )
        {
            state.clothesAmount++;
            state.items.push({
                id: state.items.length + 1,
                title:  action.payload.title,
                type: action.payload.types,
                color: action.payload.colors,
                minTemp: 0,
                maxTemp:100,
                condition: 'Cloudy',
                description: action.payload.description
            });
        },
        deleteItem(state, action)
        {
            state.clothesAmount--;
            state.items = state.items.filter((item) =>
                item.id !== action.payload.id
            );

            let id = 0;
            state.items.forEach((item) => {
                item.id = id;
                id++;
            })
        }
    }
})

export const dresserActions = dresserSlice.actions;
export default dresserSlice.reducer;