const initialState = {
  Boards: []
};

const boardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET-BOARDS": {
      return {
        ...state,
        Boards: action.payload
      };
    }
    case "ADD-BOARDS": {
      return {
        ...state,
        Boards: state.Boards.concat(action.payload)
      };
    }
    case "DELETE-BOARD": {
      return {
        ...state,
        Boards: state.Boards.filter(item => item.boardId !== action.payload)
      };
    }
    default: {
      return state;
    }
  }
};
//Action Creator

export const getBoards = res => ({ type: "GET-BOARDS", payload: res });
export const addBoards = name => ({ type: "ADD-BOARDS", payload: name });
export const deleteBoard = id => ({ type: "DELETE-BOARD", payload: id });
export default boardsReducer;
