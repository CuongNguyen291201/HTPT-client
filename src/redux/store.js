import rootReducer from './reducers/rootReducer'
import createSagaMiddleware from 'redux-saga'
import { configureStore } from "@reduxjs/toolkit";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: persistReducer({
      key: "cms-persist-state",
      storage,
      migrate: (state) => {
        if (state) {
          state.categoryReducer.categories = {};
          state.categoryReducer.mapCategoryCourse = {};
          state.categoryReducer.mapCourse = {};
        }
        return Promise.resolve(state)
      },
      whitelist: ['categoryReducer']
    }, rootReducer),
    devTools: 'production',
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
            serializableCheck: false,
            immutableCheck: false,
        }).concat(sagaMiddleware)
    },
})

sagaMiddleware.run(mySaga)

export default store