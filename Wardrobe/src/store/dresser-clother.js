import { createSlice } from "@reduxjs/toolkit";
import { CATEGORIES, OCCASION_TO_INDEX } from "../data/data";
import { sendItemData } from "./dresser-db-actions";

const INITIAL_CLOTHES = { Jacket: undefined, Top: undefined , Bottom:undefined , Footwear: undefined};
const ALL_CLOTHES_INITIAL = [INITIAL_CLOTHES, INITIAL_CLOTHES, INITIAL_CLOTHES,INITIAL_CLOTHES,  ];

const intialDresserState = {items: [], clothesAmount: 8, allOutfits: ALL_CLOTHES_INITIAL };

const dresserSlice = createSlice({
    name: 'dresser',
    initialState: intialDresserState,
    reducers:{
        addItem(state,action )
        {
            state.clothesAmount++;
            state.items.push(action.payload);
            sendItemData({items: state.items});
        },
        editItem(state,action)
        {
            let currItems = state.items;
            const payloadId = action.payload.id;
            const currItem = currItems[payloadId];
            const indx = OCCASION_TO_INDEX[currItem.occasion];
            if(state.allOutfits[indx][currItem.category] !== undefined && state.allOutfits[indx][currItem.category].id === payloadId)
                state.allOutfits[indx] = ALL_CLOTHES_INITIAL;

            currItems[payloadId] = action.payload;
            state.items = currItems;
            sendItemData({items: state.items});

        },
        deleteItem(state, action)
        {
            state.clothesAmount--;
            state.items = state.items.filter((item) =>
                item.id !== action.payload.id
            );
            sendItemData({items: state.items});
            let id = 0;
            state.items.forEach((item) => {
                item.id = id;
                id++;
            })
            const occasionIndex = OCCASION_TO_INDEX[action.payload.occasion];
            const currentOutfit = state.allOutfits[occasionIndex];
            if(currentOutfit[action.payload.category] !== undefined && currentOutfit[action.payload.category].id === action.payload.id)
            {
                state.allOutfits[occasionIndex] = INITIAL_CLOTHES;
            }
        },
        setAllItems(state, action)
        {
            state.items = action.payload.items;
        },
        setCurrentOutfit(state, action)
        {
            state.allOutfits[action.payload.indx] = action.payload.outfit;
        },
        setNewClothing(state, action)
        {
            state.allOutfits[action.payload.indx][action.payload.type] = action.payload.clothingItem;
        },
        checkOutfit(state, action)
        {
            for(let i = 0; i < state.allOutfits.length; i++)
            {
                CATEGORIES.forEach((category) => {
                    if(state.allOutfits[i][category] !== undefined && action.payload.availableTypes.find((available) => available !== state.allOutfits[i][category].type ))
                    {
                        state.allOutfits[i] = ALL_CLOTHES_INITIAL;
                    }
                })
            }
        }
    }
})

export const dresserActions = dresserSlice.actions;
export default dresserSlice.reducer;