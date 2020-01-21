import React, { Fragment } from "react";
import Tasks from "./Tasks";
import cuid from "cuid";
import { withRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import { addColumn } from "../reducers/columnReducer";
import { DragDropContext } from "react-beautiful-dnd";
import { moveTasks } from "../reducers/taskReducer";
import TaskModal from "./TaskModal";

class Column extends React.Component {
  state = {
    column: {
      columnName: "",
      columnId: null,
      boardId: null
    }
  };

  onChangeColumnName = e => {
    this.setState({
      column: {
        ...this.state.column,
        columnName: e.target.value,
        columnId: cuid(),
        boardId: this.props.match.params.id
      }
    });
  };
  addnewColumn = e => {
    // this.findBoardId();
    this.props.addColumn(this.state.column);
  };

  onDragEnd = result => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
    if (
      destination.index === source.index &&
      destination.droppableId === source.droppableId
    )
      return;
    this.props.moveTasks(result);
    // const column = this.props.Column.Column[source.droppableId];
    // const newTaskIds = Array.from(column.columnId);
    // newTaskIds.splice(source.index, 1);
    // newTaskIds.splice(destination.index, 0, draggableId);
    // const newColumn = {
    //   ...column,
    //   taskIds: newTaskIds
    // };
  };
  render() {
    console.log("prrr", this.props);
    return (
      <Fragment>
        <div className="BACK">
          <button
            className="btn-floating btn-large blue-grey darken-4 pulse"
            onClick={this.props.history.goBack}
          >
            BACK
          </button>
        </div>
        <Route
          path="/column/:id/task/:id"
          render={() => (
            <TaskModal boardId={this.props.match.params.id} {...this.props} />
          )}
        />

        <div className="columncontainer">
          <DragDropContext onDragEnd={this.onDragEnd}>
            {this.props.Column.Column.filter(
              item => item.boardId === this.props.match.params.id
            ).map(column => (
              <Tasks
                {...this.props}
                key={column.columnId}
                name={column.columnName}
                id={column.columnId}
                boardId={column.boardId}
              />
            ))}
          </DragDropContext>
          <div className="card-panel hoverable addnewcolumn">
            <h5>Add New Column</h5>
            <input
              type="text"
              placeholder="Column Name"
              onChange={this.onChangeColumnName}
            ></input>
            <button
              className="deleteColumn grey lighten-5 btn deleteColumn"
              // className="btn-floating btn-large waves-effect waves-light"
              onClick={this.addnewColumn}
            >
              add
            </button>
          </div>
        </div>
      </Fragment>
    );
  }
}
export default withRouter(connect(null, { addColumn, moveTasks })(Column));
