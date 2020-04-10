/*****************************
* The Board Components
* This component displays the board of playing, 
* this board is composed of a list of cells, each cell is a component.
*/

import React from "react";
import "./Board.scss";
import Cell from "../Cell/Cell";
import { BoardProps } from "../../Types";


const Board = ({ values, playCell, result, player }: BoardProps) => {
  return (

    <div className="Board">
      {values.map((rowValues, row) => (
        <div key={row} className="Board-row">
          {rowValues.map((rowValue, col) => {

            // we check if the cell is included in the winning cells
            let indexIsWinner = result.winCells && result.winCells.some(item => item[0] === row && item[1] === col);
            return <Cell
              key={col}
              winPlayer={result.winPlayer}
              indexIsWinner={indexIsWinner}
              value={rowValue}
              player={player}
              playCell={() => playCell(row, col)}
            />
          }

          )}
        </div>
      ))}
    </div>
  );
};

export default Board;
