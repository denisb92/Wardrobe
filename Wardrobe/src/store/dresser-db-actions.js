import { dbItemsUrl } from "../data/data_links";
import { dresserActions } from "./dresser-clother";

export const fetchItemData =() =>{
    return async dispatch =>{
    const fetchData = async () =>{
        const response = await fetch(dbItemsUrl);
        if(!response.ok)
        {
            throw new Error('Could not retrieve item data');
        }

        const data = await response.json();
        return data;
    };
    try{
       const data = await fetchData();
       dispatch(dresserActions.setAllItems({items: data.items}));
    }
    catch(error)
    {
        throw new Error(error);
    }
}
}

export const sendItemData =  (item) =>{
    const sendRequest = async () => {
        const response = await fetch(
        dbItemsUrl,
        {
            method: 'PUT',
            body: JSON.stringify({items: item.items}),
        }
    );
 
        if(!response.ok)
        {
            throw new Error('Sending items data failed');
        }
    };
    try{
        sendRequest();
    }
    catch(error)
    {
        throw new Error(error);
    }

}