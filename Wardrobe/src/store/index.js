import {configureStore} from '@reduxjs/toolkit';
import dresserReducer from './dresser-clother'
import weatherReducer from './weather';

const store = configureStore({
    reducer:{dresser: dresserReducer, weather: weatherReducer}
});

export default store;