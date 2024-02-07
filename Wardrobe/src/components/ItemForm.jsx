import { useNavigate } from "react-router-dom";
import { COLORS, TYPES } from "../data/data";
import {useDispatch} from 'react-redux';
import { dresserActions } from "../store/dresser-clother";
import { useRef } from "react";
export default function ItemForm({method, item})
{
    const formElement = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    function handleAddedItem(event)
    {
        event.preventDefault();
        const fd = new FormData(event.target);
        const data = Object.fromEntries(fd.entries());
        
        if(method == 'Edit')
        {
            data.id = item.id;
            dispatch(dresserActions.editItem(data));
            navigate('..');
        }
        else{

            dispatch(dresserActions.addItem(data));
        }

        formElement.current.reset();
        

    }


    return(
        <form  ref={formElement} onSubmit={handleAddedItem}>
            <div className="grid justify-center my-10">
            <h1 className="text-stone-500 font-mono font-bold text-3xl mx-32">{method} Item</h1>
            <section className="rounded border-2 bg-slate-200 h-96  border-black my-10 w-auto">
                <div className="p-5">
                    <label className="px-2" >Item Name:</label>
                    <input className="bg-blue-100 border-2 text-black border-black px-1" name="name" id="name" required defaultValue={item ? item.name : ''} />
                </div>
                <div className="p-5">
                <label className="px-2" >Item Type:</label>
                    <select className="w-40 bg-blue-100 border-2 text-black border-black" name="type" id="type" defaultValue={item ? item.type : ''}>
                        {TYPES.map((type) => (
                            <option key={type} value={type} >{type}</option>
                        )
                        )}
                    </select>
                </div>

                <div className="p-5">
                <label className="px-2" >Item Color:</label>
                    <select className="w-40 bg-blue-100 border-2 text-black border-black" name="color" id="color" defaultValue={item ? item.color : ''}>
                        {COLORS.map((color) => (
                            <option key={color} value={color} >{color}</option>
                        )

                        )}
                    </select>
                </div>
                <div className="p-2">
                        <label>Item Description: <p className="text-xs">(50 characters)</p></label>
                        <textarea maxLength={50} className="w-80 bg-blue-100 border-2 text-black border-black" name="description" id="description" placeholder="Enter short Item Description" defaultValue={item ? item.description : ''}></textarea>
                </div>
                
                <button type="submit" className="bg-green-500 hover:bg-green-800  border-2 rounded border-black text-white font-bold w-40 h-12 mx-20">{(method == 'Add') ? 'Add' : 'Edit'} Item</button>
            </section>
            </div>
        </form>
    );
}

