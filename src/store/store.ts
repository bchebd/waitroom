import { configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import {
    persistReducer,
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import { authReducer } from "@/store/reducers/authSlice";
import { loadingReducer } from "@/store/reducers/loadingSlice";
import { usersReducer } from "@/store/reducers/usersSlice";
import { tagApi } from "@/store/services/tagApi";

const authPersistConfig = {
    key: 'auth',
    storage
};

const persistedUserReducer = persistReducer(authPersistConfig, authReducer);

export const store = configureStore({
    reducer: {
        [tagApi.reducerPath]: tagApi.reducer,
        auth: persistedUserReducer,
        users: usersReducer,
        loading: loadingReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }).concat(tagApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;