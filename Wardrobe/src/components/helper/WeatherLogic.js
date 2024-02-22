

export function checkWeather(availableTypesToWear,items)
{
        let allWeatherItems = [];
                 items.forEach((item) =>{
                    if(availableTypesToWear.find((availableType) => availableType === item.type))
                        allWeatherItems.push(item);
                 }
                )
        return allWeatherItems;
    
}

export function checkAvailableOutfitTypes(settings, temp)
{
        let newAvailableTypesToWear =[];
        settings.forEach((setting) =>{
            if(setting.minTemp <= temp && temp <= setting.maxTemp )
            {
                newAvailableTypesToWear.push(setting.name);
            }
        })
        return newAvailableTypesToWear;
}