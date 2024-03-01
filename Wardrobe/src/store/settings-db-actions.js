import { dbSettingsUrl } from "../data/data_links";
import { checkAvailableOutfitTypes } from "../helper/WeatherLogic";
import { settingsActions } from "./settings";

export const fetchSettingsData =(currentTemp) =>{
    return async dispatch =>{
    const fetchData = async () =>{
        const response = await fetch(dbSettingsUrl);
        if(!response.ok)
        {
            throw new Error('Could not retrieve setting data');
        }

        const data = await response.json();
        return data;
    };
    try{
       const data = await fetchData();
       const newAvailableTypes = checkAvailableOutfitTypes(data.settings, currentTemp);
       dispatch(settingsActions.changeClothingSetting({settings: data.settings, newAvailableTypes }));
    }
    catch(error)
    {
        throw new Error(error);
    }
}
}

export const sendSettingsData =  (settings) =>{
    const sendRequest = async () => {
        const response = await fetch(
        dbSettingsUrl,
        {
            method: 'PUT',
            body: JSON.stringify({settings: settings.settings}),

        }
    );
 
        if(!response.ok)
        {
            throw new Error('Sending settings data failed');
        }
    };
    try{
        sendRequest();
    }
    catch(error)
    {
        throw new Error(error);
    }

}