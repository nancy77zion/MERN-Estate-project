
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import userReducer from './user/userSlice' //import slice from
import {persistReducer, persistStore} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const rootReducer = combineReducers({ user: userReducer });

//Redux Persist helps your app remember things even after it's closed or refreshed.Redux Persist is particularly useful for storing Redux state in local storage, allowing you to save data on the user's device.
const persistConfig = {
  key: 'root',
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
  reducer: persistedReducer,
  //reducer: {user: userReducer}, 
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
})

export const persistor = persistStore(store)

/* first code without persistence

export const store = configureStore({
  reducer: {user: userReducer}, 
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
})

*/