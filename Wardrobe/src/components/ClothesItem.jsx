import { useState } from "react";
import { useSelector } from "react-redux";
import {Link} from 'react-router-dom';
import { checkWeather } from "./helper/WeatherLogic";
export default function ClothesItem({temp, condition, type})
{
    const clothesItems = useSelector(state => state.dresser.items);
    const settings = useSelector(state => state.settings.settings);
    const filteredItems = checkWeather(temp, settings, clothesItems, type);
    const noClothes = {name: "NA", type: type, color: "NA", description: "NA"};

    const clothesIndex = Math.floor(Math.random() * filteredItems.length);
    const [clothesItem, setClothesItem] = useState((filteredItems.length === 0) ? noClothes : filteredItems[clothesIndex]);
    
    function generateRandomClothes()
    {
        const newFilteredItems = checkWeather(temp, settings, clothesItems, type);
        const newFilteredItemsId =  newFilteredItems.filter((item) => item.id !== clothesItem.id);
        if(newFilteredItemsId.length !== 0)
        {
            const newClothesIndex = Math.floor(Math.random() * newFilteredItemsId.length);
            setClothesItem( newFilteredItemsId[newClothesIndex] );
        }
    }
    return(
        <section className="justify-items-start  font-semibold font-serif text-black bg-white px-2 grid border-black h-36 border-2 rounded bg-gradient-to-tr from-stone-300 to-blue-400 shadow-2xl" >
            
            <p className="text-xl text-white">Name: <label className="text-black">{clothesItem.name} </label></p>
            <p className="text-lg">Type: {clothesItem.type}</p>
            <p className="text-lg">Color: {clothesItem.color}</p>
            
            <div className="flex items-start">
                {filteredItems.length > 1  && <button onClick={generateRandomClothes}  className="font-bold border-2 mx-10 w-24 h-8 bg-yellow-100 rounded border-black text-sm">Randomize</button>}
                {clothesItem !== noClothes && <Link to={`/closet/view/${clothesItem.id}`} className="font-bold mx-10 text-center border-2 w-24 h-8 bg-blue-100 rounded border-black text-sm">View Item</Link>}
            </div>
        </section>
    );

}