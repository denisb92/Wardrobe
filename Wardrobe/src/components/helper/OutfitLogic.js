import { colorFilter } from "./ColorLogic";
import { checkWeather } from "./WeatherLogic";

export function randomizeOneClothingFunc(outfit, type, id, temp, settings, items)
{
    const filterItems = checkWeather(temp, settings, items, type);
    let filterItemsColor = filterItems;
    if(type !== 'Jacket')
        filterItemsColor = colorFilter(filterItems, (type === 'Bottom') ? outfit['Top'].color : outfit['Bottom'].color );
    const idFilter = filterItemsColor.filter((item) => item.id !== id);
    const newClothingIdx = Math.floor(Math.random() * idFilter.length);
    return  idFilter[newClothingIdx];
}

function randomizeHelperFunc(temp, settings, items, type, prevCategoryColor)
{
    const noClothes = {name: "N/A", type: "N/A", color: "N/A", description: "N/A"};
    const filteredItems = checkWeather(temp, settings, items, type);
    let colorFiltered = filteredItems;
    if(prevCategoryColor !== null)
        colorFiltered = colorFilter(colorFiltered, prevCategoryColor);
    const clothesIndex = Math.floor(Math.random() * colorFiltered.length);
    const initialClothes = (colorFiltered[clothesIndex] === undefined) ? noClothes : colorFiltered[clothesIndex];
    return initialClothes;
}

export function randomizeOutfitFunc(temp,settings, items , isJacketWeather)
{
         
         let initialClothesJacket;
         if(isJacketWeather)
         {
            initialClothesJacket = randomizeHelperFunc(temp, settings, items, 'Jacket', null);
         
         }
         const initialClothesTop = randomizeHelperFunc(temp, settings, items, 'Top', null);
         const initialClothesBottom = randomizeHelperFunc(temp, settings, items, 'Bottom', initialClothesTop.color);
         const initialClothesFootwear = randomizeHelperFunc(temp, settings, items, 'Footwear', initialClothesBottom.color);
        
        return {Jacket: initialClothesJacket, Top: initialClothesTop, Bottom: initialClothesBottom, Footwear: initialClothesFootwear};
}