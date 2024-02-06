import { COLORS, TYPES } from "../data/data";
import {useDispatch} from 'react-redux';
import { dresserActions } from "../store/dresser-clother";
import { useRef } from "react";
export default function AddItem(){
    const formElement = useRef();
    const dispatch = useDispatch();
    function handleAddedItem(event)
    {
        event.preventDefault();
        const fd = new FormData(event.target);
        const data = Object.fromEntries(fd.entries());
        dispatch(dresserActions.addItem(data));
        console.log(data);
        formElement.current.reset();
        

    }

    return(
        <form ref={formElement} onSubmit={handleAddedItem}>
            <div className="grid justify-center my-10">
            <h1 className="text-stone-500 font-mono font-bold text-3xl mx-32">Add Item</h1>
            <section className="rounded border-2 bg-slate-200 h-96  border-black my-10 w-auto">
                <div className="p-5">
                    <label className="px-2" >Item Name:</label>
                    <input className="bg-blue-100 border-2 text-black border-black px-1" name="title" id="title" required />
                </div>
                <div className="p-5">
                <label className="px-2" >Item Type:</label>
                    <select className="w-40 bg-blue-100 border-2 text-black border-black" name="types" id="types">
                        {TYPES.map((type) => (
                            <option key={type} value={type}>{type}</option>
                        )
                        )}
                    </select>
                </div>

                <div className="p-5">
                <label className="px-2" >Item Color:</label>
                    <select className="w-40 bg-blue-100 border-2 text-black border-black" name="colors" id="colors">
                        {COLORS.map((type) => (
                            <option key={type} value={type}>{type}</option>
                        )

                        )}
                    </select>
                </div>
                <div className="p-2">
                        <label>Item Description: <p className="text-xs">(50 characters)</p></label>
                        <textarea maxLength={50} className="w-80 bg-blue-100 border-2 text-black border-black" name="description" id="description" placeholder="Enter short Item Description" ></textarea>
                </div>
                
                <button type="submit" className="bg-green-500 hover:bg-green-800  border-2 rounded border-black text-white font-bold w-40 h-12 mx-20">Add Item</button>
            </section>
            </div>
        </form>

    );

}