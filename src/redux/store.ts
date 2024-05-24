
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {thunk} from 'redux-thunk';
import { loginPageReducer } from '@/app/(unAuthRoute)/login/loginPageSlice';

const persistConfig = {
	key: 'root',
	storage,
	// blacklist: ["commonData", "familyRegiserationData",],
	// whitelist: ['navigation'],
}

const rootReducer = combineReducers({
	//Common Slice
	// commonData: commonReducer,
	//Family registration

});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: {
		...persistedReducer,
		loginData: loginPageReducer,
	},
	devTools: process.env.NODE_ENV !== 'production',
	middleware: getDefaultMiddleware => getDefaultMiddleware().concat(thunk)
});


export const persistor = persistStore(store);

export type RootState = ReturnType<(typeof store)['getState']>;
export type AppDispatch = (typeof store)['dispatch'];

