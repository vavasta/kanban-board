import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { deleteTask } from "../reducers/taskReducer";
import { Menu, Breadcrumb, Icon } from "antd";
class Task extends React.Component {
  state = {
    id: null
  };
  renderEditViewTask = () => {
    if (this.props.id === this.props.taskIdFromStateToChangeTaskName) {
      return (
        <div className="editviewtask">
          <input
            type="text"
            defaultValue={this.props.name}
            onChange={this.props.changeTaskName}
          />
          <button
            className="red lighten-2 btn"
            onClick={this.props.changeEditModeTask}
          >
            CANCEL
          </button>
          <button
            onClick={() => this.props.updateComponentValueTask(this.props.id)}
          >
            OK
          </button>
        </div>
      );
    } else {
      return this.renderDefaultViewTask();
    }
  };
  renderDefaultViewTask = () => {
    return (
      <div>
        <h6 onDoubleClick={() => this.props.changeEditModeTask(this.props.id)}>
          Task: {this.props.name}
        </h6>
        <h6>#:{this.props.index}</h6>{" "}
      </div>
    );
  };
  deleteTask = (e, id) => {
    e.stopPropagation();
    this.props.deleteTask(id);
  };
  render() {
    console.log("pR", this.props);
    return (
      <Draggable draggableId={this.props.id} index={this.props.index}>
        {provided => (
          <div
            onClick={() =>
              this.props.history.push(
                `/column/${this.props.boardId}/task/${this.props.id}`,
                {
                  // renderEditViewTask: this.renderEditViewTask,
                  // b: this.renderDefaultViewTask,
                  a: this.props.isInEditModeTask
                }
              )
            }
            className="task hoverable tasks"
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            {this.props.isInEditModeTask
              ? this.renderEditViewTask()
              : this.renderDefaultViewTask()}
            <Icon
              type="close"
              onClick={e => this.deleteTask(e, this.props.id)}
            />
          </div>
        )}
      </Draggable>
    );
  }
}
export default withRouter(connect(null, { deleteTask })(Task));
