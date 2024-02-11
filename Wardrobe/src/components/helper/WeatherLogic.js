

export function checkWeather(temp, settings, items, type)
{
        const allSettings = settings.filter((setting) => setting.category === type );
        let allItems =[];
        allSettings.forEach((setting) =>{
            if(setting.minTemp <= temp && temp <= setting.maxTemp)
            {
                const singleClothesCategory = items.filter((item) =>
                    item.type === setting.name
                )

                singleClothesCategory.forEach((item) =>
                    allItems.push(item)
                )
            
            }
        })
        
        return allItems;
    
}