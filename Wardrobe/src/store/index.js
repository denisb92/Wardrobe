import {configureStore} from '@reduxjs/toolkit';
import dresserReducer from './dresser-clother'
import weatherReducer from './weather';
import settingsReducer from './settings';

const store = configureStore({
    reducer:{dresser: dresserReducer, weather: weatherReducer, settings: settingsReducer}
});

export default store;