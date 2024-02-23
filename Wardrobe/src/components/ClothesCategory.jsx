import { useState } from "react";
import { Link } from "react-router-dom";
import { getColor } from "../helper/ColorLogic";
export default function ClothesCategory({allItems, clothesType, toggleDeleteModalFunc})
{
    const [showCategory, setShowCategory] = useState(true);

    const categoryItems = allItems.filter((item) => item.type === clothesType);
    let categoryStyle = (showCategory) ? "text-4xl font-serif font-bold hover:text-white" : "text-4xl font-serif text-stone-400 font-bold hover:text-white"

    function toggleHide()
    {
        setShowCategory(!showCategory);
    }

    return(     <section className="py-2">
                <button className={categoryStyle} onClick={toggleHide}>{clothesType} </button>
                {showCategory && categoryItems.map((item) =>(
                  <section key={item.id} className={`justify-items-start  font-semibold font-serif text-black bg-white px-2 my-2 grid border-black h-36 border-2 rounded bg-gradient-to-tr from-stone-300 to-${getColor(item.color)}`} >
            
                <p className="text-xl">Name: {item.name}</p>
                <p className="text-lg">Type: {item.type}</p>
                <p className="text-lg">Color: {item.color}</p>
                  
                  <div className="flex items-start">
                      
                      <Link to={`/closet/view/${item.id}`} className="font-bold mx-10 text-center border-2 w-24 h-8 bg-blue-100 rounded border-black text-sm">View Item</Link>
                      <button onClick={() => toggleDeleteModalFunc(item.id, item.name, item.category, item.occasion)} className="font-bold mx-10 text-center border-2 w-24 h-8 bg-red-500 rounded border-black text-sm">Delete</button>
                  </div>
              </section>
                ))}
            </section>);
}