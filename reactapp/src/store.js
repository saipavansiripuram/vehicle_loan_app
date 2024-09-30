import { configureStore, combineReducers } from '@reduxjs/toolkit';
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
import userReducer from './userSlice';

// const persistConfig = {
//   key: 'root',
//   storage,
//   whitelist: ['auth'] // only auth will be persisted
// };

// const rootReducer = combineReducers({
//   auth: userReducer,
// });

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: ['persist/PERSIST']
//       }
//     })
// });

// export const persistor = persistStore(store);

// import { configureStore } from '@reduxjs/toolkit'
// import userReducer from './userSlice';

const store = configureStore({
    reducer: {
      auth: userReducer,
    },
})

export default store;