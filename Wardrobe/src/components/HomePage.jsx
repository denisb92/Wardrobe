import { useDispatch, useSelector } from "react-redux";
import ClothesItem from "./ClothesItem"
import Weather from "./Weather"
import { CATEGORIES } from "../data/data";
import { dresserActions } from "../store/dresser-clother";
import { useEffect } from "react";
import { randomizeOneClothingFunc, randomizeOutfitFunc } from "./helper/OutfitLogic";
export default function HomePage(){
    const settings = useSelector(state => state.settings.settings);
    const jacketSetting = settings.filter((setting) => setting.category === 'Jacket');
    const items = useSelector(state => state.dresser.items);
    const tempCases = [{temp: 70, condition: "Sunny"}, {temp: 20, condition: "Sunny"}, {temp: 100, condition: "Rainy"}, {temp: 20, condition: "Rainy"} ];
    const indx = Math.floor(Math.random() * tempCases.length);
    //const {temp, condition} = tempCases[indx];
    const dispatch = useDispatch();
    const outfit = useSelector(state => state.dresser.currentOutfit);
    let temp = 70;
    let condition = "Clear";
    const isJacketWeather = jacketSetting[0].minTemp <= temp && jacketSetting[0].maxTemp >= temp
    const initialOutfitState = (outfit.Top === null) ? randomizeOutfitFunc(temp,settings, items, isJacketWeather) : outfit;
    useEffect(() =>{
        dispatch(dresserActions.setCurrentOutfit({outfit:initialOutfitState}));
    },[])

    function randomizeOutfit()
    {
        const newOutfit = randomizeOutfitFunc(temp, settings, items ,isJacketWeather);
        dispatch(dresserActions.setCurrentOutfit({outfit:newOutfit}));
    }

    function randomizeOneClothing(type)
    {
        const newClothing = randomizeOneClothingFunc(outfit, type, outfit[type].id, temp, settings, items);
        if(newClothing !== undefined)
        {
            dispatch(dresserActions.setNewClothing({type, clothingItem:newClothing}));
        }
        return newClothing;
    }

    return(
        <section className="gap-2 w-1/4 grid grid-flow-row items-center">
            <Weather temp={temp} condition={condition}  />
            {isJacketWeather && <ClothesItem temp={temp} condition={condition} type="Jacket"  outfit={outfit['Jacket']} randomizeOneClothing={randomizeOneClothing} />}
                {CATEGORIES.map((category) =>(
                   <ClothesItem key={category} temp={temp} condition={condition} type={category}  outfit={outfit[category]} randomizeOneClothing={randomizeOneClothing} />
                ))}
                <button onClick={randomizeOutfit} className="border-2 border-black w-30 mx-32 font-bold bg-blue-800 hover:bg-blue-950 text-white">New Outfit</button>
                
        </section>
    )
}