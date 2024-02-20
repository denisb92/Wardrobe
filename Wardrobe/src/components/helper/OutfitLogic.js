import { NOCLOTHES } from "../../data/data";
import { colorFilter } from "./ColorLogic";
import { checkWeather } from "./WeatherLogic";

export const INVALID_OUTFIT = {Jacket: NOCLOTHES, Top: NOCLOTHES, Bottom: NOCLOTHES, Footwear: NOCLOTHES};

function checkValidItem(item)
{
    return item !== NOCLOTHES;
}

export function randomizeOneClothingFunc(outfit, type, id, temp, settings, items, occasion)
{
    const occasionFiltered = items.filter((item) => (item.occasion === occasion || item.occasion === 'Any') && item.category === type);
    const filterItems = checkWeather(temp, settings, occasionFiltered);
    let filterItemsColor = filterItems;
    if(type !== 'Jacket')
        filterItemsColor = colorFilter(filterItems, (type === 'Bottom') ? outfit['Top'].color : outfit['Bottom'].color );
    const idFilter = filterItemsColor.filter((item) => item.id !== id);
    const newClothingIdx = Math.floor(Math.random() * idFilter.length);
    return  idFilter[newClothingIdx];
}

function randomizeHelperFunc(items, type, prevCategoryColor)
{
    let colorFiltered = items.filter((item) => item.category === type);
    if(prevCategoryColor !== null)
        colorFiltered = colorFilter(colorFiltered, prevCategoryColor);
    if(colorFiltered.length === 0)
        return NOCLOTHES;
    const clothesIndex = Math.floor(Math.random() * colorFiltered.length);
    const initialClothes = (colorFiltered[clothesIndex] === undefined || colorFiltered.length === 0) ? NOCLOTHES : colorFiltered[clothesIndex];
    return initialClothes;
}

export function randomizeOutfitFunc(temp,settings, items , isJacketWeather, occasion)
{
         const occasionFiltered = items.filter((items) => items.occasion === occasion || items.occasion === 'Any');
         const weatherFiltered = checkWeather(temp, settings, occasionFiltered);
         let initialClothesJacket;
         if(isJacketWeather)
         {
            initialClothesJacket = randomizeHelperFunc( weatherFiltered, 'Jacket', null);
         }
         const initialClothesTop = randomizeHelperFunc(weatherFiltered, 'Top', null);
         if(!checkValidItem(initialClothesTop)) return INVALID_OUTFIT;
        
         const initialClothesBottom = randomizeHelperFunc(weatherFiltered, 'Bottom', initialClothesTop.color);
         if(!checkValidItem(initialClothesBottom)) return INVALID_OUTFIT;
       
         const initialClothesFootwear = randomizeHelperFunc( weatherFiltered, 'Footwear', initialClothesBottom.color);
         if(!checkValidItem(initialClothesFootwear)) return INVALID_OUTFIT;
     
        return {Jacket: initialClothesJacket, Top: initialClothesTop, Bottom: initialClothesBottom, Footwear: initialClothesFootwear};
}

export function getCategory(type)
{
    if(type === 'T-Shirts' || type === 'Long Sleeve Shirts' || type === 'Sweaters' || type === 'Sweatshirts')
        return "Top";
    else if(type === 'Pants' || type === 'Shorts')
        return "Bottom";
    else if(type === 'Shoes')
        return "Footwear";
    else
        return "Jacket";
}