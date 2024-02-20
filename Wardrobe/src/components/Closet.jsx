import ClothesCategory from "./ClothesCategory";
import { TYPES } from "../data/data";
import Modal from "./DeleteItemModal";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dresserActions } from "../store/dresser-clother";
export default function Closet()
{
    const allItems = useSelector(state => state.dresser.items);
    const initalItemInfo = {
        name: '',
        id: -1,
        category: '',
        occasion: ''
    }
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [itemInfo, setItemInfo] = useState(initalItemInfo);
    const dispatch = useDispatch();
    function toggleDeleteModal(id, name, category, occasion)
    {
        setItemInfo({name, id, category, occasion});
        setModalIsOpen(true);
    }

    function onCancel()
    {
        setModalIsOpen(false);
    }

    function onDelete()
    {
        dispatch(dresserActions.deleteItem({id: itemInfo.id, category: itemInfo.category, occasion: itemInfo.occasion }));
        setModalIsOpen(false);
    }

    return(
        <div>
            <Modal open={modalIsOpen} name={itemInfo.name} onDelete={onDelete} onCancel={onCancel}></Modal>
            {TYPES.map((type) => (
                <div key ={type}>                
                    <ClothesCategory allItems={allItems} clothesType={type} toggleDeleteModalFunc={toggleDeleteModal}/>
                </div>
            ))}
            
        </div>
    )
}