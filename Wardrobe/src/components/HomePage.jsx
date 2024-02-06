import { DUMMY_DATA } from "../data/DUMMY_DATA"
import ClothesItem from "./ClothesItem"
import Weather from "./Weather"
export default function HomePage(){
    const tempCases = [{temp: 70, condition: "Sunny"}, {temp: 20, condition: "Sunny"}, {temp: 100, condition: "Rainy"}, {temp: 20, condition: "Rainy"} ];
    const indx = Math.floor(Math.random() * tempCases.length);
    const {temp, condition} = tempCases[indx];
    return(
        <section className="gap-2 w-1/4 grid grid-flow-row items-center">
            <Weather  />
                {temp < 40 && <ClothesItem temp={temp} condition={condition} type="jacket" />}
                <ClothesItem temp={temp} condition={condition} type="shirt" />
                <ClothesItem temp={temp} condition={condition} type="pants"/>
                 <ClothesItem temp={temp} condition={condition} type="shoes"/>
                
        </section>
    )
}