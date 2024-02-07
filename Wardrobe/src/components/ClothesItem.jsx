import { useState } from "react";
import { useSelector } from "react-redux";
import {Link} from 'react-router-dom';
export default function ClothesItem({temp, condition, type})
{

    const clothesItems = useSelector(state => state.dresser.items);
    const noClothes = {name: "NA", type: type, color: "NA", description: "NA"};
    const specificClothes = clothesItems.filter((element) => element.type === type)// && element.minTemp <= temp &&
    // element.maxTemp >= temp && element.condition === condition);
     
    const clothesIndex = Math.floor(Math.random() * specificClothes.length);
    const [clothesItem, setClothesItem] = useState((specificClothes.length === 0) ? noClothes : specificClothes[clothesIndex]);
    
    function generateRandomClothes()
    {
        const newSpecificClothes = clothesItems.filter((element) => element.type === clothesItem.type && element.id !== clothesItem.id);// && element.minTemp <= temp &&
        // element.maxTemp >= temp && element.condition === condition && element.id !== clothesItem.id); 
         
        const newClothesIndex = Math.floor(Math.random() * newSpecificClothes.length);
        const newClothesItem = (specificClothes.length === 0) ? noClothes: specificClothes[newClothesIndex];
        setClothesItem( newClothesItem );
    }
    return(
        <section className="justify-items-start  font-semibold font-serif text-black bg-white px-2 grid border-black h-36 border-2 rounded bg-gradient-to-r from-white to-slate-300" >
            
            <p>Item Name: {clothesItem.name}</p>
            <p>Type: {clothesItem.type}</p>
            <p>Color: {clothesItem.color}</p>
            
            <div className="flex items-start">
                <button onClick={generateRandomClothes}  className="font-bold border-2 mx-10 w-24 h-8 bg-yellow-100 rounded border-black text-sm">Randomize</button>
                {clothesItem !== noClothes && <Link to={`/closet/view/${clothesItem.id}`} className="font-bold mx-10 text-center border-2 w-24 h-8 bg-blue-100 rounded border-black text-sm">View Item</Link>}
            </div>
        </section>
    );

}