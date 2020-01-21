import React from "react";
import Task from "./Task";
import {
  deleteColumn,
  changeColumnNameReducer
} from "../reducers/columnReducer";
import { connect } from "react-redux";
import {
  addNewTask,
  deleteAllColumnTasks,
  changeTaskNameReducer,
  deleteTask
} from "../reducers/taskReducer";
import cuid from "cuid";
import { Droppable } from "react-beautiful-dnd";
class Tasks extends React.Component {
  state = {
    isOpen: false,
    isInEditMode: false,
    isInEditModeTask: false,
    changingValue: "",
    changingTaskValue: "",
    taskTaskId: null,
    date: null,
    task: {
      taskName: "",
      taskId: null,
      columnId: null,
      position: null
    }
  };

  openAddTaskField = () => {
    this.setState({ isOpen: true });
  };
  taskName = e => {
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    this.setState({
      task: {
        ...this.state.task,
        taskName: e.target.value,
        taskId: cuid(),
        columnId: this.props.id,
        position: this.positionCreator(),
        date:
          date + "/" + month + "/" + year + " " + hours + ":" + min + ":" + sec
      }
    });
  };
  positionCreator = () => {
    const arr = this.props.Tasks.Tasks;
    const parentId = this.props.id;
    const filteredArr = parentId
      ? arr.filter(obj => obj.columnId === parentId)
      : arr;
    let position = 0;
    const currentPositions = filteredArr.map(obj => obj.position);
    while (currentPositions.includes(position)) {
      ++position;
    }
    return position;
  };
  addnewTask = id => {
    this.props.addNewTask(this.state.task);
    this.setState({ isOpen: false });
  };
  deleteColumn = id => {
    console.log("ID", id);
    this.props.deleteColumn(id);
    this.props.deleteAllColumnTasks(id);
  };
  //EDIT MODE
  changeEditMode = () => {
    this.setState({ isInEditMode: !this.state.isInEditMode });
  };
  changeEditModeTask = id => {
    this.setState({
      taskTaskId: id,
      isInEditModeTask: !this.state.isInEditModeTask
    });
  };

  //UPDATE VAL
  updateComponentValue = id => {
    this.props.changeColumnNameReducer({
      objid: id,
      val: this.state.changingValue
    });
    this.setState({ isInEditMode: false });
  };
  updateComponentValueTask = id => {
    this.props.changeTaskNameReducer({
      objid: id,
      val: this.state.changingTaskValue
    });
    this.setState({ isInEditModeTask: false });
  };
  //CHANGE NAME
  changeColumnName = e => {
    this.setState({ changingValue: e.target.value });
  };
  changeTaskName = e => {
    this.setState({ changingTaskValue: e.target.value });
  };
  //RENDER VIEW
  renderEditView = () => {
    return (
      <div>
        <input
          type="text"
          defaultValue={this.props.name}
          onChange={this.changeColumnName}
        />
        <button className="red lighten-2 btn" onClick={this.changeEditMode}>
          CANCEL
        </button>
        <button
          className="grey lighten-5 btn"
          onClick={() => this.updateComponentValue(this.props.id)}
        >
          OK
        </button>
      </div>
    );
  };

  renderDefaultView = () => {
    return <h5 onDoubleClick={this.changeEditMode}>Title:{this.props.name}</h5>;
  };

  render() {
    console.log("PR", this.props);
    return (
      <div className="card-panel hoverable cards taskscontainer ">
        {this.state.isInEditMode
          ? this.renderEditView()
          : this.renderDefaultView()}
        {this.state.isOpen === false ? (
          <div className="addNewTask">
            <button
              onClick={() => this.openAddTaskField(this.props.id)}
              className="deleteColumn"
              className="  grey lighten-5 btn deleteColumn"
            >
              ADD TASK
            </button>
          </div>
        ) : (
          <div>
            <input
              type="text"
              placeholder="Task"
              onChange={this.taskName}
            ></input>
            <button
              className="grey lighten-5 btn deleteColumn"
              onClick={() => this.addnewTask(this.props.id)}
            >
              Add
            </button>
          </div>
        )}
        <Droppable droppableId={this.props.id}>
          {provided => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {this.props.Tasks.Tasks.sort((a, b) => a.position - b.position)
                .filter(task => task.columnId === this.props.id)
                .map((task, index) => (
                  <Task
                    {...this.props}
                    key={task.taskId}
                    name={task.taskName}
                    id={task.taskId}
                    columnId={task.columnId}
                    boardId={this.props.boardId}
                    index={index}
                    changeTaskName={this.changeTaskName}
                    isInEditModeTask={this.state.isInEditModeTask}
                    changeTaskName={this.changeTaskName}
                    updateComponentValueTask={this.updateComponentValueTask}
                    changeEditModeTask={this.changeEditModeTask}
                    taskIdFromStateToChangeTaskName={this.state.taskTaskId}
                  />
                ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <button
          onClick={() => this.deleteColumn(this.props.id)}
          className="deleteColumn"
          className="  red lighten-2 btn deleteColumn"
        >
          Delete Column
        </button>
      </div>
    );
  }
}
export default connect(null, {
  deleteColumn,
  addNewTask,
  deleteAllColumnTasks,
  changeColumnNameReducer,
  changeTaskNameReducer,
  deleteTask
})(Tasks);
