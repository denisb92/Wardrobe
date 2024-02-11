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
                id: state.items.length,
                name:  action.payload.name,
                type: action.payload.type,
                color: action.payload.color,
                condition: 'Cloudy',
                description: action.payload.description
            });
        },
        editItem(state,action)
        {
            let currItems = state.items;
            currItems[action.payload.id].name = action.payload.name;
            currItems[action.payload.id].type = action.payload.type;
            currItems[action.payload.id].color = action.payload.color;
            currItems[action.payload.id].description = action.payload.description;
            state.items = currItems;
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