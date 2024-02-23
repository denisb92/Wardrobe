import { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import { getStyleClass } from "../helper/ColorLogic";

export default function ClothesItem({ type, outfit, randomizeOneClothing})
{
    const [clothesItem, setClothesItem] = useState(outfit);

    useEffect(() =>{
        setClothesItem(outfit);
    }, [outfit])

    
    function generateRandomClothes()
    {
        const newClothing = randomizeOneClothing(type)
        if(newClothing !== undefined)
        {
            setClothesItem(newClothing);
        }
    }
    const classStyle = (clothesItem === null) ? "" : getStyleClass(clothesItem.color);
    
    return(
        <>
        {clothesItem !== null &&
        <section className= {classStyle}>
            
            <p className="text-lg text-white">Name: <label className="text-black">{clothesItem.name} </label></p>
            <p className="text-md">Type: {clothesItem.type}</p>
            <p className="text-md">Color: {clothesItem.color}</p>
            
            <div className="flex items-start">
                <button onClick={generateRandomClothes}  className="font-bold border-2 mx-10 w-24 h-fit bg-yellow-100 rounded border-black text-sm my-2">Randomize</button>
                {clothesItem.type !== 'N/A' && <Link to={`/closet/view/${clothesItem.id}`} className="font-bold mx-10 text-center border-2 w-24 h-fit my-2 bg-blue-100 rounded border-black text-sm">View Item</Link>}
            </div>
        </section>}
        </>
    );

}