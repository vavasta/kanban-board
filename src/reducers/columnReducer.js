import { act } from "react-dom/test-utils";

const initialState = {
  Column: []
};

const columnReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET-COLUMN":
      return {
        ...state,
        Column: action.payload
      };
    case "ADD-COLUMN":
      return {
        ...state,
        Column: state.Column.concat(action.payload)
      };
    case "DELETE-ALL-COLUMN":
      return {
        ...state,
        Column: state.Column.filter(item => item.boardId !== action.payload)
      };
    case "DELETE-COLUMN":
      return {
        ...state,
        Column: state.Column.filter(item => item.columnId !== action.payload)
      };
    case "UPDATE-COLUMN-NAME":
      const id = action.payload.objid;
      const value = action.payload.val;
      const obj = state.Column.find(item => item.columnId === id);
      obj.columnName = value;
      //  { ...newobj, ...obj }
      return {
        ...state,
        Column: state.Column.map(el => {
          if (el.columnId === obj.columnId) {
            return obj;
            // return { ...el, ...obj };
          }
          return el;
        })
      };
    default: {
      return state;
    }
  }
};
//Action Creator

export const getColumn = res => ({ type: "GET-COLUMN", payload: res });
export const addColumn = res => ({ type: "ADD-COLUMN", payload: res });
export const deleteAllColumn = id => ({
  type: "DELETE-ALL-COLUMN",
  payload: id
});
export const deleteColumn = id => ({ type: "DELETE-COLUMN", payload: id });
export const changeColumnNameReducer = obj => ({
  type: "UPDATE-COLUMN-NAME",
  payload: obj
});
export default columnReducer;
