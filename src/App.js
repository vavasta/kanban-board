import React from "react";
import "./App.css";
import { Route, BrowserRouter } from "react-router-dom";
import { connect } from "react-redux";
import Boards from "./components/Boards";
import Column from "./components/Column";
import TaskModal from "./components/TaskModal";
import Tasks from "./components/Tasks";
import getBoards from "./reducers/boardsReducer";
import addBoards from "./reducers/boardsReducer";
import deleteBoard from "./reducers/boardsReducer";
import deleteAllColumn from "./reducers/columnReducer";
import {
  deleteTask,
  addLongDesc,
  changeLongDescNameReducer
} from "./reducers/taskReducer";
import {
  deleteColumn,
  changeColumnNameReducer
} from "./reducers/columnReducer";
import {
  addNewTask,
  moveTasks,
  changeTaskNameReducer
} from "./reducers/taskReducer";
import deleteAllColumnTasks from "./reducers/taskReducer";
class App extends React.Component {
  // componentDidMount() {
  //   this.props.addBoards();
  // }
  render() {
    return (
      <div>
        <BrowserRouter>
          <Route exact path="/" render={() => <Boards {...this.props} />} />
          <Route path="/column/:id" render={() => <Column {...this.props} />} />
          {/* <Route
            exact
            path="/column/:id/task/:id"
            render={() => <TaskModal {...this.props} />}
          /> */}
          {/* <Route exact path="/tasks" render={() => <Tasks />} /> */}
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    Boards: state.Boards,
    Column: state.Column,
    Tasks: state.Tasks
  };
};
const mapDispatchToProps = {
  addBoards,
  deleteBoard,
  deleteAllColumn,
  deleteColumn,
  addNewTask,
  deleteAllColumnTasks,
  moveTasks,
  changeColumnNameReducer,
  changeTaskNameReducer,
  deleteTask,
  addLongDesc,
  changeLongDescNameReducer
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
