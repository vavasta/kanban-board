const initialState = {
  Tasks: []
};

const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case "MOVE-TASKS":
      const response = reorderTasks(state.Tasks, action.payload);

      const newMap = state.Tasks.map(obj => {
        const newObj = response.find(el => el.taskId === obj.taskId);
        if (newObj) return newObj;
        return obj;
      });
      return {
        ...state,
        Tasks: newMap
      };
    case "ADD-TASK":
      return {
        ...state,
        Tasks: state.Tasks.concat(action.payload)
      };
    case "DELETE-ALL-COLUMN-TASKS":
      return {
        ...state,
        Tasks: state.Tasks.filter(item => item.columnId !== action.payload)
      };
    case "DELETE-TASK":
      return {
        ...state,
        Tasks: state.Tasks.filter(item => item.taskId !== action.payload)
      };
    case "ADD-LONG-DESC":
      const longDescId = action.payload.id;
      const longDescName = action.payload.longDesc;
      const updatedDate = action.payload.updatedDate;
      const objToAddLongDesc = state.Tasks.find(
        obj => obj.taskId === longDescId
      );
      const objWithLongDesc = {
        ...objToAddLongDesc,
        longDesc: longDescName,
        updatedDate: updatedDate
      };
      return {
        ...state,
        Tasks: state.Tasks.map(el => {
          if (el.taskId === longDescId) {
            return objWithLongDesc;
          }
          return el;
        })
      };
    case "UPDATE-TASK-NAME":
      const id = action.payload.objid;
      const value = action.payload.val;
      const obj = state.Tasks.find(item => item.taskId === id);
      obj.taskName = value;
      const objWithUpdatedDate = {
        ...obj,
        updatedDate: action.payload.updatedDate
      };
      return {
        ...state,
        Tasks: state.Tasks.map(el => {
          if (el.taskId === objWithUpdatedDate.taskId) {
            return objWithUpdatedDate;
          }
          return el;
        })
      };
    case "UPDATE-LONG-DESC":
      console.log("ACT", action.payload);
      const updateLongDescId = action.payload.objid;
      const updateLongDescValue = action.payload.val;
      const updateLongDescObj = state.Tasks.find(
        item => item.taskId === updateLongDescId
      );
      updateLongDescObj.longDesc = updateLongDescValue;
      return {
        ...state,
        Tasks: state.Tasks.map(el => {
          if (el.taskId === updateLongDescObj.taskId) {
            return updateLongDescObj;
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
export const moveTasks = res => ({ type: "MOVE-TASKS", payload: res });
export const addNewTask = res => ({ type: "ADD-TASK", payload: res });
export const deleteTask = id => ({ type: "DELETE-TASK", payload: id });
export const deleteAllColumnTasks = id => ({
  type: "DELETE-ALL-COLUMN-TASKS",
  payload: id
});
export const addLongDesc = obj => ({ type: "ADD-LONG-DESC", payload: obj });
export const changeLongDescNameReducer = obj => ({
  type: "UPDATE-LONG-DESC",
  payload: obj
});
export const changeTaskNameReducer = obj => ({
  type: "UPDATE-TASK-NAME",
  payload: obj
});
export const reorderTasks = (arr, action) => {
  const { source, destination } = action;
  if (destination.droppableId === source.droppableId) {
    const newArr = [...arr].filter(
      el => el.columnId === destination.droppableId
    );
    newArr.forEach(el => {
      if (el.position === source.index) {
        el.position = destination.index;
      } else if (
        el.position >= destination.index &&
        el.position < source.index
      ) {
        el.position += 1;
      } else if (
        el.position > source.index &&
        el.position <= destination.index
      ) {
        el.position -= 1;
      }
    });
    return newArr;
  }
  arr.forEach(card => {
    if (
      card.columnId === source.droppableId &&
      card.position === source.index
    ) {
      card.columnId = destination.droppableId;
      if (destination.index === 0) {
        return (card.position = 0);
      } else {
        return (card.position = destination.index);
      }
    } else if (
      card.columnId === source.droppableId &&
      card.position > source.index
    ) {
      return --card.position;
    } else if (
      card.columnId === destination.droppableId &&
      card.position >= destination.index
    ) {
      return ++card.position;
    }
  });
  return arr;
};

export default tasksReducer;
