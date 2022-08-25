import {combineReducers, configureStore} from '@reduxjs/toolkit'
import userSlice from "./slices/userSlice";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import foodItemsSlice from "./slices/foodItemsSlice";
import cartSlice from "./slices/cartSlice";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react'

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}

const rootReducer = combineReducers({
    user: userSlice,
    foodItems: foodItemsSlice,
    cart: cartSlice,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore these action types
                ignoredActions: ['userConfig', FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
                // Ignore these field paths in all actions
                ignoredActionPaths: ['payload'],
                // Ignore these paths in the state
                ignoredPaths: ['user'],
            },

        }),
})

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector




