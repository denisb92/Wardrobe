import { useDispatch, useSelector } from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom'
import { dresserActions } from '../store/dresser-clother';
export default function ItemsDetails(){
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const allItems = useSelector(state => state.dresser.items);
    const itemId = params.itemId;

    const {name, type, color, minTemp,maxTemp, condition, description  } = allItems[params.itemId];

    function editItem()
    {
        navigate('/clothes/edit/' + itemId);
    }

    function deleteItem()
    {
        const proceed = window.confirm("Are you sure you want to delete Item: " + title);
        if(proceed)
        {
            dispatch(dresserActions.deleteItem({id: itemId}));
            navigate('..');
        }
    }

    return(
        <>
        <div className='bg-white w-80 h-fit text-center font-serif font-bold flex-wrap grid border-2 border-black'>
            <h1 className="text-3xl text-stone-400">Item</h1>
            <p className='text-xl'>Name: </p>
            <label className='text-blue-500'>{name}</label>
            <p className='text-xl'>Type:</p>
            <label className='text-blue-500'>{type}</label>

            <p className='text-xl'>Color: </p>
            <label className="text-blue-500">{color}</label>

            <p className='text-xl'>Temperature:</p>
            <label className='text-blue-500'> {minTemp}° - {maxTemp}°</label>
            <p className='text-xl'>Condition: </p>
            <label className='text-blue-500'>{condition}</label>
            <p>Description:</p>
            <label className='text-blue-500'> {description}</label>
            <div className='flex-wrap grid'>
            <button onClick={editItem} className='py-4 text-green-400 hover:text-green-800' >Edit</button>
            <button onClick={deleteItem}  className='text-red-400 hover:text-red-800'>Delete</button>
            </div>    
        </div>
        
        </>
      
    );
}


