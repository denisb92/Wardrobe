import { useEffect, useRef } from "react"
import '../index.css'
export default function Modal({open, name, onDelete, onCancel})
{
    const dialog = useRef();
    useEffect(() =>{
        if(open)
        {
            dialog.current.showModal();
        }
        else{
            dialog.current.close();
        }
    })

    return(<dialog className="modal" ref={dialog}>
        <section className="bg-red-100 h-40 w-80 border-2 border-black shadow-2xl backdrop-blur-sm">
            <div className="text-center">
            <h1 className="font-bold text-xl text-red-500">Delete Item</h1>
            <p className="text-md">Are you sure you want to delete Item:</p>
            <p className="text-xl font-bold">{name}</p>
            </div>
            <div className="py-6 ">
                <button onClick={onCancel} className=" text-white bg-gray-400 hover:bg-gray-800 w-20 mx-10 border-black border-2">Cancel</button>
                <button onClick={onDelete} className="bg-red-500 hover:bg-red-800 text-white border-black border-2 w-20">Delete</button>
            </div>
        </section>
    </dialog>)
}