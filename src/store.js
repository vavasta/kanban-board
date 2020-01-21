import { combineReducers, compose, createStore } from "redux";
import { loadState, saveState } from "./localStorage";
import { throttle } from "lodash";
import boardsReducer from "./reducers/boardsReducer";
import columnReducer from "./reducers/columnReducer";
import tasksReducer from "./reducers/taskReducer";

const reducers = combineReducers({
  Boards: boardsReducer,
  Column: columnReducer,
  Tasks: tasksReducer
});

const actionSanitizer = action =>
  action.type === "FILE_DOWNLOAD_SUCCESS" && action.data
    ? { ...action, data: "<<LONG_BLOB>>" }
    : action;
const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        actionSanitizer,
        stateSanitizer: state =>
          state.data ? { ...state, data: "<<LONG_BLOB>>" } : state
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;
const enhancer = composeEnhancers();
const persistedState = loadState();
const store = createStore(reducers, persistedState, enhancer);

store.subscribe(
  throttle(() => {
    saveState(store.getState());
  })
);

export default store;
