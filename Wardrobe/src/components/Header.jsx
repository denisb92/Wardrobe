import { useSelector } from 'react-redux'
import {Outlet, Link} from 'react-router-dom'

export default function Header(){
    return(
        <>
        <header className="grid rounded border-2 bg-stone-500 h-24 border-black text-center">
            <div>
                <Link to="/" className=" text-white font-serif text-4xl">Dresser</Link>
                </div>
                
                    <label><Link to="/add-item" className=" text-white font-serif">+ Add Item</Link></label>
                    <button className=" text-white font-serif">Settings</button>
                
            </header>
            <div className='py-2 grid justify-center'>
            <Outlet/>
            </div>
            </>
        
    )
}