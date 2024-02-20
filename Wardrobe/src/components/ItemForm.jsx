import { useNavigate } from "react-router-dom";
import { COLORS, OCCASION, OCCASIONSET, TYPES } from "../data/data";
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
        <form ref={formElement} onSubmit={handleAddedItem}>
            <div className="grid justify-center my-10">
            <h1 className="font-mono font-bold text-4xl mx-32">{method} Item</h1>
            <section className="rounded border-2 bg-gradient-to-tr from-white to-blue-300 h-fit py-2 border-black my-10 w-auto shadow-2xl">
                <div className="p-5">
                    <label className="px-4 font-bold text-lg" >Name:</label>
                    <input className="bg-blue-100 border-2 text-black border-black px-1" name="name" id="name" required defaultValue={item ? item.name : ''} maxLength={25} />
                </div>
                <div className="p-5">
                <label className="px-4 font-bold text-lg" >Type:</label>
                    <select className="w-40 bg-blue-100 border-2 text-black border-black" name="type" id="type" defaultValue={item ? item.type : ''}>
                        {TYPES.map((type) => (
                            <option key={type} value={type} >{type}</option>
                        )
                        )}
                    </select>
                </div>
                <div className="p-5">
                <label className="px-4 font-bold text-lg" >Occasion:</label>
                    <select className="w-40 bg-blue-100 border-2 text-black border-black" name="occasion" id="occasion" defaultValue={item ? item.occasion : ''}>
                        {OCCASIONSET.map((occasion) => (
                            <option key={occasion} value={occasion} >{occasion}</option>
                        )
                        )}
                    </select>
                </div>

                <div className="p-5">
                <label className="px-4 font-bold text-lg" >Color:</label>
                    <select className="w-40 bg-blue-100 border-2 text-black border-black" name="color" id="color" defaultValue={item ? item.color : ''}>
                        {COLORS.map((color) => (
                            <option key={color} value={color} >{color}</option>
                        )

                        )}
                    </select>
                </div>
                <div className="p-2">
                        <label className="px-4 font-bold text-lg">Description: <p className="text-xs px-4">(50 characters max)</p></label>
                        <textarea maxLength={50} className="w-96 bg-blue-100 border-2 text-black border-black" name="description" id="description" placeholder="Enter short Item Description" defaultValue={item ? item.description : ''}></textarea>
                </div>
                
                <button type="submit" className="bg-green-500 hover:bg-green-800  border-2 rounded border-black text-white font-bold w-40 h-12 mx-20">{(method == 'Add') ? 'Add' : 'Edit'} Item</button>
            </section>
            </div>
        </form>
    );
}

