import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { addBoards } from "../reducers/boardsReducer";
import Board from "./Board";
import nextId from "react-id-generator";
import cuid from "cuid";
class Boards extends React.Component {
  state = {
    board: {
      boardName: "",
      boardId: null
    }
  };

  onChangeBoardName = e => {
    this.setState({
      board: { ...this.state.board, boardName: e.target.value, boardId: cuid() }
    });
  };
  addnewBoard = e => {
    this.props.addBoards(this.state.board);
  };
  render() {
    console.log("PROPS", this.props);
    return (
      <div className="boardscontainer">
        <div className="card-panel hoverable">
          <h5>Add New Board</h5>
          <input
            type="text"
            placeholder="Board Name"
            onChange={this.onChangeBoardName}
          ></input>
          <button
            className="btn-floating btn-large waves-effect waves-light"
            onClick={this.addnewBoard}
          >
            add
          </button>
        </div>
        {this.props.Boards.Boards.map(board => (
          <Board
            {...this.props}
            key={board.boardId}
            name={board.boardName}
            id={board.boardId}
          />
        ))}
      </div>
    );
  }
}

export default withRouter(connect(null, { addBoards })(Boards));
