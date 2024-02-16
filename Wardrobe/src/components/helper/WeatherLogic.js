

export function checkWeather(temp, settings, items)
{
        const allSettings = settings.filter((setting) => setting.minTemp <= temp && temp <= setting.maxTemp );
        let allWeatherItems = [];
        allSettings.forEach((setting) =>{
            
                 items.forEach((item) =>{
                    if(item.type === setting.name)
                        allWeatherItems.push(item);
                 }
                )
        })
        return allWeatherItems;
    
}