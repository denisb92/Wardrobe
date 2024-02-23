import { createSlice } from "@reduxjs/toolkit";
import { DUMMY_DATA } from "../data/DUMMY_DATA";
import { CATEGORIES, OCCASION_TO_INDEX } from "../data/data";
import { getCategory } from "../helper/OutfitLogic";

const INITIAL_CLOTHES = { Jacket: undefined, Top: undefined , Bottom:undefined , Footwear: undefined};
const ALL_CLOTHES_INITIAL = [INITIAL_CLOTHES, INITIAL_CLOTHES, INITIAL_CLOTHES,INITIAL_CLOTHES,  ];

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
                category: getCategory(action.payload.type),
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
            currItems[action.payload.id].category = getCategory(action.payload.type);
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
            const occasionIndex = OCCASION_TO_INDEX[action.payload.occasion];
            const currentOutfit = state.allOutfits[occasionIndex];
            if(currentOutfit[action.payload.category] !== undefined && currentOutfit[action.payload.category].id === action.payload.id)
            {
                state.allOutfits[occasionIndex] = INITIAL_CLOTHES;
            }
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