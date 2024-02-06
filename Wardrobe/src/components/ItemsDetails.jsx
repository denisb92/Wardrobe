import { useSelector } from 'react-redux';
import {useParams} from 'react-router-dom'
export default function ItemsDetails(){
    const params = useParams();
    console.log(params.itemId);
    const allItems = useSelector(state => state.dresser.items);
    //const foundItem = allItems.filter((element) => element.id === params.itemId );
    console.log( allItems[params.itemId-1]);
    const {title, type, color, minTemp,maxTemp, condition, description  } = allItems[params.itemId-1];
    const colorStr =  (color === 'white') ? 'text-black' : 'text-' + color + '-400';
    console.log(colorStr);
    return(
        <>
        <div className='bg-white w-80 h-fit text-center font-serif font-bold flex-wrap grid border-2 border-black'>
            <h1 className="text-3xl text-stone-400">Item</h1>
            <p className='text-xl'>Name: </p>
            <label className='text-blue-500'>{title}</label>
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
            <button className='py-4 text-green-400 hover:text-green-800' >Edit</button>
            <button className='text-red-400 hover:text-red-800'>Delete</button>
            </div>    
        </div>
        
        </>
      
    );
}


