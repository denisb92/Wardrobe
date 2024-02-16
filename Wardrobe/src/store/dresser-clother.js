import { createSlice } from "@reduxjs/toolkit";
import { DUMMY_DATA } from "../data/DUMMY_DATA";
import { NOCLOTHES } from "../data/data";

const INITIAL_CLOTHES = { Jacket: NOCLOTHES, Top: NOCLOTHES , Bottom:NOCLOTHES , Footwear: NOCLOTHES};
const ALL_CLOTHES_INITIAL = [{Casual: INITIAL_CLOTHES}, {Work: INITIAL_CLOTHES}, {Workout: INITIAL_CLOTHES},{Formal: INITIAL_CLOTHES},  ];

const intialDresserState = {items: DUMMY_DATA, clothesAmount: 8, allOutfits: ALL_CLOTHES_INITIAL };
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
                occasion: action.payload.occasion,
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
            currItems[action.payload.id].occasion = action.payload.occasion;
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
        },
        setCurrentOutfit(state, action)
        {
            state.allOutfits[action.payload.indx] = action.payload.outfit;
        },
        setNewClothing(state, action)
        {
            state.allOutfits[action.payload.indx][action.payload.type] = action.payload.clothingItem;
        }
    }
})

export const dresserActions = dresserSlice.actions;
export default dresserSlice.reducer;