import { dresserActions } from "../store/dresser-clother";
import { settingsActions } from "../store/settings";
import RangeDials from "./RangeDials";
import { useDispatch, useSelector } from "react-redux";
import { checkAvailableOutfitTypes } from "./helper/WeatherLogic";
import { useState } from "react";
import { SETTINGS_FILTER } from "../data/FilterSettings";

const RESET_CHECKED_STATE = {
   "All": false,
   "Jacket": false,
   "Top": false,
   "Bottom": false,
   "Footwear": false
}

export default function Settings(){

    const initialCheckedState ={
      "All": true,
      "Jacket": false,
      "Top": false,
      "Bottom": false,
      "Footwear": false
    };
    const allSettings = useSelector(state => state.settings.settings);
    const currentTemp = useSelector(state => state.weather.tempF);
    const [checkedState, setCheckedState] = useState(initialCheckedState);
    const dispatch = useDispatch();

    function handleUpdate(event)
    {
        event.preventDefault();
        const fd = new FormData(event.target);
        const propertyNames = Object.getOwnPropertyNames(Object.fromEntries(fd.entries()));

        let newSettings = [];

         for(let i = 0; i < allSettings.length; i++)
         {
            if(propertyNames.find((prop) => prop === `${allSettings[i].name}min`)){
               newSettings.push({name: allSettings[i].name, category: allSettings[i].category,  minTemp: +fd.get(`${allSettings[i].name}min`), maxTemp: +fd.get(`${allSettings[i].name}max`)})
            }
            else
            {
               newSettings.push(allSettings[i]);
            }
         }

         const newAvailableTypes = checkAvailableOutfitTypes(newSettings, currentTemp);
         dispatch(settingsActions.changeClothingSetting(
           {settings: newSettings, newAvailableTypes}))

         window.alert("Settings Updated! Generate new outfit!");
         dispatch(dresserActions.checkOutfit({availableTypes: newAvailableTypes}))
    }

    function changeSetting(event)
    {
         setCheckedState(() =>{
            return{
               ...RESET_CHECKED_STATE,
               [event.target.id]: true
            };
         } );
    }

    return(
      <>
      <h1 className="text-7xl font-serif text-stone-700 text-center">Settings</h1>
      <div className="grid grid-flow-col auto-cols-max py-4">
         {SETTINGS_FILTER.map((setting) => (
            <div className="px-2" key={setting}>
               <input name="settings" id={setting} type="radio" onChange={changeSetting} checked={checkedState[setting]}/>
               <label className="px-2 font-bold">{setting}</label>
            </div>
         ))}
      </div>
       <form onSubmit={handleUpdate}>
        <div className="mx-10">
       <h2  className="text-4xl font-serif font-bold">I Wear</h2>
       {allSettings.map((setting) => (
         <div key={setting.name}>
        {(checkedState["All"] === true ||  checkedState[setting.category] === true ) && <RangeDials  title={setting.name} minTemp={setting.minTemp} maxTemp={setting.maxTemp}/>}
        </div>
       ))}

       <div className="text-center py-4" >
       <button type="submit"  className=" hover:bg-green-500 bg-green-400 w-20 h-8  border-2 border-black ">Update</button>
       </div>
       </div>
       </form>
       </>
    )
}