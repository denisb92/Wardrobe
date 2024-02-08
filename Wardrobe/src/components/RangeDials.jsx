import { useEffect, useRef, useState } from "react";
export default function RangeDials({title})
{
    const [minDialVal, setMinDial] = useState(0);
    const [maxDialVal, setMaxDial] = useState(0);
    const minDial = useRef();
    const maxDial = useRef();
    

    function onChangedValue(id, event)
    {
        console.log(event);
        if(id == "min")
        {
            setMinDial(event.target.value);
            setTimeout(() =>{

                if(minDialVal > maxDialVal)
                {
                    
                    setMaxDial(minDial.current.value);
                }
            }, 500)
            
        }
            
        else
        {
            setMaxDial(event.target.value);
            setTimeout(() =>{

                if(minDialVal > maxDialVal)
                {
                    setMinDial(maxDial.current.value);
                }
            }, 500)
        }
            

        
    }
    return(
        <>
        <h1 className="text-3xl py-2"> {title} when...</h1>
        <section className="bg-stone-400 border-2 border-black shadow-2xl w-80 text-center ">
        
        
        <div>
        <h1 className="text-3xl text-white">Min</h1>
         <p className="text-2xl">{minDialVal}°</p>
            <input  type="range" min="0" max="100" id="lower" value={minDialVal} ref={minDial}  onChange={(event) => onChangedValue('min', event)}/>  
         </div>

         <div>
            <h1 className="text-3xl text-white">Max</h1>
            <p className="text-2xl">{maxDialVal}°</p>
            <input type="range" min="0" max="100" id="higher" value={maxDialVal} ref={maxDial}  onChange={(event) => onChangedValue('max', event)}/>
         </div>
        
     </section>
     </>
    )
}