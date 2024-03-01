
import AddItem from './components/AddItem';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import {RouterProvider, createBrowserRouter} from 'react-router-dom';
import ItemsDetails from './pages/ItemsDetails';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { weatherActions } from './store/weather';
import EditItemPage from './components/EditItem';
import Closet from './pages/Closet';
import Settings from './pages/Settings';
import { fetchItemData } from './store/dresser-db-actions';
import { fetchSettingsData } from './store/settings-db-actions';

function getWeatherInfo(){
    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition((position) => {
        //const current = GetWeatherInfo(position.coords.latitude, position.coords.longitude);
        resolve(current);
      });
    })
  }


const router = createBrowserRouter([
  {
    path: '/',
    element: <Header />,
    children: [
      {index: true, element: <HomePage/>},
      {
        path: 'add-item',
        element: <AddItem/>

      },
      {path: 'closet', element: <Closet/>},
      {path: 'closet/edit/:itemId', element: <EditItemPage/> },
      {path: 'closet/view/:itemId', element: <ItemsDetails/>},
      {path: '/settings', element: <Settings/>}
    ]}
])

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    async function getWeather()
    {
      //const current = await getWeatherInfo();
      //dispatch(weatherActions.setWeatherInfo({tempF: current.temperature2m, condition: current.precipation}));
      dispatch(weatherActions.setWeatherInfo({tempF: 70, condition: 'Sunny'}));
      dispatch(fetchSettingsData(70));
    }
    getWeather();
    dispatch(fetchItemData());
  },[]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
