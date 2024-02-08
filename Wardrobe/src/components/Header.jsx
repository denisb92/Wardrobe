import { useSelector } from 'react-redux'
import {Outlet, Link} from 'react-router-dom'

export default function Header(){
    return(
        <>
        <header className="grid rounded border-2 bg-stone-500 h-fit border-black text-center">
            <div>
                <Link to="/" className=" text-white font-serif text-4xl">Dresser</Link>
                </div>
                    <label><Link to="/add-item" className=" text-white font-serif">+ Add Item</Link></label>
                    <label><Link to="/settings" className=" text-white font-serif">Settings</Link></label>
                
                    <label><Link to="/closet" className=" text-white font-serif">Closet</Link></label>
            </header>
            <div className='py-2 grid justify-center'>
            <Outlet/>
            </div>
            </>
        
    )
}