import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { addBoards, deleteBoard } from "../reducers/boardsReducer";
import { deleteAllColumn } from "../reducers/columnReducer";
class Board extends React.Component {
  deleteBoard = (e, id) => {
    e.stopPropagation();
    this.props.deleteAllColumn(id);
    this.props.deleteBoard(id);
  };
  render() {
    return (
      <a
        className="card-panel hoverable newboard"
        onClick={() => this.props.history.push(`/column/${this.props.id}`)}
      >
        <p>{this.props.name}</p>
        <button
          onClick={e => this.deleteBoard(e, this.props.id)}
          className=" waves-effect  red lighten-2 btn deleteBoard"
        >
          Delete
        </button>
      </a>
    );
  }
}

export default withRouter(
  connect(null, { addBoards, deleteBoard, deleteAllColumn })(Board)
);
