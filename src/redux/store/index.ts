import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from "redux-logger";
import createSagaMiddleware from "redux-saga"

import rootReducer from "../reducers";
import rootSaga from "../sagas"

const logger = createLogger();
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(logger, sagaMiddleware)
    )
)

sagaMiddleware.run(rootSaga)

export default store;
