import { settingsActions } from "../store/settings";
import RangeDials from "./RangeDials";
import { useDispatch, useSelector } from "react-redux";

export default function Settings(){

    const allSettings = useSelector(state => state.settings.settings);
    const dispatch = useDispatch();
    function handleUpdate(event)
    {
        event.preventDefault();
        const fd = new FormData(event.target);
        let newSettings = [];

         for(let i = 0; i < allSettings.length; i++)
         {
            newSettings.push({name: allSettings[i].name, category: allSettings[i].category,  minTemp: +fd.get(`${allSettings[i].name}min`), maxTemp: +fd.get(`${allSettings[i].name}max`)})
         }
         dispatch(settingsActions.changeClothingSetting(
           {settings: newSettings}))
         window.alert("Settings Updated! Generate new outfit!");
    }

    return(
       <form onSubmit={handleUpdate}>
       <h1  className="text-4xl font-serif font-bold">I Wear</h1>
       {allSettings.map((setting) => (
        <div key={setting.name}>
        <RangeDials  title={setting.name} minTemp={setting.minTemp} maxTemp={setting.maxTemp}/>
        </div>
       ))}

       <div className="text-center py-4" >
       <button type="submit"  className=" bg-green-400 w-20 h-8 mx-32 border-2 border-black ">Update</button>
       </div>
       </form>
    )
}