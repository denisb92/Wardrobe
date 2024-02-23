import ClothesCategory from "../components/ClothesCategory";
import { TYPES } from "../data/data";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dresserActions } from "../store/dresser-clother";
import DeleteModal from "../components/DeleteItemModal";
import FilterModal from "../components/FilterModal";
import { getFilteredItems } from "../components/helper/FilterLogic";
export default function Closet()
{
    const allItems = useSelector(state => state.dresser.items);
    const initalItemInfo = {
        name: '',
        id: -1,
        category: '',
        occasion: ''
    }
    const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
    const [filterModalIsOpen, setFilterModalIsOpen] = useState(false);
    const [itemInfo, setItemInfo] = useState(initalItemInfo);
    const [filteredItems, setFilterItems] = useState(allItems);

    const dispatch = useDispatch();
    function toggleDeleteModal(id, name, category, occasion)
    {
        setItemInfo({name, id, category, occasion});
        setDeleteModalIsOpen(true);
    }

    function onCancel()
    {
        setDeleteModalIsOpen(false);
    }

    function onDelete()
    {
        dispatch(dresserActions.deleteItem({id: itemInfo.id, category: itemInfo.category, occasion: itemInfo.occasion }));
        setDeleteModalIsOpen(false);
    }

    function applyFilterToCloset(formData)
    {
        const newFiltered = getFilteredItems(formData.Occasion, formData.Type, formData.Color, formData.Category, allItems);
        setFilterItems(newFiltered);
        setFilterModalIsOpen(false);
    }

    return(
        <div>
            <DeleteModal open={deleteModalIsOpen} name={itemInfo.name} onDelete={onDelete} onCancel={onCancel}/>
            <FilterModal open={filterModalIsOpen} filterFunc={applyFilterToCloset} closeFunc={() => setFilterModalIsOpen(false)} />
            <div className="py-8 text-center">
                <h1 className="text-7xl font-serif text-stone-700">Closet</h1>
                <button className="text-black  hover:text-white border-2 border-black rounded w-20 my-2 " onClick={() => setFilterModalIsOpen(true)} >Filter Settings</button>
            </div>
            {TYPES.map((type) => (
                <div key ={type}>                
                    <ClothesCategory allItems={filteredItems} clothesType={type} toggleDeleteModalFunc={toggleDeleteModal}/>
                </div>
            ))}
            
        </div>
    )
}