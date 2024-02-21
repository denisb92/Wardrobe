export default function FilterSetting({name, selections})
{
    return(
        <div className="py-4 ">
        <label className="font-bold px-2">{name}:</label>
        <select className="bg-stone-200 border-2 border-black" defaultValue="None" name={name}>
            {selections.map((selection) =>(
                <option key={selection}>{selection}</option>  
            )
            )}
    </select>
    </div>
    )
}