import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Menu, Breadcrumb, Icon } from "antd";
import {
  deleteTask,
  addLongDesc,
  changeLongDescNameReducer
} from "../reducers/taskReducer";
class TaskModal extends React.Component {
  state = {
    isInEditModeTask: false,
    changeEditModeTaskLongDesc: false,
    taskTaskId: null,
    changingTaskValue: "",
    longDescriptionName: "",
    changingLongDescValue: ""
  };
  ////CHANGE EDIT MODE
  changeEditModeTask = id => {
    this.setState({
      // taskTaskId: id,
      isInEditModeTask: !this.state.isInEditModeTask
    });
  };
  //CHANGE NAME
  changeColumnName = e => {
    this.setState({ changingValue: e.target.value });
  };
  changeTaskName = e => {
    this.setState({ changingTaskValue: e.target.value });
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
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    this.props.changeTaskNameReducer({
      objid: id,
      val: this.state.changingTaskValue,
      updatedDate:
        date + "/" + month + "/" + year + " " + hours + ":" + min + ":" + sec
    });
    this.setState({ isInEditModeTask: false });
  };
  ////////// RENDER
  renderEditViewTask = () => {
    const obj = this.props.Tasks.Tasks.find(
      item => item.taskId === this.props.match.params.id
    );
    // if (this.props.id === this.state.taskTaskId) {
    return (
      <div className="editviewtask">
        <input
          type="text"
          defaultValue={obj.taskName}
          onChange={this.changeTaskName}
        />
        <button
          className="hoverable red lighten-2 btn"
          onClick={this.changeEditModeTask}
        >
          CANCEL
        </button>
        <button
          className="hoverable grey lighten-5 btn "
          onClick={() =>
            this.updateComponentValueTask(this.props.match.params.id)
          }
        >
          OK
        </button>
      </div>
    );
    // } else {
    //   return this.renderDefaultViewTask();
    // }
  };
  renderDefaultViewTask = () => {
    const obj = this.props.Tasks.Tasks.find(
      item => item.taskId === this.props.match.params.id
    );
    if (obj) {
      return (
        <div>
          <h6 onDoubleClick={() => this.changeEditModeTask()}>
            <h5>Short Description:{obj.taskName}</h5>
          </h6>
        </div>
      );
    }
  };
  //DELETE TASK
  deleteTask = (e, id) => {
    this.props.deleteTask(id);
    this.props.history.goBack();
  };

  //LONG DESCRIPTION///////////////////////////////////////////
  longDescriptionName = e => {
    this.setState({
      longDescriptionName: e.target.value
    });
  };
  addLongDescName = id => {
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    this.props.addLongDesc({
      id: id,
      longDesc: this.state.longDescriptionName,
      updatedDate:
        date + "/" + month + "/" + year + " " + hours + ":" + min + ":" + sec
    });
  };
  changeLongDescName = e => {
    this.setState({ changingLongDescValue: e.target.value });
  };
  changeEditModeTaskLongDesc = id => {
    this.setState({
      changeEditModeTaskLongDesc: !this.state.changeEditModeTaskLongDesc
    });
  };
  changeEditModeLongDesc = () => {
    this.setState({
      changeEditModeTaskLongDesc: !this.state.changeEditModeTaskLongDesc
    });
  };
  updateComponentValueLongDesc = id => {
    this.props.changeLongDescNameReducer({
      objid: id,
      val: this.state.changingLongDescValue
    });
    this.setState({ changeEditModeTaskLongDesc: false });
  };
  renderEditViewTaskLongDesc = () => {
    const obj = this.props.Tasks.Tasks.find(
      item => item.taskId === this.props.match.params.id
    );
    return (
      <div className="editviewtask">
        <div className="emptythree"></div>
        <input
          type="text"
          defaultValue={obj.longDesc}
          onChange={this.changeLongDescName}
        />
        <button
          className="hoverable red lighten-2 btn"
          onClick={this.changeEditModeLongDesc}
        >
          CANCEL
        </button>
        <button
          className="hoverable grey lighten-5 btn"
          onClick={() =>
            this.updateComponentValueLongDesc(this.props.match.params.id)
          }
        >
          OK
        </button>
      </div>
    );
  };
  renderDefaultViewTaskLongDesc = () => {
    const obj = this.props.Tasks.Tasks.find(
      item => item.taskId === this.props.match.params.id
    );
    if (obj) {
      if (obj.longDesc) {
        return (
          <div>
            <div className="emptyfour"></div>
            <h6 onDoubleClick={() => this.changeEditModeTaskLongDesc()}>
              Long Description:{obj.longDesc}
            </h6>
          </div>
        );
      } else {
        return (
          <div>
            <div className="empty"></div>
            <input
              className="inputedittaskname"
              type="textarea"
              placeholder="Please add Long Description if you want"
              onChange={this.longDescriptionName}
            ></input>
            <button
              className=" grey lighten-5 btn deleteColumn"
              onClick={() => this.addLongDescName(this.props.match.params.id)}
            >
              ADD
            </button>
          </div>
        );
      }
    }
  };
  render() {
    const obj = this.props.Tasks.Tasks.find(
      item => item.taskId === this.props.match.params.id
    );
    const createdDate = obj.date;
    const updatedDate = obj.updatedDate;
    return (
      <div className="modalwindow">
        <div className=" card-panel modalwindowcenter hoverable">
          <div className="closemodalwindow">
            <Icon type="close" onClick={this.props.history.goBack} />
          </div>
          <p>
            {this.state.isInEditModeTask
              ? this.renderEditViewTask()
              : this.renderDefaultViewTask()}
          </p>
          <p>
            {this.state.changeEditModeTaskLongDesc
              ? this.renderEditViewTaskLongDesc()
              : this.renderDefaultViewTaskLongDesc()}
          </p>
          <div className="deletemodalwindow">
            <div className="emptytwo"></div>
            <div className="date">Created on:{createdDate}</div>
            <div className="updateddate">Updated on: {updatedDate}</div>
            <button
              className="red lighten-2 btn deleteColumn deletetaskmodal"
              onClick={e =>
                this.deleteTask(
                  e,
                  this.props.match.params.id,
                  this.props.history.goBack
                )
              }
            >
              DELETE TASK
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(
  connect(null, { deleteTask, addLongDesc, changeLongDescNameReducer })(
    TaskModal
  )
);
