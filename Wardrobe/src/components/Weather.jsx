import { useSelector } from "react-redux";

export default function Weather({temp, condition}){
    //const temp = useSelector(state => state.weather.tempF);
    //const condition = useSelector(state => state.weather.condition);
  
    let conditionClass = "h-fit w-100 border-black border-2";
    conditionClass += (condition === "Clear" || condition === "Sunny") ? " bg-gradient-to-r from-yellow-200 to-blue-100" : " bg-gradient-to-r from-blue-500 to-stone-300";

    return(
       <section className= {conditionClass} >
            <div className="flex justify-center">
                <h1 className="text-stone-700 font-bold font-mono text-lg">Weather Info</h1>
            </div>
            <div className="grid justify-center my-2" >
                <label className="font-bold font-serif">Temperature </label>
                
                <p className="font-bold text-center text-md">{temp.toFixed(0)}°</p>
                <label className="font-bold font-serif">Condition</label>
                <p className="font-bold text-center text-md">{condition}</p>

                
            </div>
       </section>
    )
}