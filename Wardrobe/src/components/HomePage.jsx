import { useDispatch, useSelector } from "react-redux";
import ClothesItem from "./ClothesItem"
import Weather from "./Weather"
import { CATEGORIES, NOCLOTHES, OCCASION } from "../data/data";
import { dresserActions } from "../store/dresser-clother";
import { useEffect, useRef } from "react";
import { checkValidOutfit, randomizeOneClothingFunc, randomizeOutfitFunc } from "./helper/OutfitLogic";
export default function HomePage(){
    const settings = useSelector(state => state.settings.settings);
    const jacketSetting = settings.filter((setting) => setting.category === 'Jacket');
    const items = useSelector(state => state.dresser.items);
    const tempCases = [{temp: 70, condition: "Sunny"}, {temp: 20, condition: "Sunny"}, {temp: 100, condition: "Rainy"}, {temp: 20, condition: "Rainy"} ];
    const indx = Math.floor(Math.random() * tempCases.length);
    //const {temp, condition} = tempCases[indx];
    const dispatch = useDispatch();
    const occasionDropDown = useRef()

    const outfit = useSelector(state => state.dresser.currentOutfit);
    let temp = 70;
    let condition = "Clear";
    const isJacketWeather = jacketSetting[0].minTemp <= temp && jacketSetting[0].maxTemp >= temp
    const initialOutfitState = (outfit.Top === null) ? randomizeOutfitFunc(temp,settings, items, isJacketWeather, 'Casual') : outfit;
    useEffect(() =>{
        dispatch(dresserActions.setCurrentOutfit({outfit:initialOutfitState}));
    },[])

    function randomizeOutfit()
    {
        const newOutfit = randomizeOutfitFunc(temp, settings, items ,isJacketWeather, occasionDropDown.current.value);
        if(checkValidOutfit(newOutfit))
            dispatch(dresserActions.setCurrentOutfit({outfit:newOutfit}));
    }

    function randomizeOneClothing(type)
    {

        const newClothing = randomizeOneClothingFunc(outfit, type, outfit[type].id, temp, settings, items, occasionDropDown.current.value);
        if(newClothing !== undefined)
        {
            dispatch(dresserActions.setNewClothing({type, clothingItem:newClothing}));
        }
        return newClothing;
    }

    function changeOccasion()
    {
        const newOutfit = randomizeOutfitFunc(temp, settings, items ,isJacketWeather, occasionDropDown.current.value);
        if(checkValidOutfit(newOutfit))
            dispatch(dresserActions.setCurrentOutfit({outfit:newOutfit}));
    }

    return(
        <section className="gap-2 w-1/4 grid grid-flow-row items-center">
            <Weather temp={temp} condition={condition}  />
            <select ref={occasionDropDown} onChange={changeOccasion} className="bg-blue-200 text-center font-bold border-2 border-black">Occasion
            {OCCASION.map((occasion) =>(
                <option key={occasion}>{occasion}</option>
            ))}
            </select>
            {isJacketWeather && <ClothesItem temp={temp} condition={condition} type="Jacket"  outfit={outfit['Jacket']} randomizeOneClothing={randomizeOneClothing} />}
                {CATEGORIES.map((category) =>(
                   <ClothesItem key={category} temp={temp} condition={condition} type={category}  outfit={outfit[category]} randomizeOneClothing={randomizeOneClothing} />
                ))}
                <button onClick={randomizeOutfit} className="border-2 border-black w-30 mx-32 font-bold bg-blue-800 hover:bg-blue-950 text-white">New Outfit</button>
                
        </section>
    )
}