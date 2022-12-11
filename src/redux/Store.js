import { applyMiddleware, createStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { rootReducers } from "./Reducers";
import { rootSaga } from "./RootSagas";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducers, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default store;
