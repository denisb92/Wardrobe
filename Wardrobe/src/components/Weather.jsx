import { useSelector } from "react-redux";

export default function Weather(){
    const temp = useSelector(state => state.weather.tempF);
    const condition = useSelector(state => state.weather.condition);
  
    let conditionClass = "h-fit w-100 border-black border-2";
    conditionClass += (condition === "Clear") ? " bg-yellow-200" : " bg-blue-300";

    return(
       <section className= {conditionClass} >
            <div className="flex justify-center">
                <h1 className="text-stone-500 font-bold font-mono text-xl">Weather Info</h1>
            </div>
            <div className="grid justify-center my-2" >
                <label className="font-bold font-serif">Temperature </label>
                
                <p className="font-bold text-center text-lg">{temp.toFixed(0)}°</p>
                <label className="font-bold font-serif">Condition</label>
                <p className="font-bold text-center text-lg">{condition}</p>

                
            </div>
       </section>
    )
}