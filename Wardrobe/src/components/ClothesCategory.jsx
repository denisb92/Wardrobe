import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { dresserActions } from "../store/dresser-clother";
export default function ClothesCategory({clothesType})
{
    const [showCategory, setShowCategory] = useState(true);
    const allItems = useSelector(state => state.dresser.items);

    const categoryItems = allItems.filter((item) => item.type == clothesType);
    const dispatch = useDispatch();
    let categoryStyle = (showCategory) ? "text-4xl font-serif font-bold hover:text-white" : "text-4xl font-serif text-stone-400 font-bold hover:text-white"

    function toggleHide()
    {
        setShowCategory(!showCategory);
    }

    function deleteItem(itemId, name)
    {
        const proceed = window.confirm("Are you sure you want to delete Item: " + name);
        if(proceed)
        {
            dispatch(dresserActions.deleteItem({id: itemId}));
            
        }
    }
    return(     <section className="py-2">
                <button className={categoryStyle} onClick={toggleHide}>{clothesType} </button>
                {showCategory && categoryItems.map((item) =>(
                  <section key={item.id} className="justify-items-start  font-semibold font-serif text-black bg-white px-2 my-2 grid border-black h-36 border-2 rounded bg-gradient-to-r from-white to-slate-300" >
            
                <p className="text-xl">Name: {item.name}</p>
                <p className="text-lg">Type: {item.type}</p>
                <p className="text-lg">Color: {item.color}</p>
                  
                  <div className="flex items-start">
                      
                      <Link to={`/closet/view/${item.id}`} className="font-bold mx-10 text-center border-2 w-24 h-8 bg-blue-100 rounded border-black text-sm">View Item</Link>
                      <button onClick={() => deleteItem(item.id, item.name)} className="font-bold mx-10 text-center border-2 w-24 h-8 bg-red-500 rounded border-black text-sm">Delete</button>
                  </div>
              </section>
                ))}
            </section>);
}