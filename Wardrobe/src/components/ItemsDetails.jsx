import { useDispatch, useSelector } from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom'
import { dresserActions } from '../store/dresser-clother';
import { useState } from 'react';
import Modal from './DeleteItemModal';
import DeleteModal from './DeleteItemModal';
export default function ItemsDetails(){
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const allItems = useSelector(state => state.dresser.items);
    const itemId = params.itemId;
    const {id, name, type, category, occasion, color, condition, description  } = allItems[itemId];
    const [modalIsOpen, setModalIsOpen] = useState(false);

    function editItem()
    {
        navigate('/closet/edit/' + itemId);
    }

    function toggleDeleteModal()
    {
        setModalIsOpen(true);
    }

    function onCancel()
    {
        setModalIsOpen(false);
    }

    function deleteItem()
    {
        dispatch(dresserActions.deleteItem({id, category, occasion}));
        navigate('..');
    }


    return(
        <>
        <DeleteModal open={modalIsOpen} name={name} onDelete={deleteItem} onCancel={onCancel} />
        <h1 className="text-4xl font-serif font-bold py-2 text-center">Item</h1>
        <div className='bg-gradient-to-tr from-stone-300 to-blue-400 w-80 h-fit text-center font-serif font-bold flex-wrap grid border-2 border-black shadow-2xl '>
            <p className='text-2xl text-white'>Name: </p>
            <label className='text-lg'>{name}</label>
            <p className='text-2xl text-white'>Type:</p>
            <label className='text-lg'>{type}</label>
            <p className='text-2xl text-white'>Occasion:</p>
            <label className='text-lg'>{occasion}</label>
            <p className='text-2xl text-white'>Color: </p>
            <label className='text-lg'>{color}</label>
            <p className='text-2xl text-white'>Condition: </p>
            <label className='text-lg'>{condition}</label>
            <p className='text-2xl text-white'>Description:</p>
            <label className='text-lg'> {description}</label>
            <div className='py-4'>
            <button onClick={editItem} className=' mx-4 bg-green-400 text-black w-20 hover:bg-green-800 border-2 border-black ' >Edit</button>
            <button onClick={toggleDeleteModal}  className='mx-4 bg-red-400 hover:bg-red-800 w-20 border-2 border-black'>Delete</button>
            </div>    
        </div>
        
        </>
      
    );
}


