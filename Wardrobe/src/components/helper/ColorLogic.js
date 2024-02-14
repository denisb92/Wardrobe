import { COLOR_CODEX } from "../../data/data";

export function getColor(colorCoded)
{
    let newString = '';
    newString = colorCoded.toLowerCase();
    
    if(newString === 'brown')
        return 'amber-900';
    else if(newString === 'black')
        return 'black';
    else if(newString === 'white')
        return 'white';
    else if(newString === 'gray')
        return 'slate-300'
    else
        return newString + '-300';

}

export function colorFilter(items, color)
{
    let colorFiltered = []
    items.filter((item) =>{
        if(COLOR_CODEX[color].includes(item.color))
        {
            colorFiltered.push(item);
        }
    })
    return colorFiltered;
}

export function getStyleClass(color)
{
    const colorStr = getColor(color);
    let stringStyle = `justify-items-start  font-semibold font-serif text-black bg-white px-2 grid border-black h-36 border-2 rounded shadow-2xl bg-gradient-to-tr from-stone-300 to-${colorStr}`;
    return stringStyle;

    switch(color)
    {
        case "Red":
            stringStyle += 'to-red-300';
            break;
        case "Blue":
            stringStyle += 'to-blue-300';
            break;
        case "Yellow":
            stringStyle += 'to-yellow-300';
            break;
        case "Green":
            stringStyle += 'to-green-300';
            break;
        case "Purple":
            stringStyle += 'to-purple-300';
            break;
        case "Black":
            stringStyle += 'to-black';
            break;
        case "White":
            stringStyle += 'to-white';
            break;
        case "Brown":
            stringStyle += 'to-amber-900';
            break;
        case "Pink":
            stringStyle += 'to-pink-300';
            break;
        case "Gray":
            stringStyle += 'to-slate-300';
            break;
    }
    return stringStyle;
}

export function randomizeOutfitByColor()
{

}