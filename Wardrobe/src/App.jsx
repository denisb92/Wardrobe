
import AddItem from './components/AddItem';
import Header from './components/Header';
import HomePage from './components/HomePage';
import {RouterProvider, createBrowserRouter} from 'react-router-dom';
import ItemsDetails from './components/ItemsDetails';
import { GetWeatherInfo } from './components/helper/WeatherInfo';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { weatherActions } from './store/weather';


  //const weatherInfo = GetWeatherInfo(position.coords.latitude, position.coords.longitude);
function getWeatherInfo(){
    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position);
        const current = GetWeatherInfo(position.coords.latitude, position.coords.longitude);
        //console.log(tempF);
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
        element: <AddItem/>,

      },
      {path: 'clothes/:itemId', element: <ItemsDetails/>}
    ]
  }
])

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    async function getWeather()
    {

    
      const current = await getWeatherInfo();
      //console.log(tempF);
      dispatch(weatherActions.setWeatherInfo({tempF: current.temperature2m, condition: current.precipation}));
    }
    getWeather();
  }, []);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
