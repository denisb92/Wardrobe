import { NOCLOTHES } from "../../data/data";
import { colorFilter } from "./ColorLogic";
import { checkWeather } from "./WeatherLogic";

export function checkValidOutfit(outfit)
{
    return outfit.Top !== NOCLOTHES && outfit.Bottom !== NOCLOTHES && outfit.Footwear !== NOCLOTHES;
}

export function randomizeOneClothingFunc(outfit, type, id, temp, settings, items, occasion)
{
    const occasionFiltered = items.filter((items) => items.occasion === occasion || items.occasion === 'Any');
    const filterItems = checkWeather(temp, settings, occasionFiltered, type);
    let filterItemsColor = filterItems;
    if(type !== 'Jacket')
        filterItemsColor = colorFilter(filterItems, (type === 'Bottom') ? outfit['Top'].color : outfit['Bottom'].color );
    const idFilter = filterItemsColor.filter((item) => item.id !== id);
    const newClothingIdx = Math.floor(Math.random() * idFilter.length);
    return  idFilter[newClothingIdx];
}

function randomizeHelperFunc(temp, settings, items, type, prevCategoryColor)
{
    const filteredItems = checkWeather(temp, settings, items, type);
    let colorFiltered = filteredItems;
    if(prevCategoryColor !== null)
        colorFiltered = colorFilter(colorFiltered, prevCategoryColor);
    const clothesIndex = Math.floor(Math.random() * colorFiltered.length);
    const initialClothes = (colorFiltered[clothesIndex] === undefined || colorFiltered.length === 0) ? NOCLOTHES : colorFiltered[clothesIndex];
    return initialClothes;
}

export function randomizeOutfitFunc(temp,settings, items , isJacketWeather, occasion)
{
         const occasionFiltered = items.filter((items) => items.occasion === occasion || items.occasion === 'Any');
         let initialClothesJacket;
         if(isJacketWeather)
         {
            initialClothesJacket = randomizeHelperFunc(temp, settings, occasionFiltered, 'Jacket', null);
         
         }
         const initialClothesTop = randomizeHelperFunc(temp, settings, occasionFiltered, 'Top', null);
         const initialClothesBottom = randomizeHelperFunc(temp, settings, occasionFiltered, 'Bottom', initialClothesTop.color);
         if(initialClothesBottom === NOCLOTHES)
         {
            return {Jacket: initialClothesJacket, Top: initialClothesTop, Bottom: NOCLOTHES, Footwear: NOCLOTHES};
         }
         const initialClothesFootwear = randomizeHelperFunc(temp, settings, occasionFiltered, 'Footwear', initialClothesBottom.color);
        return {Jacket: initialClothesJacket, Top: initialClothesTop, Bottom: initialClothesBottom, Footwear: initialClothesFootwear};
}