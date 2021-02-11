import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import Table from "./reducers/Table";

const rootReducer = combineReducers({
  Table,
});

export default createStore(rootReducer, applyMiddleware(thunk));
