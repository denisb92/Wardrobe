import { useSelector } from "react-redux";
import ItemForm from "./ItemForm";
import { useParams } from "react-router-dom";

export default function EditItemPage()
{
    const params = useParams();
    const itemId = params.itemId;
    const allItems = useSelector(state => state.dresser.items)
    return(<ItemForm method="Edit" item={allItems[itemId]}/>)
}