import { useDispatch, useSelector } from "react-redux";
import ClothesItem from "../components/ClothesItem"
import Weather from "../components/Weather"
import { CATEGORIES, OCCASION, OCCASION_TO_INDEX } from "../data/data";
import { dresserActions } from "../store/dresser-clother";
import { useEffect, useRef, useState } from "react";
import { INVALID_OUTFIT, randomizeOneClothingFunc, randomizeOutfitFunc } from '../helper/OutfitLogic';


export default function HomePage(){
    const availableTypesToUse = useSelector(state => state.settings.availableTypesToWear)
    const items = useSelector(state => state.dresser.items);
    //const tempCases = [{temp: 70, condition: "Sunny"}, {temp: 20, condition: "Sunny"}, {temp: 100, condition: "Rainy"}, {temp: 20, condition: "Rainy"} ];
    //const indx = Math.floor(Math.random() * tempCases.length);
    //const {temp, condition} = tempCases[indx];
    const [isInvalidOutfit , setIsInvalidOutfit] = useState(true);
    const dispatch = useDispatch();
    const occasionDropDown = useRef()

    const allOutfits = useSelector(state => state.dresser.allOutfits);
    const [outfit, setOutfit] = useState((allOutfits === undefined) ? undefined : allOutfits[0]);
    //let temp = 70;
    //let condition = "Clear";
    const temp = useSelector(state => state.weather.tempF)
    const condition = useSelector(state => state.weather.condition);


    useEffect(() =>{
        if(allOutfits[0].Top === undefined)
        {
            const firstGeneratedOutfit = randomizeOutfitFunc(availableTypesToUse, items, occasionDropDown.current.value);
            if(firstGeneratedOutfit !== INVALID_OUTFIT)
            {
                dispatch(dresserActions.setCurrentOutfit({outfit:firstGeneratedOutfit, indx: 0}));
                setOutfit(firstGeneratedOutfit);
                setIsInvalidOutfit(false);
            }
        }
        else
            setIsInvalidOutfit(false);
    },[allOutfits])

    function checkIfValidOutfit(newOutfit)
    {
        const outfitIndx = OCCASION_TO_INDEX[occasionDropDown.current.value];
        if(newOutfit !== INVALID_OUTFIT)
        {
            dispatch(dresserActions.setCurrentOutfit({outfit:newOutfit, indx: outfitIndx}));
            setOutfit(newOutfit);
            setIsInvalidOutfit(false);
        }
        else if(allOutfits[outfitIndx].Top === undefined)
            setIsInvalidOutfit(true);
    }

    function randomizeOutfit()
    {
        const newOutfit = randomizeOutfitFunc(availableTypesToUse, items, occasionDropDown.current.value);
        checkIfValidOutfit(newOutfit);
    }

    function randomizeOneClothing(type)
    {
        const indx = OCCASION_TO_INDEX[occasionDropDown.current.value];
        const newClothing = randomizeOneClothingFunc(outfit, type, allOutfits[indx][type].id, availableTypesToUse, items, occasionDropDown.current.value);
        if(newClothing !== undefined)
        {
            dispatch(dresserActions.setNewClothing({type, clothingItem:newClothing, indx:indx}));
        }
        return newClothing;
    }

    function changeOccasion()
    {
        const outfitIndx = OCCASION_TO_INDEX[occasionDropDown.current.value];
        if(allOutfits[outfitIndx].Top=== undefined)
        {
            randomizeOutfit();
        }
        else
        {
            setOutfit(allOutfits[outfitIndx]);
            setIsInvalidOutfit(false);
        }
    }
    
    return(
        <section className="gap-2 w-fit grid grid-flow-row items-center">
            <Weather temp={temp} condition={condition}  />
            <select ref={occasionDropDown} onChange={changeOccasion} defaultValue='Casual' className="bg-blue-200 text-center font-bold border-2 border-black">
            {OCCASION.map((occasion) =>(
                <option key={occasion}>{occasion}</option>
            ))}
            </select>
            {!isInvalidOutfit && <>
            {availableTypesToUse.find((type) => type === "Jackets") && <ClothesItem temp={temp} condition={condition} type="Jacket"  outfit={outfit['Jacket']} randomizeOneClothing={randomizeOneClothing} />}
                {CATEGORIES.map((category) =>(
                  <ClothesItem key={category} temp={temp} condition={condition} type={category}  outfit={outfit[category]} randomizeOneClothing={randomizeOneClothing} />
                ))}
                 </>}

            {isInvalidOutfit &&
            <section className="text-center bg-red-300 border-2 border-black">
                <h1 className="font-bold">Invalid Outfit Generated!</h1>
                <p>Please Generate New Outfit</p>
            </section>

            }
            <button onClick={randomizeOutfit} className="border-2 border-black w-30 mx-32 font-bold bg-blue-800 hover:bg-blue-950 text-white">New Outfit</button>
                
        </section>
    )
}