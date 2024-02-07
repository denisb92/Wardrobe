import ClothesCategory from "./ClothesCategory";
import { TYPES } from "../data/data";
export default function Closet()
{
    return(
        <div>
            {TYPES.map((type) => (
                <div key ={type}>                
                    <ClothesCategory clothesType={type}/>
                </div>
            ))}
            
        </div>
    )
}