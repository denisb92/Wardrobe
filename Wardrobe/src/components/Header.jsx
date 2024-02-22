import { useSelector } from 'react-redux'
import {Outlet, Link, NavLink} from 'react-router-dom'

let currentSelectedStyle = "text-yellow-300 font-serif"
let notCurrentSelectedStyle = "text-white font-serif"
export default function Header(){
    return(
        <>
        <header className="grid rounded border-2 bg-stone-500 h-fit border-black text-center">
            <div>
                <Link to="/" className=" text-white font-serif text-4xl">Dresser</Link>
                </div>
                    <label><NavLink to="/add-item" className={({isActive}) => isActive ? currentSelectedStyle : notCurrentSelectedStyle} end>+ Add Item</NavLink></label>
                    <label><NavLink to="/settings" className={({isActive}) => isActive ? currentSelectedStyle : notCurrentSelectedStyle} end>Settings</NavLink></label>
                
                    <label><NavLink to="/closet" className={({isActive}) => isActive ? currentSelectedStyle : notCurrentSelectedStyle} end>Closet</NavLink></label>
            </header>
            <div className='py-2 grid justify-center'>
            <Outlet/>
            </div>
            </>
        
    )
}