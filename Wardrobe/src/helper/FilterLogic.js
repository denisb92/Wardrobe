export function filterOccasion(occasion, items)
{
    const newItems = items.filter((item) =>(
        item.occasion === occasion
    ))
    return newItems;
}

export function filterType(type, items)
{
    const newItems =  items.filter((item) =>(
        item.type === type
    ))
    return newItems;
}

export function filterColor(color, items)
{
    const newItems =  items.filter((item) =>(
        item.color === color
    ))
    return newItems;
}

export function filterCategory(category, items)
{
    const newItems =  items.filter((item) =>(
        item.category === category
    ))
    return newItems;
}

export function getFilteredItems(occasion, type, color, category, items)
{
    
    if(occasion !== 'None')
        items = filterOccasion(occasion, items);
    if(type !== 'None')
        items = filterType(type, items);
    if(color !== 'None')
        items = filterColor(color, items);
    if(category !== 'None')
        items = filterCategory(category, items);
    return items;
}