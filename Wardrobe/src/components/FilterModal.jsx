import { useEffect, useRef } from "react";
import FilterSetting from "./FilterSetting";
import { CATEGORIES_SETTINGS, COLORS_SETTINGS, OCCASION_SETTINGS, TYPES_SETTINGS } from "../data/FilterSettings";

export default function FilterModal({open, filterFunc, closeFunc})
{
    const dialog = useRef();
    
    useEffect(() =>{
        if(open)
        {
            dialog.current.showModal();
        }
        else
        {
            dialog.current.close();
        }
    });

    function applyFilters(event)
    {
        event.preventDefault();
        const fd = new FormData(event.target);
        const data = Object.fromEntries(fd.entries());
        filterFunc(data);
    }

    return(<dialog className="modal" ref={dialog}>
        <form className="bg-gradient-to-tr from-stone-300 to-blue-200 h-90 w-96 border-4 border-black rounded" onSubmit={applyFilters}>
            <div>
                <div className="font-bold bg-gray-500 text-2xl  text-white">
                    <div className="flex justify-end">
                        <button className="px-2" onClick={closeFunc}>x</button>
                    </div>
                    <p className="text-center  py-2">Filter Settings</p>
                    
                </div>
                <FilterSetting name="Occasion" selections={OCCASION_SETTINGS}/>
                <FilterSetting name="Type" selections={TYPES_SETTINGS}/>
                <FilterSetting name="Color" selections={COLORS_SETTINGS}/>
                <FilterSetting name="Category" selections={CATEGORIES_SETTINGS}/>
            </div>
            <div className="mx-20 my-10 px-2">
                <button type="submit" className=" h-fit w-36  bg-green-400 hover:bg-green-500 border-2 border-black m-2">Apply Filters</button>
                <button type="reset" className=" h-fit w-36 bg-stone-400 hover:bg-stone-500 border-2 border-black m-2">Clear Filters</button>
            </div>
        </form>
    </dialog>)
}